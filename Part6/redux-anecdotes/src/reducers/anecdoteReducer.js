import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    changeVotes(state, action) {
      return state.map((a) =>
        a.id !== action.payload.id ? a : action.payload.votedAnecdote
      )
    },
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { changeVotes, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const annecdoteToAdd = await anecdoteService.createNew(content)
    dispatch(newAnecdote(annecdoteToAdd))
  }
}

export const castVote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    console.log(anecdotes)
    const anecdoteToVote = anecdotes.find((a) => a.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }

    anecdoteService.vote(id, votedAnecdote).then((anecdote) => {
      dispatch(changeVotes({ id, votedAnecdote: anecdote }))
    })
  }
}
export default anecdoteSlice.reducer
