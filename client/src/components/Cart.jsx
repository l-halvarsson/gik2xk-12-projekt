import React, { useEffect, useState } from "react";
import { getAllProductsInCart } from "../services/CartService";
import { addRating } from "../services/ProductService";
import { Button, Typography, Box } from "@mui/material";


function Cart({ userId, updateCart}) {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCartItems = async () => {
        if (!userId) return;
        try {
          const items = await getAllProductsInCart(userId);
          setCartItems(items);
    
          const total = items.reduce(
            (sum, item) => sum + item.price * item.amount,
            0
          );
          setTotalPrice(total);
        } catch (error) {
          console.error("Ett fel uppstod vid hämtning av varukorgen:");
        }
      };

      useEffect(() => {
        fetchCartItems();
      }, [userId, updateCart]);
    

    return (
        <Box>
            {cartItems.length === 0 ? (
                <Typography>Din varukorg är tom</Typography>
            ) : (
                <Box>
      {cartItems.length === 0 ? (
        <Typography>Din varukorg är tom</Typography>
      ) : (
        <Box>
          {cartItems.map((item, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="body1">
                {item.title} – {item.amount} st – {item.price * item.amount} SEK
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Totalt: {totalPrice} SEK</Typography>
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Gå till kassan
          </Button>
        </Box>
      )}
    </Box>
            )}
        </Box>
    );
}

export default Cart;

