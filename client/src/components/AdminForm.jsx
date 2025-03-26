import {react} from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Snackbar,
    Stack
} from '@mui/material';

import {
    create,
    update,
    getOne,
    remove
} from '../services/ProductService';
  

function AdminForm(){
    const [product, setProduct] = useState({ title: '', description: '', price: '', id: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Hantera formulärändringar
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Skapa en ny produkt
    const handleCreateProduct = async () => {
        setIsLoading(true);
        try {
            const response = await create(product);  // Använd backend-funktion för att skapa produkt
            setSnackbarMessage('Produkten har skapats');
            setSnackbarOpen(true);
            setProduct({ title: '', description: '', price: '', id: '' }); // Rensa formuläret
        } catch (error) {
            setSnackbarMessage('Det gick inte att skapa produkten');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Hämta produktinformation för att uppdatera
    const handleGetProduct = async () => {
        setIsLoading(true);
        try {
            const response = await getOne(product.id); // Hämta produktdata från backend
            if (response) {
                setProduct(response); // Fyll i formuläret med produktdata
            } else {
                setSnackbarMessage('Produkten finns inte');
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage('Kunde inte hämta produktinformation');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Uppdatera en produkt
    const handleUpdateProduct = async () => {
        setIsLoading(true);
        try {
            const response = await update(product); // Uppdatera produkt via backend
            setSnackbarMessage('Produkten har uppdaterats');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Det gick inte att uppdatera produkten');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Radera en produkt
    const handleDeleteProduct = async () => {
        setIsLoading(true);
        try {
            const response = await remove(product.id); // Ta bort produkt via backend
            setSnackbarMessage('Produkten har tagits bort');
            setSnackbarOpen(true);
            setProduct({ title: '', description: '', price: '', id: '' }); // Rensa formuläret
        } catch (error) {
            setSnackbarMessage('Det gick inte att radera produkten');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Hantera stängning av snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Skapa, Uppdatera eller Ta bort Produkt</Typography>

            {/* Formulär för att skapa eller uppdatera produkt */}
            <TextField
                label="Produkt-ID"
                name="id"
                value={product.id}
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            {/* Knapp för att hämta produkt med ID */}
            <Button variant="contained" color="primary" onClick={handleGetProduct} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Hämta produkt'}
            </Button>

            <TextField
                label="Produktnamn"
                name="title"
                value={product.title}
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Beskrivning"
                name="description"
                value={product.description}
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Pris"
                name="price"
                value={product.price}
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
            />

            {/* Knapp för att skapa eller uppdatera produkt */}
            <Button variant="contained" color="primary" onClick={product.id ? handleUpdateProduct : handleCreateProduct} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : product.id ? 'Uppdatera produkt' : 'Skapa produkt'}
            </Button>

            {/* Knapp för att ta bort produkt */}
            <Button variant="contained" color="secondary" onClick={handleDeleteProduct} disabled={isLoading || !product.id}>
                {isLoading ? <CircularProgress size={24} /> : 'Ta bort produkt'}
            </Button>

            {/* Snackbar för att visa meddelanden */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );


}
export default AdminForm;





