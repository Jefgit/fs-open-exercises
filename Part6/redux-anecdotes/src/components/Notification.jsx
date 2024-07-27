import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({notification}) => {
    return notification.message
  })

  const show = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const style = notification !== ''? show : {display: 'none'}
  return <div style={style}>{notification}</div>
}

export default Notification
