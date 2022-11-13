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

createGrid()
colorOptions = createPalette();
var brushColor;
var handler;
for (const color of colorOptions) {
  color.addEventListener('click', () => {
    handler && removePixelListeners(handler);
    colorString = color.style.backgroundColor;
    console.log("Selected color: " + colorString);
    brushColor = colorString;
    handler = setupPixelListeners(colorString)
  });
};
