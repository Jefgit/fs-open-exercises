import React from 'react'

export const PersonForm = ({handler, name, setName, number, setNumber}) => {
  return (
    <form onSubmit={handler}>
        <div>
          name: <input value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          number: <input value={number} onChange={(e) => setNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}
