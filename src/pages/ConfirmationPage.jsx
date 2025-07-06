import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ConfirmationPage = () => {
    const { orderDetails, setActiveCategory } = useContext(AppContext);
    const navigate = useNavigate();

    if (!orderDetails) {
        return (
            <Container
                className="d-flex flex-column justify-content-center align-items-center text-center"
                style={{ height: '100vh' }}
            >
                <h1 className="display-5">No Order Found</h1>
                <Button variant="info" size="lg" onClick={() => navigate('/')}>
                    Go Home
                </Button>
            </Container>
        );
    }

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center py-5"
            style={{ height: '100vh' }}
        >
            <Row className="justify-content-center w-100">
                <Col md={8} lg={6}>
                    <Card bg="dark" text="white" className="text-center p-4 shadow">
                        <Card.Body>
                            <Card.Title as="h1" className="display-4 text-info">
                                Thank You!
                            </Card.Title>
                            <Card.Text className="lead">
                                Your order has been placed successfully.
                            </Card.Text>
                            <p className="text-muted">
                                Your order ID is:{' '}
                                <code className="bg-secondary p-1 rounded">{orderDetails.id}</code>
                            </p>
                            <p>We've sent a confirmation to {orderDetails.email}.</p>
                            <div className="d-grid gap-2 mt-4">
                                <Button className="mr-4 "variant="info" onClick={() => navigate('/survey')}>
                                    Take a Quick Survey
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => {
                                        setActiveCategory(null);
                                        navigate('/products');
                                    }}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ConfirmationPage;
