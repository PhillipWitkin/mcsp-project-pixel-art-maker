const canvas = document.querySelector('.canvas');
const NUM_PIXELS = 20;
const PIXEL_WIDTH = 20;
canvas.style.width = `${PIXEL_WIDTH * NUM_PIXELS}px`;

function createGrid(){
  for(let i = 1; i <= NUM_PIXELS ** 2; i++) {
    const pixel = document.createElement('button');
    pixel.className = 'pixel';
    pixel.style.width = `${PIXEL_WIDTH}px`;
    pixel.style.height = `${PIXEL_WIDTH}px`;
    pixel.setAttribute('pixel-number', i)
    canvas.append(pixel);
  }
}

function createPalette(){
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
  
  swatch.append(redPicker)
  swatch.append(greenPicker)
  swatch.append(bluePicker)
  // return an array of dom elements for our color selectors
  return [redPicker, greenPicker, bluePicker]
}

// This will be called by the event listener, automatically has access to triggering 'event'
function colorPixelCallback(pixel, color){
  return function(event){
    console.log("Event: " + event.type, "on Grid Button: " + event.target.getAttribute("pixel-number"));
    const pixNum = pixel.getAttribute('pixel-number');
    if (event.type == 'click'){
      console.log("Pixel: " + pixNum, " is being colored by click: " + color);
      pixel.style.backgroundColor = color;
    } else if (event.type == 'mouseenter' && mouseState == 'down'){
      console.log("Pixel: " + pixNum, " is being colored by drag: " + color);
      pixel.style.backgroundColor = color;
    } else if (event.type == 'mousedown'){
      console.log("Pixel: " + pixNum, " is being colored... " + color);
      mouseState = 'down';
      pixel.style.backgroundColor = color;
    }

  }
}

function setupPixelListeners(color){
  pixels = document.querySelectorAll('.pixel');
  for (const pixel of pixels){    
    pixel.addEventListener('click', colorPixelCallback(pixel, color));
    pixel.addEventListener('mouseenter', colorPixelCallback(pixel, color));
    // attach listeners for mouse up and down to color grid by dragging
    pixel.addEventListener('mousedown', colorPixelCallback(pixel, color));
    pixel.addEventListener('mouseup', () => mouseState = 'up');
  }
}


var mouseState = 'up';

createGrid()
colorOptions = createPalette()
for (const color of colorOptions) {
  color.addEventListener('click', () => {
    const colorString = color.style.backgroundColor;
    console.log("Selected color: " + colorString);
    setupPixelListeners(colorString)
  });
};