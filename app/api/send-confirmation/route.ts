// app/api/send-confirmation/route.ts
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
          <title>Welcome to My Social Bomb</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; font-size: 32px; margin: 0; font-weight: 700;">💣 My Social Bomb</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin-top: 10px;">You're on the waitlist!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Welcome message -->
              <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hello!</p>
              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                You're now on the waitlist for <strong style="color: #4f46e5;">My Social Bomb</strong> – the first social platform where your followers actually pay you.
              </p>
              
              <!-- Position badge -->
              <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px;">
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 5px;">Your waitlist position</p>
                <p style="font-size: 48px; font-weight: 700; color: #4f46e5; margin: 0;">#${position}</p>
              </div>
              
              <!-- REFERRAL LINK - DET VIKTIGSTE! -->
              <div style="background: #eef2ff; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #c7d2fe;">
                <h2 style="font-size: 20px; color: #1e1b4b; margin-top: 0; margin-bottom: 15px;">🔗 Your personal referral link</h2>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 15px;">
                  Share this link with friends. When they join, they'll follow you at launch – and you'll earn $4/month from each of them!
                </p>
                <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #c7d2fe; margin-bottom: 15px; word-break: break-all;">
                  <a href="${referralLink}" style="color: #4f46e5; font-weight: 500; text-decoration: none;">${referralLink}</a>
                </div>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">
                  ⚡️ Each referral moves you up the waitlist and adds $4 to your monthly income.
                </p>
              </div>
              
              <!-- DASHBOARD INFO -->
              <div style="background: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="font-size: 18px; color: #111827; margin-top: 0; margin-bottom: 15px;">📊 Track your referrals</h2>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 20px;">
                  Want to see how many people have joined with your link and your estimated earnings?
                </p>
                <div style="text-align: center;">
                  <a href="https://mysocialbomb.com/login" style="background: #4f46e5; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                    Log in to your dashboard →
                  </a>
                </div>
                <p style="font-size: 13px; color: #9ca3af; margin-top: 15px; margin-bottom: 0; text-align: center;">
                  Use the same email you signed up with: <strong>${email}</strong>
                </p>
              </div>
              
              <!-- How it works -->
              <div style="margin-bottom: 30px;">
                <h2 style="font-size: 18px; color: #111827; margin-bottom: 20px;">💡 How it works</h2>
                
                <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                  <div style="width: 30px; height: 30px; background: #eef2ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #4f46e5;">1</div>
                  <div>
                    <h3 style="font-size: 16px; margin: 0 0 5px 0;">Share your link</h3>
                    <p style="font-size: 14px; color: #6b7280; margin: 0;">Send it to friends, post on social media, add to your bio.</p>
                  </div>
                </div>
                
                <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                  <div style="width: 30px; height: 30px; background: #eef2ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #4f46e5;">2</div>
                  <div>
                    <h3 style="font-size: 16px; margin: 0 0 5px 0;">Friends join</h3>
                    <p style="font-size: 14px; color: #6b7280; margin: 0;">When they use your link, they'll automatically follow you at launch.</p>
                  </div>
                </div>
                
                <div style="display: flex; gap: 15px;">
                  <div style="width: 30px; height: 30px; background: #eef2ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #4f46e5;">3</div>
                  <div>
                    <h3 style="font-size: 16px; margin: 0 0 5px 0;">Earn monthly</h3>
                    <p style="font-size: 14px; color: #6b7280; margin: 0;">Each follower = $4/month. Paid forever from day one.</p>
                  </div>
                </div>
              </div>
              
              <!-- Example -->
              <div style="background: #1f2937; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <p style="color: #9ca3af; font-size: 13px; margin: 0 0 10px 0;">📈 EXAMPLE</p>
                <p style="color: white; font-size: 16px; margin: 0 0 10px 0;">
                  <strong>Sarah</strong> shared her link and got <strong>47 friends</strong> to join.
                </p>
                <p style="color: #34d399; font-size: 24px; font-weight: 700; margin: 0;">
                  $188/month
                </p>
                <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">
                  from day one, just for sharing a link.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; text-align: center;">
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
                  💣 Launching April 1st, 2026<br>
                  ${new Date().toLocaleDateString()}
                </p>
                <p style="font-size: 12px; color: #9ca3af;">
                  © 2026 My Social Bomb · Built in Norway 🇳🇴<br>
                  <a href="https://mysocialbomb.com" style="color: #4f46e5; text-decoration: none;">mysocialbomb.com</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
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