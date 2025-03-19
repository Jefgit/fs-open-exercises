import { EntriesProps } from "../types"

export const DiaryEntries = (props:EntriesProps) => {
  return (
    <div>
        <h2>Diary Entries</h2>
        {
        props.entries.map(entry => 
          <div key={entry.id}>
            <h2>{entry.date}</h2>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </div>
        )
        
        }
    </div>
  )
}
