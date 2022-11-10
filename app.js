const canvas = document.querySelector('.canvas');
const NUM_PIXELS = 20;
const PIXEL_WIDTH = 20;
canvas.style.width = `${PIXEL_WIDTH * NUM_PIXELS}px`;

for(let i = 1; i <= NUM_PIXELS ** 2; i++) {
  const pixel = document.createElement('button');
  pixel.className = "pixel";
  pixel.style.width = `${PIXEL_WIDTH}px`;
  pixel.style.height = `${PIXEL_WIDTH}px`;
  pixel.addEventListener('click', () => {
    pixel.style.background = 'red';
  });
  canvas.append(pixel);
}

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
