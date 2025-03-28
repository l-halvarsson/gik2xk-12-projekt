import axios from './api';

//functionen hämtar produkter från backend
export async function getAllProducts() {
    try {
        const response = await axios.get('/products');
        if (response.status === 200) return response.data;
        else {
            console.log(response);
            return[];
        }

    } catch (e) {
        console.error("Produkterna gick inte att hämta ut")
    }
    
}
//Hämtar en produkt från backend
  export async function getOne(id) {
      try {
        const response = await axios.get(`/products/${id}`);
        if (response.status === 200) return response.data;
        else {
          console.log(response.data);
          return null;
        }
      } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
      }
  }
     //Skapar en produkt från backend 
  export async function create(product) {
    try {
      const response = await axios.post('/products', product);
      if (response.status >= 200 && response.status < 300) return response.data;
      else {
        console.log(response.data);
        return null;
      }
    } catch (e) {
      e?.response ? console.log(e.response.data) : console.log(e);
    }
  }

  //Uppdaterar en produkt från backend
export async function update(product) {
  try {
    const response = await axios.put(`/products/${product.id}`, product);
    if (response.status >= 200 && response.status < 300) return response.data;
    else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  }
}

//Raderar en produkt från backend
      export async function remove(id) {
        try {
          const response = await axios.delete(`/products/${id}`);
          if (response.status === 200) return response.data;
          else {
            console.log(data);
            return null;
          }
        } catch (e) {
          e?.response ? console.log(e.response.data) : console.log(e);
        }
    }

    //Sätter betyg från backend
    export async function addRating(productId, ratingValue) {
      try {
        const response = await axios.post(`/products/${productId}/ratings`, {
          rating: ratingValue
        });
    
        if (response.status === 200 || response.status === 201) {
          return response.data;
        } else {
          console.log(response.data);
          return null;
        }
      } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
        return null;
      }
    }
