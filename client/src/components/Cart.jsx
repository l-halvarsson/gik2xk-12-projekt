import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import placeholderImage from "../assets/placeholder.png";
import { getPopulatedCartForUser, completePurchaseForUser } from "../services/CartService";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";



function Cart({ userId, setCartCount }) { 
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
        setCartCount(cart.reduce((acc, item) => acc + item.amount, 0));
      } catch (err) {
        console.error('Kunde inte hämta varukorg:', err.response?.data || err.message || err);
      }
    };

      useEffect(() => {
        fetchCart();
      }, [userId]);

    return (
      <Box sx={{ px: 2, py: 1, width: "100%", maxWidth: 360 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        kassa
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "gray" }}>
        du har fri frakt
      </Typography>

      {items.length === 0 ? (
        <Typography>Varukorgen är tom.</Typography>
      ) : (
        <>
          {items.map((item, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                mb: 2,
                boxShadow: "none",
                backgroundColor: "#fdfaf4",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 80, height: 100, objectFit: "cover" }}
                image={item.imageUrl || placeholderImage}
                alt={item.title}
              />
              <CardContent sx={{ flex: 1, py: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.price} SEK
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <IconButton size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.amount}</Typography>
                  <IconButton size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ backgroundColor: "#fdfaf4", p: 2, borderRadius: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>produkter</Typography>
              <Typography>{total.toFixed(2)} sek</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>rabatt</Typography>
              <Typography>0 sek</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography fontWeight="bold">summa (exkl. frakt)</Typography>
              <Typography fontWeight="bold">{total.toFixed(2)} sek</Typography>
            </Box>
          </Box>

          <Button
  variant="contained"
  fullWidth
  sx={{
    mt: 2,
    backgroundColor: "#F5F5DC", // Färgen på knappen
    color: "gray", // Textfärgen
    "&:hover": { backgroundColor: "#e0e0e0" }, // Hover-effekten
  }}
  onClick={async () => {
    try {
      await completePurchaseForUser(userId); // Markera varukorg som betald i backend
      setItems([]); // Töm frontend-visning
      setTotal(0); // Nollställ totalsumman
      setCartCount?.(0); // Återställ cartCount om du använder det
      alert("Tack för ditt köp! 🛍️");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Köpet misslyckades. Försök igen.");
    }
  }}
>
  Genomför köp
</Button>

        </>
      )}
    </Box>
    );
}


export default Cart;

