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

export const generateChatLog = (playersList: MockUser[], chatsAmount: number): MockChat[] => {
  const chats = []
  
  for (let i = 0; i < chatsAmount; i++) {
    chats.push({ userName: playersList[Math.floor(Math.random() * playersList.length)].userName, message: faker.lorem.lines({ min: 1, max: 3 }) })
  }

  return chats
}
