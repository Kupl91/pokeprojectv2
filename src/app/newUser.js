import { PrismaClient } from '@prisma/client'
import 'dotenv/config';

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      id: 7,
      name: 'Паша',
    },
  })

  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })