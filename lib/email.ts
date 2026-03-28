import nodemailer from 'nodemailer'

// SMTP-konfigurasjon
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  secure: false, // false for STARTTLS on port 587
  auth: {
    user: 'post@mysocialbomb.com',
    pass: process.env.SMTP_PASSWORD,
  },
})

// Funksjon for å sende bekreftelsesepost
export async function sendConfirmationEmail(email: string, confirmationLink: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm your email</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; }
        .header { background: linear-gradient(135deg, #6366f1, #a855f7); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; background: white; border-radius: 0 0 12px 12px; }
        .button { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; margin-top: 30px; }
        @media (max-width: 600px) {
          .container { width: 100%; }
          .content { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to MySocialBomb!</h1>
        </div>
        <div class="content">
          <p>Hey there! 👋</p>
          <p>Thanks for signing up for <strong>MySocialBomb</strong> – the AI-powered platform that helps you dominate social media.</p>
          
          <p>Please confirm your email address to get started:</p>
          
          <div style="text-align: center;">
            <a href="${confirmationLink}" class="button">Confirm Email Address</a>
          </div>
          
          <p>Or copy this link: <br> <a href="${confirmationLink}">${confirmationLink}</a></p>
          
          <p>Once confirmed, you'll get access to your dashboard where you can start creating AI-powered content.</p>
          
          <p>Best regards,<br><strong>The MySocialBomb Team</strong></p>
        </div>
        <div class="footer">
          <p>MySocialBomb • AI-powered social media growth</p>
          <p><a href="https://mysocialbomb.com" style="color: #6366f1;">mysocialbomb.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: '"MySocialBomb" <post@mysocialbomb.com>',
      to: email,
      subject: 'Confirm your email – MySocialBomb',
      html,
    })
    console.log(`Confirmation email sent to ${email}: ${info.messageId}`)
    return { success: true }
  } catch (error) {
    console.error(`Failed to send confirmation email to ${email}:`, error)
    return { success: false, error }
  }
}