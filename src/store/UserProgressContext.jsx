import React from "react";

const UserProgressContext = React.createContext({
    progress: "", //cart, checkout,
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

function userProgressReducer(state, action) {
    if (action.type == "CART") {
        return { ...state, progress: action.value };
    }
    if (action.type == "CHECKOUT") {
        return { ...state, progress: action.value };
    }
    return state;
}

export function UserProgressContextProvider({ children }) {
    const [userProgress, dispatchUserProgressAction] = React.useReducer(
        userProgressReducer,
        {
            progress: "",
        }
    );

    function showCart() {
        dispatchUserProgressAction({
            type: "CART",
            value: "cart",
        });
    }

    function hideCart() {
        dispatchUserProgressAction({ type: "CART", value: "" });
    }

    function showCheckout() {
        dispatchUserProgressAction({
            type: "CHECKOUT",
            value: "checkout",
        });
    }

    function hideCheckout() {
        dispatchUserProgressAction({
            type: "CHECKOUT",
            value: "",
        });
    }

    const userProgressContext = {
        progress: userProgress.progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    };

    return (
        <UserProgressContext.Provider value={userProgressContext}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;
