import {createSlice} from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  //console.log('state now: ', state)
  //console.log('action', action)
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const votedAnecdote = action.payload
      const {id} = votedAnecdote
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote)
  
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote)
    dispatch(addVote(votedAnecdote))
  }
}

export default anecdotesSlice.reducer