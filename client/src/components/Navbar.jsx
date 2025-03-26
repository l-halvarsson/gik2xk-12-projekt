import React, { useEffect, useState } from "react";  // Importerar React och hooks korrekt
import { Link, Outlet, useNavigate } from "react-router-dom"; // Importerar Link, Outlet och useNavigate i samma rad
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Menu, 
    MenuItem, 
    Box, 
    Drawer, 
    List, 
    ListItem, 
    Tooltip,
    ListItemText,
    Badge
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import { Avatar, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import axios from "../services/api";
import Cart from './Cart';
import { getPopulatedCartForUser } from "../services/CartService";


function Navbar({ userId, setUserId, setCartCount, cartCount }){
    const [cartOpen, setCartOpen] = useState(false);
    function toggleCart(open) { 
        return () => {
          setCartOpen(open);
        };
    }
    const [menuDropDown, setMenuDropDown] = useState(null);
    
    function openMenuDropDown(event) {
        setMenuDropDown(event.currentTarget);
    }
   
    function closeMenuDropDown() {
        setMenuDropDown(null);
    }

    //const [cartCount, setCartCount] = useState(0);
    const [loginOpen, setLoginOpen] = useState(false);
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
          setUserName(storedName);
        }
      }, []);

      async function handleLogin() {
        try {
          const response = await axios.get(`/users/${userId}`);
          const user = response.data;
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", user.firstName); //  Spara namnet
          setUserId(user.id);
          setUserName(user.firstName);
          setLoginOpen(false);
          alert("Inloggad som användare " + user.firstName);
        } catch (error) {
          alert("Användare med id: " + userId + " hittades inte.");
          setUserName("");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName"); //  Ta bort namnet om det var fel
        }
      }
      // Hanterar  utlogg TILLAGT L
        const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        setUserId("");
        setUserName("");
        setCartCount(0);
      };
    
    const navigate = useNavigate();
    function goToAdmin() {
        navigate("/admin");
    }


    const [cartUpdated, setCartUpdated] = useState(false);
    const updateCart = () => {
        setCartOpen(true); // Öppna varukorg när den uppdateras
    };
    useEffect(() => {
        if (userId) {
            getPopulatedCartForUser(userId).then((cartData) => {
                console.log("Cart data:", cartData);
                const count = cartData.reduce((acc, item) => acc + item.amount, 0);
                setCartCount(count); // Uppdatera cartCount när varukorgen hämtas
            });
        }
    }, [userId]);

    async function handleAddToCart(productId, amount) {
        try {
          const { count } = await addProductToCart(userId, productId, amount);  // Uppdatera antalet samtidigt som produkten läggs till
          setCartCount(count); // Uppdatera antalet i navbar direkt
        } catch (error) {
          console.error('Fel vid att lägga till i varukorgen:', error);
        }
      }
      


    return (
        <AppBar 
  position="sticky" 
  sx={{ 
    height: "7rem", 
    background: "linear-gradient(to bottom, #E0DED7, #F6F5F0)", 
    boxShadow: "none" 
  }}
>

            <Toolbar sx={{height: "100%", display: "flex", justifyContent: "space-between" }}>

                {/* Vänster del - meny */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Typography sx={{ cursor: "pointer", display: "flex", alignItems: "center", color: "grey" }}  onClick={openMenuDropDown}>
                        Produkter<KeyboardArrowDownIcon />
                    </Typography>
                    <Menu anchorEl={menuDropDown} open={Boolean(menuDropDown)} onClose={closeMenuDropDown}>
                        <MenuItem onClick={closeMenuDropDown} component={Link} to="/products">
                            Visa alla produkter
                        </MenuItem>
                    </Menu>
                </Box>


                {/* Mitten - logo */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "grey", alignItems: "center"}}>
                        CHIC REVIVAL <HiveOutlinedIcon sx={{ ml: 1 }} />
                    </Link>
                </Typography>


                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>

                {/* Avatar eller inloggningsikon */}
                {userName ? (
                    <Tooltip title={`Gå till admin (${userName})`}>
                    <IconButton onClick={goToAdmin}>
                        <Avatar sx={{ bgcolor: "#888", width: 40, height: 40 }}>
                        {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                    </Tooltip>
                ) : (
                    <IconButton 
                        onClick={() => setLoginOpen(true)}
                        sx={{ width: 50, height: 50 }}
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                )}
                {/* Logga ut */}
                {userName && (
                <Tooltip title="Logga ut">
                    <IconButton onClick={handleLogout}>
                    <LogoutIcon />
                    </IconButton>
                </Tooltip>
                )}


                {/* Varukorg */}
                <span>|</span>
                <IconButton onClick={toggleCart(true)}>
                    <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon />
                     </Badge>
                </IconButton>
                </Box>


            </Toolbar>

            {/* Varukorgens sidopanel */}
            <Drawer anchor="right" open={cartOpen}  onClose={toggleCart(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <Cart userId={userId} setCartCount={setCartCount} /> 
                </Box>
            </Drawer>

                <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
                <DialogTitle>Logga in</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Användar-ID"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setLoginOpen(false)}>Avbryt</Button>
                <Button onClick={handleLogin} variant="contained">Logga in</Button>
                </DialogActions>
                </Dialog>

        </AppBar>
    );
}

export default Navbar;
