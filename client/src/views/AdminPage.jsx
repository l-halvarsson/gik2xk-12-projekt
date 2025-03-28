import React, { useEffect, useState } from 'react';
import { Grid, Snackbar, Container } from '@mui/material';
import { getAllProducts, create, update, remove } from '../services/ProductService';
import AdminForm from '../components/AdminForm';
import AdminProductCard from '../components/AdminProductCard';

//// Admin-sida för att hantera produkter: skapa, uppdatera och ta bort. Visar ett formulär och en lista med produkter.
function AdminPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const loadProducts = async () => {
    const all = await getAllProducts();
    setProducts(all);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (data) => {
    await create(data);
    setSnackbar({ open: true, message: "Produkten skapades" });
    setSelectedProduct(null);
    loadProducts();
  };

  const handleUpdate = async (id, data) => {
    await update({ id, ...data });
    setSnackbar({ open: true, message: "Produkten uppdaterades" });
    setSelectedProduct(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    await remove(id);
    setSnackbar({ open: true, message: "Produkten togs bort" });
    loadProducts();
  };

  return (
    <Container sx={{ mt: 0 }}>
      {/* Använd AdminForm komponeten */}
      <AdminForm
        key={selectedProduct?.id || `new-${Date.now()}`}
        product={selectedProduct}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onClear={() => setSelectedProduct(null)}
      />

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id}>
            {/* Använd AdminProductCard komponeten */}
            <AdminProductCard
              product={product}
              onEdit={(p) => setSelectedProduct(p)}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Container>
  );
}

export default AdminPage;

