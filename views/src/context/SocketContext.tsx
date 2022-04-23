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
  usersOnline: number
}

interface ProviderProps {
  children: React.ReactNode[] | React.ReactNode
}

const socket = socketClient()

export function SocketProvider({ children }: ProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [usersOnline, setUsersOnline] = useState<number>(0)


  useEffect(() => {
    socket.once("connect", () => {
      TTS("Connected to server")
    })
  }, [])

  socket.once("ONLINE_USERS", (usersAmount: number) => {
    usersAmount > 1 ? TTS(`${usersAmount} users online`) : TTS(`${usersAmount} user online`)
    setUsersOnline(usersAmount)
  })

  socket.once("BROADCAST", (receivedMessage) => {
    const cleanedMessages = new Set([...messages, receivedMessage])
    setMessages(Array.from(cleanedMessages))
  })

  return (
    <SocketContext.Provider value={{ messages, setMessages, Socket: socket, usersOnline }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)