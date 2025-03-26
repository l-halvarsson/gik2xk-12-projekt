import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar } from '@mui/material';
import { create, update, getOne, remove } from '../services/productService'; // Importera backend-funktionerna för produkter
import ProductList from "../components/AdminForm";

function AdminPage() {
    
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Administrera Produkter
            </Typography>
            <AdminForm /> 
        </Box>
    
    );
}

export default AdminPage;
