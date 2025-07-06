import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import { PRODUCTS, CATEGORIES } from '../testdata/products';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';

const HomePage = () => {
    const { setActiveCategory } = useContext(AppContext);
    const navigate = useNavigate();

    const dealProducts = PRODUCTS.filter(p => p.deal);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (category) {
            navigate(`/products/${category}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <Container fluid="lg">
            <Row
                className="bg-dark text-white rounded-3 shadow my-5 align-items-center"
                style={{ minHeight: '400px' }}
            >
                <Col md={6} className="p-5">
                    <h1 className="display-4 fw-bold mb-4">
                        Build Your Dream PC with PartPicks
                    </h1>
                    <Button variant="info" size="lg" onClick={() => handleCategoryClick(null)}>
                        Shop All Parts
                    </Button>
                </Col>
                <Col md={6} className="p-0">
                    <Image
                        src="pexels-fox-58267-3829227.jpg"
                        fluid
                        roundedEnd
                        style={{ height: '100%', objectFit: 'cover', width: '100%' }}
                    />
                </Col>
            </Row>

            <div className="py-5">
                <h2 className="display-5 fw-bold text-center mb-5">Shop Hot Deals Now!</h2>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {dealProducts.map(product => (
                        <Col key={product.id}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="py-5">
                <h2 className="display-5 fw-bold text-center mb-5">Shop By Category</h2>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {CATEGORIES.map(category => (
                        <Col key={category}>
                            <Card
                                bg="dark"
                                text="white"
                                className="text-center p-4 h-100 shadow-sm"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <Card.Body>
                                    <Card.Title className="h4 text-info">{category}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default HomePage;
