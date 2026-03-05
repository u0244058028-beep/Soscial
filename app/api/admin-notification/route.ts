import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { newEmail, position, referredBy, totalCount, timestamp } = await req.json()
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 587,
      secure: false,
      auth: {
        user: 'post@mysocialbomb.com',
        pass: process.env.SMTP_PASSWORD,
      },
    })
    
    const date = new Date(timestamp).toLocaleString('no-NO', {
      timeZone: 'Europe/Oslo',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    
    await transporter.sendMail({
      from: '"My Social Bomb" <post@mysocialbomb.com>',
      to: 'allnewufos@gmail.com',
      subject: `🎉 New waitlist signup: ${newEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">🎉 New Waitlist Member!</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Someone just joined My Social Bomb!</p>
              
              <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${newEmail}</p>
                <p style="margin: 0 0 10px 0;"><strong>Position:</strong> #${position}</p>
                <p style="margin: 0 0 10px 0;"><strong>Referred by:</strong> ${referredBy}</p>
                <p style="margin: 0 0 10px 0;"><strong>Time:</strong> ${date}</p>
              </div>
              
              <div style="background: #eef2ff; border-radius: 12px; padding: 20px; text-align: center;">
                <p style="font-size: 20px; margin: 0 0 5px 0;"><strong>Total on waitlist:</strong></p>
                <p style="font-size: 36px; font-weight: 700; color: #4f46e5; margin: 0;">${totalCount}</p>
              </div>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
              
              <p style="text-align: center; color: #6b7280; font-size: 14px;">
                My Social Bomb · Built in Norway 🇳🇴<br>
                <a href="https://mysocialbomb.com" style="color: #4f46e5;">mysocialbomb.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin email error:', error)
    return NextResponse.json(
      { error: 'Failed to send admin email' },
      { status: 500 }
    )
  }
}