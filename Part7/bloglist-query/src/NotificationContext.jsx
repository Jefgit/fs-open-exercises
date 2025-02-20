import { useReducer, useContext, createContext } from "react";

const initialState = {
    canShow:false,
    isError:false,
    message: '',
}

const SHOW = 'SHOW'
const HIDE = 'HIDE'

const notificationReducer = (state, action) => {
    switch (action.type){
        case SHOW:
            return {
                ...state,
                canShow: true,
                isError: action.payload.isError,
                message: action.payload.message,
            }
        case HIDE:
            return {
                ...state,
                canShow: false,
                isError: false,
                message: '',
            }
        default: 
            return state
    }
}

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({children}) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    const showNotification = (notification) => {
        dispatch({type: SHOW, payload: notification})
        setTimeout(() => {
            dispatch({type: HIDE})
        },5000)
    }


    return(
        <NotificationContext.Provider value={{state, showNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}