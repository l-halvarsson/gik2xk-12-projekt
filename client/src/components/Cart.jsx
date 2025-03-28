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
import { getPopulatedCartForUser, completePurchaseForUser, increaseProductAmount, decreaseProductAmount} from "../services/CartService";


function Cart({ userId, setCartCount }) { 
  console.log("Användar-ID i Cart:", userId);

  const [items, setItems] = useState([]); // Lista över produkter i varukorgen
  const [total, setTotal] = useState(0); // Totalt pris för varukorgen
  const [userName, setUserName] = useState(""); // Sparar användarnamn

  // Hämtar användarnamn från localStorage vid sidladdning
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  
  // Hämtar varukorgen för en specifik användare
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

  // Ökar antal av en produkt i varukorgen
  const handleAddedAmount = async (userId, productId) => {
    console.log("➕ Klick: ", userId, productId);
    try {
      await increaseProductAmount(userId, productId);
      fetchCart(); // Uppdaterar varukorgen
    } catch (err) {
      console.error("Kunde inte öka antal:", err);
    }
  };

  // Minskar antal av en produkt i varukorgen
  const handleReducedAmount = async (userId, productId) => {
    try {
      await decreaseProductAmount(userId, productId);
      fetchCart(); // Uppdaterar varukorgen
    } catch (err) {
      console.error("Kunde inte minska antal:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <Box sx={{ px: 2, py: 1, width: "100%", maxWidth: 360 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Kassa
      </Typography>

      {userName && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Hej, {userName} 👋
        </Typography>
      )}

      <Typography variant="body2" sx={{ mb: 2, color: "gray" }}>
        Du har fri frakt
      </Typography>

      {items.length === 0 ? (
        <Typography>Varukorgen är tom.</Typography>
      ) : (
        <>
          {items.map((item, index) => {
            console.log("item:", item);
            return (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  mb: 2,
                  boxShadow: "none",
                  backgroundColor: "#fdfaf4",
                }}
              >
                {/* Produktbild */}
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 100, objectFit: "cover" }}
                  image={item.imageUrl || placeholderImage}
                  alt={item.title}
                />
                
                {/* Produktinfo och kontroller för antal */}
                <CardContent sx={{ flex: 1, py: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price} SEK
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    {/* Minska antal knapp */}
                    <IconButton size="small" onClick={() => handleReducedAmount(userId, item.product_id)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.amount}</Typography>
                    {/* Öka antal knapp */}
                    <IconButton size="small" onClick={() => handleAddedAmount(userId, item.product_id)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            );
          })}

          <Divider sx={{ my: 2 }} />

          {/* Sammanställning av pris */}
          <Box sx={{ backgroundColor: "#fdfaf4", p: 2, borderRadius: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Produkter</Typography>
              <Typography>{total.toFixed(2)} SEK</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Rabatt</Typography>
              <Typography>0 SEK</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography fontWeight="bold">Summa (exkl. frakt)</Typography>
              <Typography fontWeight="bold">{total.toFixed(2)} SEK</Typography>
            </Box>
          </Box>

          {/* Knapp för att genomföra köp */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#F5F5DC", 
              color: "gray", 
              "&:hover": { backgroundColor: "#e0e0e0" }, 
            }}
            onClick={async () => {
              try {
                await completePurchaseForUser(userId); // Markera varukorg som betald i backend
                setItems([]); 
                setTotal(0); 
                setCartCount?.(0); 
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

