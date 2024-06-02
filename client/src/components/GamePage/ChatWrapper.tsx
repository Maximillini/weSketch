import { useState, useRef, useEffect } from "react"
import { PlayerList } from "./PlayerList"
import { ChatBox } from "./ChatBox"
import { usePlayerStore } from "../../stores/playerStore"
import { io } from 'socket.io-client'
import { useGameStore } from "../../stores/gameStore"

const socket = io('http://localhost:4000')

type ChatType = 'game' | 'general'

export const ChatWrapper = () => {
  const playerHandle = usePlayerStore((state) => state.handle)
  const playerList = useGameStore((state) => state.playerList)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const [gameChats, setGameChats] = useState([])
  const [generalChats, setGeneralChats] = useState([])
  const [chatValue, setChatValue] = useState<string>('')
  const [currentChatFocus, setCurrentChatFocus] = useState<ChatType>('game')
  const gameChatRef = useRef<HTMLDivElement>(null)
  const generalChatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef(null)

  useEffect(() => {
    socket.on('game message', (chat) => {
      console.log({ chat })
      setGameChats((prev) => [...prev, chat])
    })

    socket.on('general message', (chat) => {
      setGeneralChats((prev) => [...prev, chat])
    })

    socket.on('user-added', (players) => {
      console.log({ players })
      addPlayer({ userName: players[players.length - 1], score: 0 })
    })
  }, [addPlayer])

  useEffect(() => {
    console.log({ gameChats })
    const gameChatList = gameChatRef.current?.querySelectorAll('.chat') ?? []
    if (!gameChatList.length) return
    const latestGameChat = gameChatList[gameChatList?.length - 1] as HTMLElement
    gameChatRef.current?.scrollTo({ top: latestGameChat.offsetTop, behavior: 'smooth' });
  }, [gameChats])

  useEffect(() => {
    const generalChatList = generalChatRef.current?.querySelectorAll('.chat') ?? []
    if (!generalChatList.length) return
    const latestGeneralChat = generalChatList[generalChatList?.length - 1] as HTMLElement
    generalChatRef.current?.scrollTo({ top: latestGeneralChat.offsetTop, behavior: 'smooth' });
  }, [generalChats])

  const handleChatSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    const chat = { userName: playerHandle, message: (e.target as HTMLInputElement).value }

    setChatValue('')
    
    return socket.emit('chat message', {...chat, ...{ chatType: currentChatFocus }})
  }

  const handleChatInputChange = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setChatValue((e.target as HTMLInputElement).value)
  }

  const handleChatBoxFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!inputRef.current) return
    (inputRef.current as HTMLDivElement)?.focus()
    if (e.currentTarget.classList.value.includes(currentChatFocus)) return

    if (e.currentTarget.classList.value.includes('game')) return setCurrentChatFocus('game')

    return setCurrentChatFocus('general')
  }

  return (
    <div className="chat-container">
      <div className="flex-container chat-row">
        <PlayerList playerList={playerList}/>
        <ChatBox 
          chatType="game"
          chats={gameChats}
          onClick={handleChatBoxFocus}
          focused={currentChatFocus === 'game'}
          ref={gameChatRef}
        />
      </div>
      <input 
        className="chat-input"
        type="text"
        ref={inputRef}
        placeholder="Chat here"
        value={chatValue}
        onChange={(e) => handleChatInputChange(e)}
        onKeyDown={(e) => {if (e.key === 'Enter') handleChatSubmit(e)}}
      />
      <ChatBox 
        chatType="general"
        chats={generalChats}
        onClick={handleChatBoxFocus}
        focused={currentChatFocus === 'general'}
        ref={generalChatRef}
      />
    </div>
  )
}