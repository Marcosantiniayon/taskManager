export function getCurrentDate(){ 
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only the dates
    return today;
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

  