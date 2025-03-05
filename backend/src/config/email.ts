import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
    html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
            port: parseInt(process.env.EMAIL_PORT || '2525'),
            auth: {
                user: process.env.EMAIL_USERNAME || '',
                pass: process.env.EMAIL_PASSWORD || '',
            },
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@taskmanager.com',
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${options.email}`);
    } catch (error) {
        logger.error('Error sending email:', error);
        throw error;
    }
};

