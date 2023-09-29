
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