// Utility to chunk an array into smaller arrays of a given size
export function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  
  // Utility to introduce a delay (in milliseconds)
  export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  