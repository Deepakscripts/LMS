import { Resend } from "resend";
import {
    passwordResetEmailTemplate,
    enrollmentEmailTemplate,
    supportEmailTemplate,
    certificateEmailTemplate,
    getPaymentRejectionEmailTemplate
} from "./emailTemplates.js";

/**
 * Initialize Resend email service
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a simple email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email content
 * @param {string} [options.from] - Sender email (defaults to onboarding@resend.dev)
 * @returns {Promise<Object>} Email response
 */
export const sendEmail = async ({
    to,
    subject,
    html,
    from = "onboarding@resend.dev",
}) => {
    try {
        const response = await resend.emails.send({
            from,
            to,
            subject,
            html,
        });

        if (response.error) {
            console.error("Resend API Error:", response.error);
            throw new Error(response.error.message);
        }

        return response;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};

/**
 * Send password reset email with template
 * @param {string} email - User email address
 * @param {string} name - User name
 * @param {string} resetLink - Password reset link with token
 * @returns {Promise<Object>} Email response
 */
export const sendPasswordResetEmailTemplate = async (
    email,
    name,
    resetLink
) => {
    const html = passwordResetEmailTemplate(name, resetLink);
    return sendEmail({
        to: email,
        subject: "Password Reset Request",
        html,
    });
};

/**
 * Send enrollment confirmation email with template
 * @param {string} email - User email address
 * @param {string} name - User name
 * @param {string} courseName - Course name
 * @param {string} courseUrl - Course URL
 * @param {string} [lmsId] - LMS ID (optional)
 * @param {string} [lmsPassword] - LMS password (optional)
 * @param {string} [lmsLink] - LMS login link (optional)
 * @returns {Promise<Object>} Email response
 */
export const sendEnrollmentConfirmationEmail = async (
    email,
    name,
    courseName,
    lmsId,
    lmsPassword,
    lmsLink
) => {
    const html = enrollmentEmailTemplate(
        name,
        courseName,
        lmsId,
        lmsPassword,
        lmsLink
    );
    return sendEmail({
        to: email,
        subject: `Welcome to ${courseName}`,
        html,
    });
};

/**
 * Send support ticket confirmation email with template
 * @param {string} email - User email address
 * @param {string} name - User name
 * @param {string} ticketId - Support ticket ID
 * @param {string} subject - Support ticket subject
 * @returns {Promise<Object>} Email response
 */
export const sendSupportEmailTemplate = async (
    email,
    name,
    ticketId,
    subject
) => {
    const html = supportEmailTemplate(name, ticketId, subject);
    return sendEmail({
        to: email,
        subject: "Support Ticket Confirmation",
        html,
    });
};

/**
 * Send payment rejection email
 * @param {string} email - User email address
 * @param {string} title - Email title
 * @param {string} content - Email content/reason
 * @returns {Promise<Object>} Email response
 */
export const sendPaymentRejectionEmail = async (email, name,title, content) => {
    const html = getPaymentRejectionEmailTemplate(title,name,content);
    return sendEmail({
        to: email,
        subject: "Payment Rejected",
        html,
    });
};

export default {
    sendEmail,
    sendPasswordResetEmailTemplate,
    sendEnrollmentConfirmationEmail,
    sendSupportEmailTemplate,
    sendPaymentRejectionEmail,
};
