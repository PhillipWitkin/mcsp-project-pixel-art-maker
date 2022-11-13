const canvas = document.querySelector('.canvas');
const NUM_PIXELS = 20;
const PIXEL_WIDTH = 20;


function createGrid(numPixels, pixelWidth){
  this.numPixels = numPixels ?? NUM_PIXELS; 
  this.pixelWidth = pixelWidth ?? PIXEL_WIDTH;
  for(let i = 1; i <= this.numPixels ** 2; i++) {
    const pixel = document.createElement('button');
    pixel.className = 'pixel';
    pixel.style.width = `${this.pixelWidth}px`;
    pixel.style.height = `${this.pixelWidth}px`;
    canvas.style.width = `${this.pixelWidth * this.numPixels}px`;
    pixel.setAttribute('pixel-number', i);
    canvas.append(pixel);
  }
}

function createPalette(...colors){
  if (colors.length == 0){ // set a default color palette if none are passed in
    colors = ["red", "green", "blue"];
  }
  console.log("Colors for Palette: " + colors.toString());
  const swatch = document.querySelector('.swatch');
  let palette = []; 
  for (const color of colors){
    const colorChoice = document.createElement('div');
    colorChoice.className = 'color-picker';
    colorChoice.style.backgroundColor = color;
    palette.push(colorChoice);
    swatch.append(colorChoice);
  }
  // return an array of dom elements for our color selectors
  return palette;
}

// This will be called by the event listener, automatically has access to triggering 'event'
function colorPixelCallback(color){
  return function(event){
    const pixel = event.target;
    console.log("Event: " + event.type, "on Grid Button: " + event.target.getAttribute("pixel-number"));
    const pixNum = pixel.getAttribute('pixel-number');
    // check event type
    if (event.type == 'click'){ 
      // single pixel clicked
      console.log("Pixel: " + pixNum, " is being colored by click: " + color);
      pixel.style.backgroundColor = color;
    } else if (event.type == 'mouseenter' && mouseButtonDown){ 
      // mouse held down + moved over to next pixel
      console.log("Pixel: " + pixNum, " is being colored by drag: " + color);
      pixel.style.backgroundColor = color;
    } else if (event.type == 'mousedown'){ 
      // mouse hold starts coloring current pixel
      console.log("Drag brush begin... Pixel: " + pixNum, " is being colored " + color);
      mouseButtonDown = true;
      pixel.style.backgroundColor = color;
    }

  }
}

function setupPixelListeners(color){
  pixels = document.querySelectorAll('.pixel');
  const handler = colorPixelCallback(color);
  canvas.addEventListener('click', handler);
  canvas.addEventListener('mouseup', () => mouseButtonDown = false);
  for (const pixel of pixels){    
    // attach listeners for mouse enter and down to color grid by dragging
    pixel.addEventListener('mouseenter', handler);
    pixel.addEventListener('mousedown', handler);
  }
  return handler;
}


function removePixelListeners(handler){
  console.log("Removing listeners");
  canvas.removeEventListener('click', handler);
  pixels = document.querySelectorAll('.pixel');
  for (const pixel of pixels){    
    pixel.removeEventListener('mouseenter', handler);
    pixel.removeEventListener('mousedown', handler);
  }
}

// The only globally scoped variables we will need to change at runtime
var mouseButtonDown = false;
var handler;

createGrid(25,25)
const colorOptions = createPalette();
for (const color of colorOptions) {
  color.addEventListener('click', () => {
    handler && removePixelListeners(handler);
    colorString = color.style.backgroundColor;
    console.log("Selected color: " + colorString);
    handler = setupPixelListeners(colorString)
  });
};