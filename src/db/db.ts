import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prisma ?? prismaClientSingleton()
// single primary export of this file 
export default db

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db