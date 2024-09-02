// const validateAndCorrectImageUrl = (urlString) => {
//   try {
//     const parsedArray = JSON.parse(urlString);
//     if (Array.isArray(parsedArray) && parsedArray.length > 0) {
//       const firstElement = parsedArray[0];
//       const finalUrls = JSON.parse(firstElement);
//       if (Array.isArray(finalUrls) && finalUrls.length > 0) {
//         return finalUrls[0];
//       }
//     }
//   } catch (e) {}

//   const isValidUrl = /^https?:\/\/.*/.test(urlString);
//   return isValidUrl ? urlString : 'https://via.placeholder.com/640x480'; // Default image URL
//   };



const validateAndCorrectImageUrl = (urlString) => {

  let cleanedString = urlString.replace(/[[\]"]/g, '');
    
  // Split the string by comma if there are multiple URLs (not in your case, but this makes it more robust)
  let urls = cleanedString.split(',');

  // Return the first URL
  return urls[0].trim();

}

  export default validateAndCorrectImageUrl;