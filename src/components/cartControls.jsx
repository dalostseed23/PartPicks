export const cartControls = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const item = state.find(i => i.id === action.payload.id);
            if (item) {
                return state.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }
        case 'REMOVE_ITEM': {
            return state.filter(i => i.id !== action.payload.id);
        }
        case 'UPDATE_QUANTITY': {
            return state.map(i => i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i)
                        .filter(i => i.quantity > 0);
        }
        case 'CLEAR_CART': {
            return [];
        }
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};
