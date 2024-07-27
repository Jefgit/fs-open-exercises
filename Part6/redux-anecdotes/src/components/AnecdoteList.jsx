import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, voteHandler}) => {
    return(
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={voteHandler}>vote</button>
          </div>
        </div>
    )
}
Anecdote.displayName = 'Anecdote'

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  voteHandler: PropTypes.func.isRequired
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => {
      const filteredAnecdotes = anecdotes.filter(
        anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      return filteredAnecdotes
    })

    
    const vote = (id, content) => {
        dispatch(castVote(id))
        dispatch(setNotification(`you voted '${content}'`,10))
    }
  return (
    <div>
      {[...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote 
            key = {anecdote.id}
            anecdote = {anecdote}
            voteHandler = {() => vote(anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default AnecdoteList