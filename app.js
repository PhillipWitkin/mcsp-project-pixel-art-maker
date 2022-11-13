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

createGrid()
const colorOptions = createPalette();
for (const color of colorOptions) {
  color.addEventListener('click', () => {
    handler && removePixelListeners(handler);
    colorString = color.style.backgroundColor;
    console.log("Selected color: " + colorString);
    handler = setupPixelListeners(colorString)
  });
};