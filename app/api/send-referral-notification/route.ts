import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { referrerEmail, referrerName, newReferralEmail, totalReferrals } = await req.json()
    
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
      to: referrerEmail,
      subject: '🎉 Someone joined using your link!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; font-size: 32px; margin: 0;">🎉 New Referral!</h1>
            </div>
            
            <div style="padding: 40px 30px;">
              <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Great news!</p>
              
              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                Someone just joined My Social Bomb using <strong>your personal link</strong>.
              </p>
              
              <div style="background: #f3f4f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">New waitlist member:</p>
                <p style="font-size: 20px; font-weight: 600; color: #111827; margin: 0;">${newReferralEmail}</p>
              </div>
              
              <div style="background: #eef2ff; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <p style="font-size: 16px; color: #1e1b4b; margin: 0;">
                  You now have <strong style="font-size: 24px;">${totalReferrals}</strong> 
                  ${totalReferrals === 1 ? 'person' : 'people'} in your network!
                </p>
              </div>
              
              <div style="text-align: center;">
                <a href="https://mysocialbomb.com/login/waitlist" 
                   style="background: #4f46e5; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                  See your dashboard →
                </a>
              </div>
              
              <p style="font-size: 14px; color: #4b5563; margin-top: 30px;">
                Each person = $4/month from day one. Keep sharing your link!
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