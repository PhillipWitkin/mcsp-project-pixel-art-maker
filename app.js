const canvas = document.querySelector('.canvas');
const NUM_PIXELS = 20;
const PIXEL_WIDTH = 20;
// canvas.style.width = `${PIXEL_WIDTH * NUM_PIXELS}px`;

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

function colorPixelCallback(color){
  return function(event){
    const pixel = event.target;
    console.log("Event: " + event.type, "on Grid Button: " + event.target.getAttribute("pixel-number"));
    console.log("Pixel " + pixel.getAttribute('pixel-number') + " is being colored: " + color);
    pixel.style.backgroundColor = color;
  }
}


function setupPixelListeners(color){
  pixels = document.querySelectorAll('.pixel');
  const handler = colorPixelCallback(color);
  for (const pixel of pixels){    
    pixel.addEventListener('click', handler);
  }
  return handler;
}

function removePixelListeners(handler){
  console.log("Removing listeners");
  pixels = document.querySelectorAll('.pixel');
  for (const pixel of pixels){    
    pixel.removeEventListener('click', handler);
  }
}

createGrid(25, 25);
const colorOptions = createPalette("red", "blue", "purple");
var handler;
for (const color of colorOptions) {
  color.addEventListener('click', () => {
    handler && removePixelListeners(handler);
    colorString = color.style.backgroundColor;
    console.log("Selected color: " + colorString);
    handler = setupPixelListeners(colorString)
  });
};
