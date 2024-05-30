// Function to get pixel data
export const getPixel = (imageData, x, y) => {
  const index = (y * imageData.width + x) * 4;
  return [
    imageData.data[index],     // Red
    imageData.data[index + 1], // Green
    imageData.data[index + 2], // Blue
    imageData.data[index + 3]  // Alpha
  ];
}

// Function to set pixel data
const setPixel = (imageData, x, y, color) => {
  const index = (y * imageData.width + x) * 4;
  imageData.data[index] = color[0];     // Red
  imageData.data[index + 1] = color[1]; // Green
  imageData.data[index + 2] = color[2]; // Blue
  imageData.data[index + 3] = color[3]; // Alpha
}

// Function to compare two colors
const colorsMatch = (a, b) => {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

// Flood fill algorithm
export const floodFill = (imageData, startX, startY, fillColor) => {
  const width = imageData.width;
  const height = imageData.height;
  const stack = [[startX, startY]];
  const startColor = getPixel(imageData, startX, startY);

  if (colorsMatch(startColor, fillColor)) {
    return; // Prevent infinite loop if the start color is the same as the fill color
  }

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (!colorsMatch(getPixel(imageData, x, y), startColor)) continue;

    setPixel(imageData, x, y, fillColor);

    stack.push([x + 1, y]);
    stack.push([x - 1, y]);
    stack.push([x, y + 1]);
    stack.push([x, y - 1]);
  }
}
