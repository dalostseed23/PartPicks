import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Rating = ({ rating }) => (
    <div className="flex items-center text-warning">
        {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={i < rating ? faStarSolid : faStarRegular} />
        ))}
    </div>
);

export default Rating;