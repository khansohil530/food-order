import React from "react";

const CartContext = React.createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

function cartReducer(state, action) {
    const updatedItems = [...state.items];
    if (action.type === "ADD_ITEM") {
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        if (existingCardItemIndex > -1) {
            const existingItem = state.items[existingCardItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCardItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
    }
    if (action.type == "REMOVE_ITEM") {
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCardItemIndex];
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCardItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCardItemIndex] = updatedItem;
        }
    }

    return { ...state, items: updatedItems };
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = React.useReducer(cartReducer, {
        items: [],
    });
    function addItem(item) {
        dispatchCartAction({ type: "ADD_ITEM", item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: "REMOVE_ITEM", id });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
