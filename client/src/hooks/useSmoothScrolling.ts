import { useEffect } from 'react'

export const useSmoothScrolling = (
  ref: React.RefObject<HTMLDivElement>,
  deps: any
) => {
  useEffect(() => {
    const gameChatList = ref.current?.querySelectorAll('.chat') ?? []

    if (!gameChatList.length) return

    const latestGameChat = gameChatList[gameChatList?.length - 1] as HTMLElement
    ref.current?.scrollTo({
      top: latestGameChat.offsetTop,
      behavior: 'smooth',
    })
  }, [deps])

  return
}
