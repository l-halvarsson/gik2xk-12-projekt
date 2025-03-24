import React, { useEffect, useState } from "react";
import { getAllProductsInCart } from "../services/CartService";
import { addRating } from "../services/ProductService";
import { Button, Typography, Box } from "@mui/material";


function Cart({ userId }) {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) return; 
            try {
                const data = await getAllProductsInCart(userId);
                setCartItems(data.cart);
                setTotalPrice(data.totalPrice);
            } catch (error) {
                console.error("Ett fel uppstod vid hämtning av varukorgen:", error);
            }
        };

        fetchCartItems();
    }, [userId,updateCart ]);

    return (
        <Box>
            {cartItems.length === 0 ? (
                <Typography>Din varukorg är tom</Typography>
            ) : (
                <Box>
                    {cartItems.map((item) => (
                        <Box key={item.productId}>
                            <Typography>{item.title} - {item.amount} st - {item.total} SEK</Typography>
                        </Box>
                    ))}
                    <Typography>Total: {totalPrice} SEK</Typography>
                    <Button variant="contained">Gå till kassan</Button>
                </Box>
            )}
        </Box>
    );
}

export default Cart;

