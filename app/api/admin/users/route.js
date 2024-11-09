import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getAuthSession()

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const session = await getAuthSession()

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { userId, role } = await req.json()

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role }
    })

    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}