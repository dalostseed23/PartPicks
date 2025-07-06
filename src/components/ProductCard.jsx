import  { useContext } from 'react';
import { AppContext } from './AppContext';
import Rating from './Rating';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
    const { dispatch } = useContext(AppContext);

    return (
        <Card
            bg="dark"
            text="white"
            className="h-100 shadow-sm"
            style={{ maxWidth: '350px', margin: '0 auto' }} 
        >
            <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="h5">{product.name}</Card.Title>
                <Card.Text className="text-muted">
                    {product.brand} - {product.category}
                </Card.Text>
                <Rating rating={product.rating} />
                <div className="mt-auto d-flex justify-content-between align-items-center pt-3">
                    <p className="h5 text-info mb-0">${product.price.toFixed(2)}</p>
                    <Button variant="info" className="px-3" style={{ whiteSpace: 'nowrap' }} onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>Add to Cart</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard
