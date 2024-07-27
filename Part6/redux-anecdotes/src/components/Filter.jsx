import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()
    
    const handleChange = (event) => {
        const filter = event.target.value
        dispatch({type:'filter/setFilter', payload:filter})
    }

    const style = {
        marginBottom: 10
    }
  return (
    <div style={style}>
        <label htmlFor='filter'>filter<input id='filter' name='filter' onChange={handleChange}/></label>
    </div>
  )
}

export default Filter