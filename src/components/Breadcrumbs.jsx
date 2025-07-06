import { Link, useParams } from 'react-router-dom';

const Breadcrumbs = () => {
    const { category } = useParams(); 

    return (
        <nav aria-label="breadcrumb" 
            className="py-3 rounded-3 shadow mb-4"
            style={{ backgroundColor: '#212529' }}
        >
            <ol className="breadcrumb mb-0 container" style={{ backgroundColor: '#212529' }}>
                <li className="breadcrumb-item">
                    <Link to="/" className="text-info">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/products" className="text-info">Products</Link>
                </li>
                {category && (
                    <li className="breadcrumb-item active text-white" aria-current="page">
                        {category}
                    </li>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
