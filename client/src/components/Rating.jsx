import React, { useState } from "react";
import { Rating, Box, Typography } from "@mui/material";

function Ratings() {
    const [value, setValue] = useState(0); // Startvärde för betyg (0 = ingen stjärna vald)

    const handleChange = (event, newValue) => {
        setValue(newValue); // Uppdatera betyget när användaren klickar på en stjärna
    };

    return (
        <Box>
            <Typography component="legend">Betygsätt oss!</Typography>
            <Rating
                name="simple-controlled"
                value={value} // Det aktuella betyget
                onChange={handleChange} // Funktion som körs när användaren ändrar betyget
                max={5} // Max antal stjärnor
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
                Du har valt {value} stjärnor.
            </Typography>
        </Box>
    );
}

export default Ratings;
