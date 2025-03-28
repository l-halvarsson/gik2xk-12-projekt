import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function BreadcrumbsNav({ lastProductTitle }) {
  // Hämtar den aktuella URL-platsen och navigeringsfunktionen
  const location = useLocation();
  const navigate = useNavigate();

  // Delar upp URL:en i delar för att bygga upp breadcrumbs
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs sx={{ mb: 5 }}>
      {/* Länk tillbaka till startsidan */}
      <Link color="inherit" onClick={() => navigate("/")}>
        Hem
      </Link>
      
      {/* Loopa igenom varje del av URL:en för att skapa breadcrumbs */}
      {pathnames.map((value, index) => {
        // Skapa en länk till den aktuella delen av URL:en
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        // Kontrollera om det är den sista breadcrumb-länken
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          // Om det är den sista länken, visa den som en vanlig text (utan länk)
          <Typography color="inherit" key={value}>
            {lastProductTitle || decodeURIComponent(value)}
          </Typography>
        ) : (
          // Annars, skapa en klickbar länk
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(routeTo)}
            key={value}
          >
            {decodeURIComponent(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsNav;
