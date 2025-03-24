import React, { useState } from "react";
import { Rating as MuiRating, Box, Typography, Button } from "@mui/material";
import axios from 'axios';

function Rating({ productId, onRatingSubmitted }) {
    const [value, setValue] = useState(0); // Startvärde för betyg (0 = ingen stjärna vald)

    const handleChange = (event, newValue) => {
        setValue(newValue); // Uppdatera betyget när användaren klickar på en stjärna
    };

    const handleSubmit = () => {
        // Skicka betyget till backend
        axios.post(`/api/products/${productId}/ratings`, { rating: value })
            .then(response => {
                // När betyget skickas och sparas, uppdatera medelbetyget
                onRatingSubmitted(); // En callback för att uppdatera medelbetyget
                setValue(0); // Återställ betyget efter inlämning (eller använd en annan logik)
            })
            .catch(error => console.error("Fel vid sändning av betyg:", error));
    };

    return (
        <Box>
            <Typography component="legend">Betygsätt produkten!</Typography>
            <MuiRating
                name="simple-controlled"
                value={value} // Det aktuella betyget
                onChange={handleChange} // Funktion som körs när användaren ändrar betyget
                max={5} // Max antal stjärnor
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    mb: 2,
                    backgroundColor: "#F5F5DC",
                    color: "gray",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                    mt: 2
                }}
            >
                Skicka betyg
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Du har valt {value} stjärnor.
            </Typography>
        </Box>
    );
}

export default Rating;

