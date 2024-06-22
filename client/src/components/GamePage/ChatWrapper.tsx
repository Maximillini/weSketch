import { useState, useRef } from 'react'
import { PlayerList } from './PlayerList'
import { ChatBox } from './ChatBox'
import { useSocketGameData } from '@/hooks/useSocketGameData'
import { useSmoothScrolling } from '@/hooks/useSmoothScrolling'
import { useGameStore } from '@/stores/gameStore'
import { ChatType } from '@/types/gameTypes'

export const ChatWrapper = () => {
  // Local State
  const currentArtist = useGameStore((state) => state.gameState.currentArtist)
  const [chatValue, setChatValue] = useState<string>('')
  const [currentChatFocus, setCurrentChatFocus] = useState<ChatType>('game')
  // Refs
  const gameChatRef = useRef<HTMLDivElement>(null)
  const generalChatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // Custom Hooks
  const {
    socket,
    game: { playerList, gameChatLog, generalChatLog },
  } = useSocketGameData()
  useSmoothScrolling(gameChatRef, gameChatLog)
  useSmoothScrolling(generalChatRef, generalChatLog)

  const handleChatSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    const chat = (e.target as HTMLInputElement).value

    setChatValue('')

    if (currentChatFocus === 'game') {
      return socket?.emit('gameChatMessage', chat)
    }

    return socket?.emit('generalChatMessage', chat)
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
        <PlayerList playerList={playerList} currentArtist={currentArtist} />
        <ChatBox
          chatType="game"
          chats={gameChatLog}
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
        chats={generalChatLog}
        onClick={handleChatBoxFocus}
        focused={currentChatFocus === 'general'}
        ref={generalChatRef}
      />
    </div>
  )
}
