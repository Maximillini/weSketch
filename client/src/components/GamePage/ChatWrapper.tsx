import { useState, useRef, useEffect } from "react"
import { PlayerList } from "./PlayerList"
import { ChatBox } from "./ChatBox"
import { generateUsers, generateChatLog } from '../../helpers/mockData'
import { usePlayerStore } from "../../stores/playerStore"

const PLAYER_LIST = generateUsers(5)

type Chat = {
  userName: string,
  message: string
}

type ChatType = 'game' | 'general'

export const ChatWrapper = () => {
  const playerHandle = usePlayerStore((state) => state.handle)
  // TODO - Remove generateChatLog
  const [gameChats, setGameChats] = useState<Chat[]>(generateChatLog(PLAYER_LIST, 34, true))
  const [generalChats, setGeneralChats] = useState<Chat[]>(generateChatLog(PLAYER_LIST, 13))
  const [chatValue, setChatValue] = useState<string>('')
  const [currentChatFocus, setCurrentChatFocus] = useState<ChatType>('game')
  const gameChatRef = useRef<HTMLDivElement>(null)
  const generalChatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef(null)

  useEffect(() => {
    console.log(gameChatRef.current?.querySelectorAll('.chat'))
    const gameChatList = gameChatRef.current?.querySelectorAll('.chat') ?? []
    const latestGameChat = gameChatList[gameChatList?.length - 1]
    gameChatRef.current?.scrollTo({ top: latestGameChat.offsetTop, behavior: 'smooth' });
    console.log({ latestGameChat })
  }, [gameChats])

  useEffect(() => {
    const generalChatList = generalChatRef.current?.querySelectorAll('.chat') ?? []
    const latestGeneralChat = generalChatList[generalChatList?.length - 1]
    generalChatRef.current?.scrollTo({ top: latestGeneralChat.offsetTop, behavior: 'smooth' });
  }, [generalChats])

  const handleChatSubmit = (e) => {
    if (e.key !== 'Enter') return

    const chat = { userName: playerHandle, message: e.target.value }

    setChatValue('')

    if (currentChatFocus === 'general') return setGeneralChats([...generalChats, chat])

    return setGameChats([...gameChats, chat])
  }

  const handleChatInputChange = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setChatValue(e.target.value)
  }

  const handleChatBoxFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    inputRef.current?.focus()
    if (e.currentTarget.classList.value.includes(currentChatFocus)) return

    if (e.currentTarget.classList.value.includes('game')) return setCurrentChatFocus('game')

    return setCurrentChatFocus('general')
  }

  return (
    <div className="chat-container">
      <div className="flex-container chat-row">
        <PlayerList playerList={[...PLAYER_LIST, { userName: playerHandle, score: 0 }]}/>
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
