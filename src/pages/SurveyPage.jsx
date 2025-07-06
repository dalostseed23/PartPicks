import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const SurveyPage = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center text-center"
                style={{ minHeight: '100vh' }}
            >
                <Card
                    bg="dark"
                    text="white"
                    className="p-5 mx-auto shadow"
                    style={{ maxWidth: '500px' }}
                >
                    <h1 className="display-5 text-info">Thank You!</h1>
                    <p className="lead">We appreciate your feedback. It helps us improve our service.</p>
                    <Button variant="info" onClick={() => navigate('/')}>
                        Back to Home
                    </Button>
                </Card>
            </Container>
        );
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center py-5"
            style={{ minHeight: '100vh' }}
        >
            <Row className="justify-content-center w-100">
                <Col lg={7}>
                    <Card bg="dark" text="white" className="p-4 shadow">
                        <Card.Body>
                            <Card.Title as="h1" className="text-center mb-4">
                                Post-Purchase Survey
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label>How would you rate your overall shopping experience?</Form.Label>
                                    <div className="d-flex justify-content-around p-2 bg-secondary rounded">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <Form.Check key={n} inline type="radio" name="experience" label={n} />
                                        ))}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Were you able to find what you were looking for easily?</Form.Label>
                                    <Form.Select>
                                        <option>Yes, very easily</option>
                                        <option>Yes, with some effort</option>
                                        <option>No, it was difficult</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Any additional comments or suggestions?</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Your feedback..." />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="info" type="submit" size="lg">
                                        Submit Survey
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SurveyPage;
