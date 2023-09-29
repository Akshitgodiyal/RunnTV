
export const TimeConverter = (seconds) => {

  if(seconds != undefined){
  const formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8);

  return formattedTime;
  }
};
export function capitalizeFirstLetter(string) {
  if (typeof string !== "string") {
    return ""; // If not a string, return an empty string
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function formatNumber(number) {
  if (isNaN(number) || number < 0) {
    return 'Invalid Input'; // Handle invalid inputs
  }

  const symbols = ['', 'k', 'm', 'b', 't']; // Add more symbols as needed for larger numbers
  const tier = Math.log10(Math.abs(number)) / 3 | 0;

  if (tier === 0) return number;

  const suffix = symbols[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;
  return scaled.toFixed(1) + suffix;
}