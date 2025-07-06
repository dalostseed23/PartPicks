import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../testdata/products';
import Filters, { getDefaultFilters } from '../components/Filters';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProductListPage = () => {
    const { category } = useParams();  // read category from URL
    const [filters, setFilters] = useState(getDefaultFilters());

    useEffect(() => {
        setFilters(getDefaultFilters());
    }, [category]);

    const categoryProducts = useMemo(() => {
        return category
            ? PRODUCTS.filter(p => p.category === category)
            : PRODUCTS;
    }, [category]);

    const filteredProducts = useMemo(() => {
        return categoryProducts.filter(p => {
            const brandMatch = filters.brands.length === 0 || filters.brands.includes(p.brand);
            const availabilityMatch = filters.availability.length === 0 || filters.availability.includes(p.availability);
            const colorMatch = filters.colors.length === 0 || filters.colors.includes(p.color);
            const priceMatch = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
            const specMatch = Object.entries(filters.specs).every(([specName, selectedValues]) => {
                if (selectedValues.length === 0) return true;
                return selectedValues.includes(String(p.specs[specName]));
            });
            return brandMatch && priceMatch && availabilityMatch && colorMatch && specMatch;
        });
    }, [filters, categoryProducts]);

    return (
        <Container className="py-5">
            <Breadcrumbs />
            <h1 className="display-5 fw-bold mb-5">
                Shop {category || 'All Products'}
            </h1>
            <Row>
                <Col lg={3}>
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <Filters
                            filters={filters}
                            setFilters={setFilters}
                            activeCategory={category}
                            categoryProducts={categoryProducts}
                        />
                    </div>
                </Col>
                <Col lg={9}>
                    <Row xs={1} md={2} xl={3} className=" g-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <Col className="mb-4" key={product.id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <Card bg="dark" text="white" className="p-5 text-center">
                                    <Card.Body>
                                        <Card.Title as="h2">No Products Found</Card.Title>
                                        <Card.Text className="text-muted">
                                            Try adjusting your filters or select a different category.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListPage;
