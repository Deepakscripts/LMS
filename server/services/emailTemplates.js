/**
 * Email template helper functions
 */

/**
 * Get email template wrapper with styling
 * @param {string} content - Main email content HTML
 * @param {string} title - Email title
 * @returns {string} Formatted HTML email
 */
export const getEmailTemplate = (content, title = "") => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #f9fafb;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 30px;
                }
                .footer {
                    background-color: #f3f4f6;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #6b7280;
                    border-top: 1px solid #e5e7eb;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #667eea;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    margin: 20px 0;
                    font-weight: 500;
                }
                .button:hover {
                    background-color: #5568d3;
                }
                .button.danger {
                    background-color: #dc3545;
                }
                .button.success {
                    background-color: #28a745;
                }
                .button.danger:hover {
                    background-color: #c82333;
                }
                .button.success:hover {
                    background-color: #218838;
                }
                code {
                    background-color: #f3f4f6;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 14px;
                }
                .divider {
                    border-top: 1px solid #e5e7eb;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>${title}</h1>
                </div>
                <div class="content">
                    ${content}
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} LMS. All rights reserved.</p>
                    <p>If you have any questions, please contact us at support@example.com</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

/**
 * Generate password reset email content
 */
export const passwordResetEmailTemplate = (name, resetLink) => {
    const content = `
        <h2>Hello ${name},</h2>
        <p>You requested a password reset. Click the button below to set a new password:</p>
        <p>
            <a href="${resetLink}" class="button danger">Reset Password</a>
        </p>
        <p>Or copy and paste this link in your browser:</p>
        <code>${resetLink}</code>
        <p style="color: #6b7280; font-size: 14px;">This link will expire in 1 hour.</p>
        <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email or contact support immediately.</p>
    `;
    return getEmailTemplate(content, "Password Reset");
};

/**
 * Generate course enrollment email content
 */
export const enrollmentEmailTemplate = (
    name,
    courseName,
    lmsId,
    lmsPassword,
    lmsLink
) => {
    const content = `
        <h2>Welcome to ${courseName}!</h2>
        <p>Hi ${name},</p>
        <p>Congratulations! You've successfully enrolled in:</p>
        <h3 style="color: #667eea;">${courseName}</h3>
        <p>You can now access all course materials, lessons, quizzes, and assignments.</p>
            <div style="background-color: #f0f4ff; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="color: #667eea; margin-top: 0;">Your LMS Credentials</h3>
                <p style="margin: 10px 0;"><strong>LMS ID:</strong> <code style="background-color: white; padding: 4px 8px;">${lmsId}</code></p>
                <p style="margin: 10px 0;"><strong>Password:</strong> <code style="background-color: white; padding: 4px 8px;">${lmsPassword}</code></p>
                <p style="margin: 10px 0; color: #6b7280; font-size: 13px;">Keep these credentials safe. We recommend changing your password after your first login.</p>
            </div>
        <p>
            <a href="${lmsLink}" class="button">Start Learning</a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">Good luck with your learning journey!</p>
    `;
    return getEmailTemplate(content, "Course Enrollment Confirmed");
};

/**
 * Generate certificate email content
 */
export const certificateEmailTemplate = (name, courseName, certificateUrl) => {
    const content = `
        <h2>Congratulations, ${name}! 🎉</h2>
        <p>You have successfully completed:</p>
        <h3 style="color: #28a745;">${courseName}</h3>
        <p>Your certificate of completion is now ready for download.</p>
        <p>
            <a href="${certificateUrl}" class="button success">Download Certificate</a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">Share your achievement on social media and let others know about your success!</p>
    `;
    return getEmailTemplate(content, "Certificate of Completion");
};

/**
 * Generate support ticket response email content
 */
export const supportEmailTemplate = (name, ticketId, subject) => {
    const content = `
        <h2>Support Ticket Received</h2>
        <p>Hi ${name},</p>
        <p>Thank you for contacting our support team. We've received your request:</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p><strong>Ticket ID:</strong> <code>${ticketId}</code></p>
            <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <p>Our team will review your request and get back to you as soon as possible.</p>
        <p style="color: #6b7280; font-size: 14px;">Please keep your ticket ID for future reference.</p>
    `;
    return getEmailTemplate(content, "Support Ticket Confirmation");
};

/**
 * Generate payment rejection email content
 */
export const getPaymentRejectionEmailTemplate = (title, name, content) => {
    const htmlContent = `
        <h2 style="color: #dc3545;">${title}</h2>
        <p>Hi ${name},</p>
        <div style="background-color: #fff5f5; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #dc3545;">
            ${content}
        </div>
        <p>If you believe this is an error, please contact support.</p>
    `;
    return getEmailTemplate(htmlContent, title);
};


export default {
    getEmailTemplate,
    passwordResetEmailTemplate,
    enrollmentEmailTemplate,
    certificateEmailTemplate,
    supportEmailTemplate,
    getPaymentRejectionEmailTemplate,
};
