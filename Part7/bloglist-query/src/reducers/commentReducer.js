import { createSlice } from '@reduxjs/toolkit'
import commentsServices from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setComments, appendComment } = commentSlice.actions

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await commentsServices.getAll(id)
    dispatch(setComments(comments))
  }
}

export const addComment = (content, id) => {
  return async (dispatch) => {
    const commObj = { comment: content }
    const addedComment = await commentsServices.addComment(commObj, id)
    dispatch(appendComment(addedComment))
  }
}

export default commentSlice.reducer
