import React, { createContext, useReducer, useContext} from 'react'

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
};

// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                user:null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}


// Create User Context
const UserContext = createContext()

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext)

// Context Provider Component
export  const UserProvider =({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    const login = (user) => {
        dispatch({type: LOGIN, payload: user})
    }

    const logout = () => {
        dispatch({type: LOGOUT})
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    return (
        <UserContext.Provider value= {{ state, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

