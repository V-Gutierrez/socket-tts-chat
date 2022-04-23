import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext<UserContextValue>({} as UserContextValue)

interface UserContextValue {
  username: string | null
  setUsername: React.Dispatch<React.SetStateAction<string | null>>
  storeUserName: () => void
}

interface ProviderProps {
  children: React.ReactNode[] | React.ReactNode
}

export function UserProvider({ children }: ProviderProps) {
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))

  const storeUserName = () => {
    username && localStorage.setItem('username', username)
  }

  return (
    <UserContext.Provider value={{ username, setUsername, storeUserName }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)