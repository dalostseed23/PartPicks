import { useContext } from 'react';
import { AppContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';

const CartPage = () => {
    const { cart, dispatch, setActiveCategory } = useContext(AppContext);
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    if (cart.length === 0) {
        return (
            <Container
                className="d-flex flex-column justify-content-center align-items-center py-5"
                style={{ minHeight: '100vh' }}
            >
                <h1 className="display-5 fw-bold mb-3 text-center">Your Cart is Empty</h1>
                <p className="lead text-muted mb-4 text-center">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Button
                    variant="info"
                    size="lg"
                    onClick={() => {
                        setActiveCategory(null);
                        navigate('/products');
                    }}
                >
                    Start Shopping
                </Button>
            </Container>
        );
    }

    const updateQuantity = (id, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

    const removeItem = (id) =>
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });

    return (
        <Container className="py-5 d-flex flex-column" style={{ minHeight: '100vh' }}>
            <h1 className="display-5 fw-bold mb-5">Your Shopping Cart</h1>
            <Row className="flex-grow-1">
                <Col lg={8}>
                    <ListGroup variant="flush">
                        {cart.map((item) => (
                            <ListGroup.Item
                                key={item.id}
                                className="bg-dark text-white d-flex justify-content-between align-items-center flex-wrap"
                            >
                                <div className="d-flex align-items-center my-2">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        rounded
                                        width="80"
                                        height="80"
                                        className="me-3"
                                    />
                                    <div>
                                        <h5 className="ml-3 mb-0">{item.name}</h5>
                                        <p className="ml-3 text-muted mb-0">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center my-2">
                                    <Button
                                        variant="link"
                                        className="text-white p-0"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <FontAwesomeIcon icon={faMinusCircle} />
                                    </Button>
                                    <span className="mx-3">{item.quantity}</span>
                                    <Button
                                        variant="link"
                                        className="text-white p-0"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </Button>
                                    <span
                                        className="fw-bold mx-4"
                                        style={{ minWidth: '80px', textAlign: 'right' }}
                                    >
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <Button
                                        variant="link"
                                        className="text-danger p-0"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col lg={4}>
                    <Card bg="dark" text="white" className="shadow">
                        <Card.Body>
                            <Card.Title as="h4" className="mb-4">
                                Order Summary
                            </Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                                    <span>Taxes (13%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-white d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </ListGroup.Item>
                            </ListGroup>
                            <div className="d-grid mt-4">
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;

