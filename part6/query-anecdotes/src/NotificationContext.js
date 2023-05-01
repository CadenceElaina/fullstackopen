import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  //console.log(action, action.payload)
  switch(action.type){
    case 'CREATE':
      return state = `added ${action.payload}`
    case 'VOTE':
      return state = `voted on ${action.payload}`
    case 'HIDE':
      return state = ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
