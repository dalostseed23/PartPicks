import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const CheckoutStep = ({ number, title, active }) => (
    <div className="d-flex align-items-center">
        <div className={`rounded-circle d-flex align-items-center justify-content-center ${active ? 'bg-info' : 'bg-secondary'}`} style={{ width: '30px', height: '30px' }}>
            {number}
        </div>
        <span className={`ms-2 ${active ? 'text-white' : 'text-muted'}`}>{title}</span>
    </div>
);

const CheckoutProcess = () => {
    const { dispatch, setOrderDetails } = useContext(AppContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleContinue = (e) => {
        e.preventDefault();
        const requiredFields = ['fullName', 'email', 'address', 'city', 'postalCode'];
        if (requiredFields.some(field => !formData[field])) {
            setError('Please fill out all personal information fields.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const requiredFields = ['cardName', 'cardNumber', 'expiry', 'cvv'];
        if (requiredFields.some(field => !formData[field])) {
            setError('Please fill out all payment fields.');
            return;
        }
        setError('');
        const orderId = `PP-${Date.now()}`;
        setOrderDetails({ id: orderId, ...formData });
        dispatch({ type: 'CLEAR_CART' });
        navigate('/confirmation');
    };

    return (
        <Container className="py-5 d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <h1 className="text-center display-5 fw-bold mb-5">Checkout</h1>
                    <div className="d-flex justify-content-center align-items-center mb-5">
                        <CheckoutStep number={1} title="Shipping" active={step >= 1} />
                        <div className={`flex-grow-1 mx-3 ${step > 1 ? 'bg-info' : 'bg-secondary'}`} style={{ height: '2px' }}></div>
                        <CheckoutStep number={2} title="Payment" active={step >= 2} />
                        <div className={`flex-grow-1 mx-3 ${step > 2 ? 'bg-info' : 'bg-secondary'}`} style={{ height: '2px' }}></div>
                        <CheckoutStep number={3} title="Confirmation" active={step >= 3} />
                    </div>
                    <Card bg="dark" text="white" className="p-4 shadow">
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {step === 1 && (
                                <Form onSubmit={handleContinue}>
                                    <h2 className="mb-4">Personal Information</h2>
                                    <Form.Group className="mb-3" controlId="fullName">
                                        <Form.Control type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Control type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Control type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="city">
                                                <Form.Control type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="postalCode">
                                                <Form.Control type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="secondary" onClick={() => navigate('/cart')}>
                                            Back to Cart
                                        </Button>
                                        <Button variant="info" type="submit" size="lg">
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </Form>
                            )}

                            {step === 2 && (
                                <Form onSubmit={handlePlaceOrder}>
                                    <h2 className="mb-4">Payment Details</h2>
                                    <Form.Group className="mb-3" controlId="cardName">
                                        <Form.Control type="text" name="cardName" placeholder="Name on Card" value={formData.cardName} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cardNumber">
                                        <Form.Control type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="expiry">
                                                <Form.Control type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="cvv">
                                                <Form.Control type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-between mt-4">
                                        <Button variant="secondary" onClick={() => { setStep(1); setError(''); }}>
                                            Back
                                        </Button>
                                        <Button variant="info" type="submit">
                                            Place Order
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutProcess;
