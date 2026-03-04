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
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">🎉 You're on the list!</h1>
          <p>Hello!</p>
          <p>You're now on the waitlist for <strong>My Social Bomb</strong>.</p>
          <p style="font-size: 24px; background: #f3f4f6; padding: 10px; text-align: center;">
            Your position: <strong>#${position}</strong>
          </p>
          
          <h2 style="margin-top: 30px;">💣 Your personal referral link</h2>
          <p>Share this link with friends. When they join, they'll follow you at launch!</p>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <a href="${referralLink}" style="color: #4f46e5; word-break: break-all;">${referralLink}</a>
          </div>
          
          <p><strong>How it works:</strong></p>
          <ul>
            <li>Each friend who joins with your link = 1 follower at launch</li>
            <li>Each follower = $4/month for you, forever</li>
            <li>You move up the waitlist for every referral</li>
          </ul>
          
          <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0; font-weight: bold;">🚀 Launching April 1st, 2025</p>
            <p style="margin: 5px 0 0;">The more people you refer, the bigger your monthly income from day one!</p>
          </div>
          
          <hr style="margin: 30px 0;" />
          <p style="color: #6b7280;">– Team My Social Bomb 💣</p>
        </div>
      `,
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