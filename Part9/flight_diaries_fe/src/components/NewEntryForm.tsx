import axios  from "axios"
import { createDiaryEntry } from "../services/diaryEntryServices"
import { ErrorMessage, NewEntryProps } from "../types"
import { useState } from "react"

export const NewEntryForm = (props: NewEntryProps) => {

    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const diaryEntryCreation = (event: React.SyntheticEvent) => {
      event.preventDefault()

        createDiaryEntry(props.newEntries)
        .then(data => {
          props.setEntries(props.entries.concat(data))
          console.log(data)
      }).catch(error => {
        if(axios.isAxiosError(error)){
          const messages = error.response?.data.error.map((message: ErrorMessage) => {
            return message.received ? `Error: ${message.message} "${message.received}"` : `Error: ${message.message}`
          });
          setErrorMessages(messages)
          setTimeout(()=> {
            setErrorMessages([])
          }, 5000)
          
          console.error(error.response)
          console.error(errorMessages)
        } else {
          console.error(error);
        }
      })
    }

  return (
    <div>
        <h2>Add new entry</h2>
        {
          errorMessages && 
          errorMessages.map((message,i) => <p key={i} style={{color:'red'}}>{message}</p>)
        }
        <span></span>
        <form onSubmit={diaryEntryCreation}>
          <div>
            <label>date</label>
            <input 
              id="date"
              type="date" 
              onChange={(e) => props.setNewEntries({...props.newEntries, date: e.target.value })} 
              value={props.newEntries.date}
            /> 
          </div>
          <fieldset>
            <legend>Visibility</legend>
            <input 
              id="great"
              name="visibility"
              type="radio" 
              onChange={() => props.setNewEntries({...props.newEntries, visibility: "great" })} 
            />
            <label htmlFor="great">great</label>
            <input 
              id="good"
              name="visibility"
              type="radio" 
              onChange={() => props.setNewEntries({...props.newEntries, visibility: "good" })} 
            />
            <label htmlFor="good">good</label>
            <input 
              id="ok"
              name="visibility"
              type="radio" 
              onChange={() => props.setNewEntries({...props.newEntries, visibility: "ok" })} 
            />
            <label htmlFor="ok">ok</label>
            <input 
              id="poor"
              name="visibility"
              type="radio" 
              onChange={() => props.setNewEntries({...props.newEntries, visibility: "poor" })} 
            />
            <label htmlFor="poor">poor</label>
          </fieldset>
          <fieldset>
            <legend>weather</legend>
            <input 
              id="sunny"
              type="radio"
              name="weather" 
              onChange={() => props.setNewEntries({...props.newEntries, weather: "sunny" })} 
            />
            <label htmlFor="sunny">sunny</label>
            <input 
              id="rainy"
              type="radio"
              name="weather" 
              onChange={() => props.setNewEntries({...props.newEntries, weather: "rainy" })} 
            />
            <label htmlFor="rainy">rainy</label>
            <input 
              id="cloudy"
              type="radio"
              name="weather" 
              onChange={() => props.setNewEntries({...props.newEntries, weather: "cloudy" })} 
            />
            <label htmlFor="cloudy">cloudy</label>
            <input 
              id="stormy"
              type="radio"
              name="weather" 
              onChange={() => props.setNewEntries({...props.newEntries, weather: "stormy" })} 
            />
            <label htmlFor="stormy">stormy</label>
            <input 
              id="windy"
              type="radio"
              name="weather" 
              onChange={() => props.setNewEntries({...props.newEntries, weather: "windy" })} 
            />
            <label htmlFor="windy">windy</label>
          </fieldset>
          <div>
          <label htmlFor="comment">comment</label>
          <textarea 
          id="comment"
            onChange={(e) => props.setNewEntries({...props.newEntries, comment: e.target.value })} 
            value={props.newEntries.comment}
          /> 
          </div>
          <button type="submit">add</button>
        </form>
    </div>
  )
}
