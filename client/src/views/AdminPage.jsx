import {react} from 'react';
import {Box, Typography} from '@mui/material';
import AdminForm from "../components/AdminForm"; 
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
