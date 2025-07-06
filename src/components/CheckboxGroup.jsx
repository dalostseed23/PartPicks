import { Form } from 'react-bootstrap';

const CheckboxGroup = ({ title, options, selected, onChange }) => (
    <div className="mb-4">
        <h5 className="fw-semibold mb-2">{title}</h5>
        {options.map(option => (
            <Form.Check 
                key={option}
                type="checkbox"
                id={`${title}-${option}`}
                label={option}
                name={option}
                onChange={onChange}
                checked={selected.includes(String(option))}
            />
        ))}
    </div>
);

export default CheckboxGroup;