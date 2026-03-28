import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  const results = []

  // Test med port 587 (STARTTLS)
  try {
    const transporter587 = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 587,
      secure: false, // false for STARTTLS
      auth: {
        user: 'post@mysocialbomb.com',
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter587.verify()
    results.push({ port: 587, status: '✅ Success' })
  } catch (error) {
    results.push({ port: 587, status: '❌ Failed', error: String(error) })
  }

  // Test med port 465 (SSL)
  try {
    const transporter465 = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 465,
      secure: true, // true for SSL
      auth: {
        user: 'post@mysocialbomb.com',
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter465.verify()
    results.push({ port: 465, status: '✅ Success' })
  } catch (error) {
    results.push({ port: 465, status: '❌ Failed', error: String(error) })
  }

  return NextResponse.json({ results })
}