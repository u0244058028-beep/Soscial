import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { email, position, referralLink } = await req.json()
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 587,
      secure: false,
      auth: {
        user: 'post@mysocialbomb.com',
        pass: process.env.SMTP_PASSWORD,
      },
    })
    
    await transporter.sendMail({
      from: '"My Social Bomb" <post@mysocialbomb.com>',
      to: email,
      subject: '🎉 You\'re on the waitlist! Here\'s your referral link',
      html: `...` // HTML-innholdet fra tidligere
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}