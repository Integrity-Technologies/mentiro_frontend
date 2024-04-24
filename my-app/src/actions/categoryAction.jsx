import axios from "axios";

export const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/category/Allcategory');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };


  export const addCategory = async (newUser) => {
    try {
      console.log(newUser);
      const response = await axios.post('http://localhost:5000/api/category/create', {
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding user:', error);
      return null;
    }
  };