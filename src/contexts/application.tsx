import {createContext, useState, useContext} from 'react'
import {Player} from 'types'

interface AppContext {
  userId?: string;
  onJoin: (user: string) => void;
}

const ApplicationContext = createContext<AppContext>({onJoin: () => {}})

interface Props {
  children: JSX.Element,
}
function ApplicationManager ({children}: Props) {
  const hydratedUserId = sessionStorage.getItem('userId')
  const [userId, setUserId] = useState<AppContext["userId"]>(hydratedUserId || undefined)

  const onJoin = (user: string) => {
    sessionStorage.setItem('userId', user)
    setUserId(user)
  }

  return (
    <ApplicationContext.Provider value={{userId, onJoin}}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useJoin () {
  const {onJoin} = useContext(ApplicationContext)

  return onJoin
}

export function useLoggedInUser (): string {
  const {userId} = useContext(ApplicationContext)
  if (!userId) {
    throw new Error("no logged in user")
  }
  return userId
}
export function useCurrentUserId () {
  const {userId} = useContext(ApplicationContext)
  return userId
}


export default ApplicationManager
