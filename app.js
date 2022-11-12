class Board {
  static NUM_PIXELS = 20;
  static PIXEL_WIDTH = 20;
  static mouseButtonDown = false;
  static canvas = document.querySelector('.canvas');

  constructor(numPixels, pixelWidth){
    this.numPixels = numPixels ?? Board.NUM_PIXELS; // arguments.length == 0 ? NUM_PIXELS : numPixels;
    this.pixelWidth = pixelWidth ?? Board.PIXEL_WIDTH; // arguments.length == 0 ? PIXEL_WIDTH : pixelWidth;
    Board.canvas.style.width = `${this.pixelWidth * this.numPixels}px`;
    this.createGrid()
    const colorOptions = this.createPalette()
    for (const color of colorOptions) {
      // add event listeners to select color from the palette
      color.addEventListener('click', () => {
        const colorString = color.style.backgroundColor;
        console.log("Selected color: " + colorString);
        this.setupPixelListeners(colorString)
     });
    }
  }

  createGrid(){
    for(let i = 1; i <= this.numPixels ** 2; i++) {
      const pixel = document.createElement('button');
      pixel.className = 'pixel';
      pixel.style.width = `${this.pixelWidth}px`;
      pixel.style.height = `${this.pixelWidth}px`;
      pixel.setAttribute('pixel-number', i);
      Board.canvas.append(pixel);
    }
  }

  createPalette(){
    const redPicker = document.createElement('div');
    redPicker.className = 'color-picker';
    redPicker.style.backgroundColor = 'red';
    
    const greenPicker = document.createElement('div');
    greenPicker.className = 'color-picker';
    greenPicker.style.backgroundColor = 'green';
    
    const bluePicker = document.createElement('div');
    bluePicker.className = 'color-picker';
    bluePicker.style.backgroundColor = 'blue';
    
    const swatch = document.querySelector('.swatch');
    
    swatch.append(redPicker);
    swatch.append(greenPicker);
    swatch.append(bluePicker);
    // return an array of dom elements for our color selectors
    return [redPicker, greenPicker, bluePicker];
  }

  setupPixelListeners(color){
    const pixels = document.querySelectorAll('.pixel');
    for (const pixel of pixels){    
      pixel.addEventListener('click', this.colorPixelCallback(pixel, color));
      // attach listeners for mouse up and down to color grid by dragging
      pixel.addEventListener('mouseenter', this.colorPixelCallback(pixel, color));
      pixel.addEventListener('mousedown', this.colorPixelCallback(pixel, color));
      pixel.addEventListener('mouseup', () => Board.mouseButtonDown = false);
    }
  }

  colorPixelCallback(pixel, color){
    return function(event){
      console.log("Event: " + event.type, "on Grid Button: " + event.target.getAttribute("pixel-number"));
      const pixNum = pixel.getAttribute('pixel-number');
      // check event type
      if (event.type == 'click'){ 
        // single pixel clicked
        console.log("Pixel: " + pixNum, " is being colored by click: " + color);
        pixel.style.backgroundColor = color;
      } else if (event.type == 'mouseenter' &&  Board.mouseButtonDown){ 
        // mouse held down + moved over to next pixel
        console.log("Pixel: " + pixNum, " is being colored by drag: " + color);
        pixel.style.backgroundColor = color;
      } else if (event.type == 'mousedown'){ 
        // mouse hold starts coloring current pixel
        console.log("Drag brush begin... Pixel: " + pixNum, " is being colored " + color);
        Board.mouseButtonDown = true;
        pixel.style.backgroundColor = color;
      }
    }
  }
  // end class
}

const board = new Board(20, 20);