function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchCart() {
            const data = await getAllProductsFromCart();
            setCart(data);
        }
        fetchCart();
    }, []);

    return (
        <Card sx={{ maxWidth: 345, position: "relative", borderRadius: 2 }}>
        
          {/* Produktbild */}
          <CardMedia 
            component="img"
            height="300"
            image={product.image || placeholderImage}
            alt={`Bild på ${product.title}`}
          />
        
         {/* Pris */}
         <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {product.price} SEK 
            </Typography>
          </CardContent>
        </Card>
      );
    }
  

  export default Cart;
