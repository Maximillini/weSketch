import { forwardRef } from 'react'

type ChatBoxProps = {
  chatType: 'game'|'general',
  chats: {userName: string, message: string}[],
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  focused: boolean,
}

export const ChatBox = forwardRef(({ chatType, chats=[], onClick, focused }: ChatBoxProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={`${chatType}-chat ${focused ? 'focused' : ''} ${chatType}`} onClick={(e) => onClick(e)} ref={ref}>
      <div className="chat-title">{chatType} Chat</div>
      <ul className="chat-log">
        {chats.map((chat, idx) => (
          <li className={`chat ${chat.userName === 'admin' ? 'admin' : ''}`} key={chat.userName+idx} >
            {chat.userName !== 'admin' && <span className="user">{chat.userName}: </span>}
            <span className="message">{chat.message}</span>
          </li>
        ))}
      </ul>
    </div>
  )
})
