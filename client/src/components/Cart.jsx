import React, { useEffect, useState } from "react";
import { getPopulatedCartForUser } from "../services/CartService";
import { Button, Typography, Box } from "@mui/material";


function Cart({ userId }) { 
  //const { userId } = useOutletContext(); 
  console.log("Användar-ID i Cart:", userId);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
      if (!userId) return 
      try {
        const cart = await getPopulatedCartForUser(userId);
        setItems(cart);
        const sum = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
        setTotal(sum);
      } catch (err) {
        console.error('Kunde inte hämta varukorg:', err.response?.data || err.message || err);
      }
    };

      useEffect(() => {
        fetchCart();
      }, [userId]);

    return (
        <Box>
            {items.length === 0 ? (
                <Typography>Varukorgen är tom.</Typography>
            ) : (
            <>
            {items.map((item, i) => (
                <Typography key={i}>
                {item.title} – {item.amount} st – {item.price * item.amount} kr
                </Typography>
            ))}
            <Typography sx={{ mt: 2 }}><strong>Summa: {total} kr</strong></Typography>
            <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                Gå till kassan
            </Button>
            </>
        )}  
        </Box>
    );
}


export default Cart;

