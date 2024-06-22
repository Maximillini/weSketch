import { faker } from '@faker-js/faker'

export const getRandomName = () => {
  const name = (
    faker.word.adjective() +
    '_' +
    faker.animal.type() +
    '_' +
    faker.number.int(400)
  ).split('')

  name[0] = name[0].toUpperCase()

  return name.join('')
}
