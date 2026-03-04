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
      subject: '🎉 You\'re on the waitlist! Here\'s your personal referral link',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; font-size: 32px; margin: 0; font-weight: 700;">💣 My Social Bomb</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin-top: 10px;">You're on the waitlist!</p>
            </div>
            
            <div style="padding: 40px 30px;">
              <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hello!</p>
              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                You're now on the waitlist for <strong style="color: #4f46e5;">My Social Bomb</strong>.
              </p>
              
              <!-- Position -->
              <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px;">
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 5px;">Your waitlist position</p>
                <p style="font-size: 48px; font-weight: 700; color: #4f46e5; margin: 0;">#${position}</p>
              </div>
              
              <!-- Referral link -->
              <div style="background: #eef2ff; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #c7d2fe;">
                <h2 style="font-size: 20px; color: #1e1b4b; margin-top: 0; margin-bottom: 15px;">🔗 Your personal referral link</h2>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 15px;">
                  Share this link with friends. When they join, they'll follow you at launch!
                </p>
                <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #c7d2fe; margin-bottom: 15px; word-break: break-all;">
                  <a href="${referralLink}" style="color: #4f46e5; font-weight: 500;">${referralLink}</a>
                </div>
              </div>
              
              <!-- Dashboard link -->
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="https://mysocialbomb.com/login/waitlist" 
                   style="background: #4f46e5; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                  Track your referrals →
                </a>
              </div>
              
              <p style="font-size: 13px; color: #6b7280; text-align: center;">
                You'll get an email every time someone joins with your link!
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}