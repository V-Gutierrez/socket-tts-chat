import { createContext, useContext, useEffect, useState } from 'react';
import { TTS } from 'services/TTS';
import socketClient, { Socket } from "socket.io-client"

const SocketContext = createContext<SocketContextValue>({} as SocketContextValue)

export interface Message {
  message: string
  user: string
}

interface SocketContextValue {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  Socket: Socket
}

interface ProviderProps {
  children: React.ReactNode[] | React.ReactNode
}

const socket = socketClient()

export function SocketProvider({ children }: ProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])


  useEffect(() => {
    socket.once("connect", () => {
      TTS("Connected to server")
      /* Add entered chat message */
    })
  }, [])

  return (
    <SocketContext.Provider value={{ messages, setMessages, Socket: socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)