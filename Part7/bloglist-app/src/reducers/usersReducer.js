import { createSlice } from '@reduxjs/toolkit'
import usersServices from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getUsers(state, action) {
      return action.payload
    },
  },
})

export const { getUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersServices.getAllUsers()
    dispatch(getUsers(users))
  }
}

export default usersSlice.reducer
