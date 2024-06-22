// IPAction.js
const getIpInfo = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json');
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch IP information');
      }
    } catch (error) {
      console.error('Error fetching IP information:', error);
      throw error; // Propagate the error back to the caller
    }
  };
  
  export default getIpInfo;
  