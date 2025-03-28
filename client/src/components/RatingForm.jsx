import React, { useState } from "react";
import { Rating as MuiRating, Box, Typography, Button } from "@mui/material";
import axios from 'axios';
import { addRating } from "../services/ProductService";

// Formulärkomponent för att betygsätta en produkt med stjärnor. Hanterar val, sändning och bekräftelsemeddelande.
function RatingForm({ productId, onRatingSubmitted }) {
    const [value, setValue] = useState(0); // Startvärde för betyg (0 = ingen stjärna vald)
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue); // Uppdatera betyget när användaren klickar på en stjärna
        setSubmitted(false);
    };

    const handleSubmit = () => {
        if (value === 0) {
            alert("Välj ett betyg först!");
            return;
        }
          
          addRating(productId, value)
          .then(() => {
            console.log("Betyg skickat! Kör onRatingSubmitted...");
            onRatingSubmitted?.();
            setSubmitted(true);
            setTimeout(() => {
              setSubmitted(false); // dölj efter 3 sek
              setValue(0);         // återställ
            }, 3000);
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
            {/* Skicka betyg knappen */}
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
            {/*Visa meddelande när betyget är skickat*/}
            {submitted && ( 
        <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
          Betyget har registrerats!
        </Typography>
      )}
        </Box>
    );
}

export default RatingForm;