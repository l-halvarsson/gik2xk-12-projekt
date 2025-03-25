import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
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
    ListItemText 
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import { Avatar, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import axios from "../services/api";
import Cart from './Cart';

function Navbar(){
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


    const [loginOpen, setLoginOpen] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
    const [userName, setUserName] = useState("");
    async function handleLogin() {
        try {
            const response = await axios.get(`/users/${userId}`);
            const user = response.data;
            localStorage.setItem("userId", userId);
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


    return (
        <AppBar position="sticky" sx={{height: "7rem", backgroundColor: "#F6F5F0", boxShadow: 'none'}}>
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
                    <ShoppingCartIcon />
                </IconButton>
                </Box>


            </Toolbar>

            {/* Varukorgens sidopanel */}
            <Drawer anchor="right" open={cartOpen}  onClose={toggleCart(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <Cart userId={userId} updateCart={updateCart} /> 
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
