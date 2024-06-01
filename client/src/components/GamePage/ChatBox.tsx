type ChatBoxProps = {
  chatType: 'game'|'general',
  chats: {userName: string, message: string}[]
}

export const ChatBox = ({ chatType, chats=[] }: ChatBoxProps) => {
  return (
    <div className={`${chatType}-chat`}>
      <div className="chat-title">{chatType} Chat</div>
      <ul className="chat-log">
        {chats.map((chat) => (
          <li className="chat"><span className="user">{chat.userName}:</span> <span className="message">{chat.message}</span></li>
        ))}
      </ul>
    </div>
  )
}
