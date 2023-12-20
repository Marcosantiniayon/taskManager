export function getCurrentDate(){ 
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only the dates
    return today;
  }
export function isDarkColor(color) {
  // Convert hex color to rgb
  let rgb;
  if (color.startsWith('#')) {
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);
      rgb = { r, g, b };
  } else {
      // Assume it's already an rgb color
      rgb = color;
  }

  // Calculate brightness on a scale from 0 to 255
  let brightness = Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000);
  
  return brightness < 170; // Return true if the color is dark
}
export function formatDateForInput(dateString) {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset(); // Get the timezone offset in minutes
  date.setMinutes(date.getMinutes() + offset); // Adjust the date by the timezone offset
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}
export function rgbToHex(rgb) {
  // Separate RGB values
  let values = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  // Convert each value to hexadecimal
  let hexColor = "#" + ("0" + parseInt(values[1], 10).toString(16)).slice(-2) +
                    ("0" + parseInt(values[2], 10).toString(16)).slice(-2) +
                    ("0" + parseInt(values[3], 10).toString(16)).slice(-2);
  console.log(hexColor);
  return hexColor;
}
  