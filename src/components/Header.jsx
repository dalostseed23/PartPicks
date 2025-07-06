import { useContext } from 'react';
import { AppContext } from './AppContext';
import { CATEGORIES } from '../testdata/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Container, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const { cart, setActiveCategory } = useContext(AppContext);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category) {
      navigate(`/products/${category}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-lg">
      <Container>
        <Navbar.Brand
          as="button"
          onClick={() => {
            setActiveCategory(null);
            navigate('/');
          }}
          className="fs-4 fw-bold btn btn-link p-0 text-white"
          style={{ textDecoration: 'none' }}
        >
          PartPicks
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <Nav>
              <Nav.Link
                as="button"
                onClick={() => {
                  setActiveCategory(null);
                  navigate('/');
                }}
                className="btn btn-link text-white p-0"
              >
                Home
              </Nav.Link>

              <NavDropdown title="Products" menuVariant="dark">
                <NavDropdown.Item onClick={() => handleCategoryClick(null)}>
                  All Products
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {CATEGORIES.map((cat) => (
                  <NavDropdown.Item key={cat} onClick={() => handleCategoryClick(cat)}>
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Button variant="outline-info" onClick={() => navigate('/cart')}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItemCount > 0 && (
                <Badge
                  pill
                  bg="info"
                  className="ms-2"
                  style={{ color: '#000', fontWeight: 'bold' }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
