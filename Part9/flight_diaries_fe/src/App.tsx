import { NewEntryForm } from "./components/NewEntryForm"
import { DiaryEntries } from "./components/DiaryEntries"
import { useEffect, useState } from "react"
import { DiaryEntry, newDiaryEntry } from "./types"
import { getAllEntries } from "./services/diaryEntryServices"

export const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDiaryEntry, setNewDiaryEntry] = useState<newDiaryEntry>({
    date:'',
    weather:'',
    visibility:'',
    comment:''
  });

  useEffect(()=>{
    getAllEntries()
    .then(data => {
      setDiaryEntries(data)
    })    
  },[])

  return (
    <div>
      <NewEntryForm 
        newEntries = {newDiaryEntry} 
        setNewEntries={setNewDiaryEntry} 
        setEntries={setDiaryEntries}
        entries={diaryEntries}
      />
      <DiaryEntries entries = {diaryEntries}/>
    </div>
  )
}
