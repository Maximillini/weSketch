import { faker } from '@faker-js/faker';

type MockUser = {
  userName: string,
  score: number
}

type MockChat = {
  userName: string,
  message: string
}

export const generateUsers = (count: number) => {
  const users: MockUser[] = []

  for (let i = 0; i < count; i++) {
    const userName = faker.internet.userName()

    users.push({ userName, score: faker.number.int(10) })
  }

  users.sort((a, b) => b.score - a.score)
  console.log({ users })
  return users
}

export const generateChatLog = (playersList: MockUser[], chatsAmount: number, singleWord: boolean=false): MockChat[] => {
  const chats = []
  
  for (let i = 0; i < chatsAmount; i++) {
    let message = faker.lorem.lines({ min: 1, max: 3 })

    if (singleWord) message = faker.lorem.word()

    chats.push({ userName: playersList[Math.floor(Math.random() * playersList.length)].userName, message })
  }

  return chats
}
