import { faker } from '@faker-js/faker';

type MockUser = {
  userName: string,
  score: number
}

export const generateUsers = (count: number) => {
  const users: MockUser[] = []

  for (let i = 0; i < count; i++) {
    const userName = faker.internet.userName()

    users.push({ userName, score: faker.number.int(10) })
  }

  return users
}
