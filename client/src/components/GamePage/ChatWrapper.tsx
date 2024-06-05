import { useState, useRef, useEffect } from 'react'
import { PlayerList } from './PlayerList'
import { ChatBox } from './ChatBox'
import { usePlayerStore } from '../../stores/playerStore'
import { useSocketStore } from '../../stores/socketStore'
import { Chat, Player } from '../../types/gameTypes'

export const ChatWrapper = () => {
  const socket = useSocketStore((state) => state.socket)
  const playerHandle = usePlayerStore((state) => state.handle)
  const [playerList, setPlayerList] = useState<Player[]>([])
  const [gameChats, setGameChats] = useState<Chat[]>([])
  const [generalChats, setGeneralChats] = useState<Chat[]>([])
  const [chatValue, setChatValue] = useState<string>('')
  const [currentChatFocus, setCurrentChatFocus] = useState<'game' | 'general'>(
    'game'
  )
  const gameChatRef = useRef<HTMLDivElement>(null)
  const generalChatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!socket) return

    socket.on('game message', (chat) => {
      setGameChats((prev) => [...prev, chat])
    })

    socket.on('general message', (chat) => {
      setGeneralChats((prev) => [...prev, chat])
    })

    socket.on('user-added', (players) => {
      console.log({ players })
      const formattedPlayers = players.map((player: Player) => {
        return { userName: player, score: 0 }
      })
      setGameChats((prev) => [
        ...prev,
        {
          userName: 'admin',
          message: `${players[players.length - 1]} has joined the game`,
        },
      ])
      setPlayerList(formattedPlayers)
    })

    socket.on('leave chat', (updatedPlayers, leavingPlayer) => {
      const formattedPlayers = updatedPlayers.map((player: Player) => {
        return { userName: player, score: 0 }
      })
      setGameChats((prev) => [
        ...prev,
        { userName: 'admin', message: `${leavingPlayer} has left the game` },
      ])
      setPlayerList(formattedPlayers)
    })
  }, [socket])

  useEffect(() => {
    const gameChatList = gameChatRef.current?.querySelectorAll('.chat') ?? []

    if (!gameChatList.length) return

    const latestGameChat = gameChatList[gameChatList?.length - 1] as HTMLElement
    gameChatRef.current?.scrollTo({
      top: latestGameChat.offsetTop,
      behavior: 'smooth',
    })
  }, [gameChats])

  useEffect(() => {
    const generalChatList =
      generalChatRef.current?.querySelectorAll('.chat') ?? []
    if (!generalChatList.length) return
    const latestGeneralChat = generalChatList[
      generalChatList?.length - 1
    ] as HTMLElement
    generalChatRef.current?.scrollTo({
      top: latestGeneralChat.offsetTop,
      behavior: 'smooth',
    })
  }, [generalChats])

  const handleChatSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    const chat = {
      userName: playerHandle,
      message: (e.target as HTMLInputElement).value,
    }

    setChatValue('')

    return socket?.emit('chat message', {
      ...chat,
      ...{ chatType: currentChatFocus },
    })
  }

  const handleChatInputChange = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setChatValue((e.target as HTMLInputElement).value)
  }

  const handleChatBoxFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!inputRef.current) return
    ;(inputRef.current as HTMLDivElement)?.focus()

    if (e.currentTarget.classList.value.includes(currentChatFocus)) return

    if (e.currentTarget.classList.value.includes('game')) {
      return setCurrentChatFocus('game')
    }

    return setCurrentChatFocus('general')
  }

  return (
    <div className="chat-container">
      <div className="flex-container chat-row">
        <PlayerList playerList={playerList} />
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleChatSubmit(e)
        }}
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
