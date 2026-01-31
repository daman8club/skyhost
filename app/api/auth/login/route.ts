import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    if (username === 'admin' && password === 'admin123') {
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      )
      
      const response = NextResponse.json({ success: true, message: 'Login successful' })
      
      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400
      })
      
      return response
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials. Use: admin / admin123' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    )
  }
}