import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function BreadcrumbsNav({lastProductTitle}) {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs sx={{ mb: 5 }}>
      <Link  color="inherit" onClick={() => navigate("/")}>
        Hem
      </Link>
      {pathnames.map((value, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography color="inherit" key={value}>
            {lastProductTitle || decodeURIComponent(value)}
          </Typography>
        ) : (
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