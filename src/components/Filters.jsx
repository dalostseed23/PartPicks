import CheckboxGroup from './CheckboxGroup';
import { Form, Button } from 'react-bootstrap';

export const getDefaultFilters = () => ({
    brands: [], colors: [], availability: [], priceRange: [0, 1500], specs: {}
});

const Filters = ({ filters, setFilters, activeCategory, categoryProducts }) => {
    const handleCheckboxChange = (filterType, name, checked) => {
        setFilters(prev => ({ ...prev, [filterType]: checked ? [...prev[filterType], name] : prev[filterType].filter(item => item !== name) }));
    };
    
    const handleSpecChange = (specName, value, checked) => {
        setFilters(prev => {
            const currentSpecFilter = prev.specs[specName] || [];
            const newSpecFilter = checked ? [...currentSpecFilter, String(value)] : currentSpecFilter.filter(item => item !== String(value));
            const newSpecs = { ...prev.specs, [specName]: newSpecFilter };
            if (newSpecFilter.length === 0) delete newSpecs[specName];
            return { ...prev, specs: newSpecs };
        });
    };

    const handlePriceChange = (e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }));

    const getOptionsFor = (key) => [...new Set(categoryProducts.map(p => p[key]).filter(Boolean))];
    const getSpecOptionsFor = (specName) => [...new Set(categoryProducts.map(p => p.specs[specName]).filter(Boolean))];

    const renderSpecificFilters = () => {
        if (!activeCategory) return null;
        switch (activeCategory) {
        case 'CPU': return <>
            <CheckboxGroup
                title="Series"
                options={getSpecOptionsFor('series')}
                selected={filters.specs.series || []}
                onChange={(e) => handleSpecChange('series', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Cores"
                options={getSpecOptionsFor('cores').sort((a,b) => a - b)}
                selected={filters.specs.cores || []}
                onChange={(e) => handleSpecChange('cores', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Socket"
                options={getSpecOptionsFor('socket')}
                selected={filters.specs.socket || []}
                onChange={(e) => handleSpecChange('socket', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Integrated Graphics"
                options={getSpecOptionsFor('graphics')}
                selected={filters.specs.graphics || []}
                onChange={(e) => handleSpecChange('graphics', e.target.name, e.target.checked)}
            />
        </>;
        case 'GPU': return <>
            <CheckboxGroup
                title="Memory Size"
                options={getSpecOptionsFor('memory').sort()}
                selected={filters.specs.memory || []}
                onChange={(e) => handleSpecChange('memory', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Memory Type"
                options={getSpecOptionsFor('type')}
                selected={filters.specs.type || []}
                onChange={(e) => handleSpecChange('type', e.target.name, e.target.checked)}
            />
        </>;
        case 'Motherboard': return <>
            <CheckboxGroup
                title="Chipset"
                options={getSpecOptionsFor('chipset')}
                selected={filters.specs.chipset || []}
                onChange={(e) => handleSpecChange('chipset', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Form Factor"
                options={getSpecOptionsFor('formFactor')}
                selected={filters.specs.formFactor || []}
                onChange={(e) => handleSpecChange('formFactor', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Socket"
                options={getSpecOptionsFor('socket')}
                selected={filters.specs.socket || []}
                onChange={(e) => handleSpecChange('socket', e.target.name, e.target.checked)}
            />
        </>;
        case 'RAM': return <>
            <CheckboxGroup
                title="Size"
                options={getSpecOptionsFor('size').sort((a,b) => parseInt(a) - parseInt(b))}
                selected={filters.specs.size || []}
                onChange={(e) => handleSpecChange('size', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Speed"
                options={getSpecOptionsFor('speed').sort((a,b) => parseInt(a) - parseInt(b))}
                selected={filters.specs.speed || []}
                onChange={(e) => handleSpecChange('speed', e.target.name, e.target.checked)}
            />
        </>;
        case 'Storage': return <>
            <CheckboxGroup
                title="Capacity"
                options={getSpecOptionsFor('capacity').sort((a,b) => {
                    // Sort capacities like "1TB", "512GB"
                    const parseSize = (str) => {
                        if (str.toUpperCase().endsWith('TB')) return parseFloat(str) * 1024;
                        if (str.toUpperCase().endsWith('GB')) return parseFloat(str);
                        return 0;
                    };
                    return parseSize(a) - parseSize(b);
                })}
                selected={filters.specs.capacity || []}
                onChange={(e) => handleSpecChange('capacity', e.target.name, e.target.checked)}
            />
            <CheckboxGroup
                title="Type"
                options={getSpecOptionsFor('type')}
                selected={filters.specs.type || []}
                onChange={(e) => handleSpecChange('type', e.target.name, e.target.checked)}
            />
        </>;
            default: return null;
        }
    };

    return (
        <aside className="p-4 bg-dark rounded-3 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">Filters</h4>
                <Button variant="link" size="sm" className="text-info" onClick={() => setFilters(getDefaultFilters())}>Reset</Button>
            </div>
            <CheckboxGroup title="Brand" options={getOptionsFor('brand')} selected={filters.brands} onChange={(e) => handleCheckboxChange('brands', e.target.name, e.target.checked)} />
            <CheckboxGroup title="Availability" options={getOptionsFor('availability')} selected={filters.availability} onChange={(e) => handleCheckboxChange('availability', e.target.name, e.target.checked)} />
            <CheckboxGroup title="Color" options={getOptionsFor('color')} selected={filters.colors} onChange={(e) => handleCheckboxChange('colors', e.target.name, e.target.checked)} />
            <div className="mb-4">
                <Form.Label as="h5" className="fw-semibold">Price Range</Form.Label>
                <Form.Range min="0" max="1500" step="50" value={filters.priceRange[1]} onChange={handlePriceChange} />
                <div className="text-center text-muted mt-1">Up to ${filters.priceRange[1]}</div>
            </div>
            {renderSpecificFilters()}
        </aside>
    );
};

export default Filters;