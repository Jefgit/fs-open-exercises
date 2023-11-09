import React from 'react'

export const PersonForm = ({handler, setContact, contact}) => {
  return (
    <form onSubmit={handler}>
        <div>
          name: <input value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})}/>
        </div>
        <div>
          number: <input value={contact.number} onChange={(e) => setContact({...contact, number: e.target.value})}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}
