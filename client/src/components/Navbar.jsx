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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import { Avatar, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import axios from "../services/api";
import Cart from './Cart';
import { getPopulatedCartForUser } from "../services/CartService";
function Navbar({ userId, setUserId }){
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

    const [cartCount, setCartCount] = useState(0);
    const [loginOpen, setLoginOpen] = useState(false);
    const [userName, setUserName] = useState("");
    async function handleLogin() {
        try {
            const response = await axios.get(`/users/${userId}`);
            const user = response.data;
            localStorage.setItem("userId", userId);
            setUserId(user.id);
            setUserName(user.firstName);
            setLoginOpen(false);
            alert("Inloggad som användare " + user.firstName);
        } catch (error) {
            alert("Användare med id: " + userId + " hittades inte.");
            setUserName("");
            localStorage.removeItem("userId");
        }
    }
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
                    <Cart userId={userId} /> 
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
