import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter = nodemailer.createTransport({
    service: 'SendGrid', 
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });

  private readonly welcomeEmailTemplate: string = `
    <html>
      <body>
        <h1>Welcome to Ecommerce!</h1>
        <p>Hi {{username}},</p>
        <p>Thank you for joining Ecommerce. We're excited to have you on board!</p>
        <p>Best regards,<br>The Ecommerce Team</p>
      </body>
    </html>
  `;

  async sendWelcomeEmail(to: string, username: string): Promise<void> {
    const emailTemplate = this.welcomeEmailTemplate.replace('{{username}}', username);

    const mailOptions = {
      from: 'no-reply@myapp.com',
      to,
      subject: 'Welcome to Ecommerce!',
      html: emailTemplate,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Welcome email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${to}`);
    }
  }
}
