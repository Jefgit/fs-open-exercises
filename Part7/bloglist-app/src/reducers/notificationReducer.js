import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { showNotif: false, message: '' },
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        showNotif: true,
        isError: action.payload.isError,
        message: action.payload.message,
      }
    },
    clearMessage(state) {
      return {
        ...state,
        showNotif: false,
        isError: false,
        message: '',
      }
    },
  },
})
export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = ({ message, isError }, delay) => {
  return async (dispatch) => {
    dispatch(setMessage({ message, isError }))
    setTimeout(() => {
      dispatch(clearMessage())
    }, delay * 1000)
  }
}
export default notificationSlice.reducer
