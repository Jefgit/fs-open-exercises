import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { showNotif: false, message: '' },
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        showNotif: true,
        message: action.payload,
      }
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (text, delay) => {
  return async (dispatch) => {
    dispatch(setMessage(text))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, delay * 1000)
  }
}
export default notificationSlice.reducer
