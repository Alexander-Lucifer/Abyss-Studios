import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, subject, message, inquiryType, serviceType, budget } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Received contact form submission from:', name, '(', email, ')');
    
    // Format additional fields
    let servicesDetailsText = "";
    let servicesDetailsHtml = "";
    if (inquiryType === "services") {
      servicesDetailsText = `Inquiry Type: Services Inquiry\nService Domain: ${serviceType}\nBudget Level: ${budget}\n\n`;
      servicesDetailsHtml = `
        <p><strong>Inquiry Type:</strong> Services Inquiry</p>
        <p><strong>Service Domain:</strong> ${serviceType}</p>
        <p><strong>Estimated Budget:</strong> ${budget}</p>
      `;
    } else if (inquiryType === "partnership") {
      servicesDetailsText = `Inquiry Type: Business Partnership Inquiry\n\n`;
      servicesDetailsHtml = `<p><strong>Inquiry Type:</strong> Business Partnership Inquiry</p>`;
    } else {
      servicesDetailsText = `Inquiry Type: General Feedback / Inquiry\n\n`;
      servicesDetailsHtml = `<p><strong>Inquiry Type:</strong> General Feedback / Inquiry</p>`;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Send email from user's email address
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: `
New contact form submission from Abyss Studios website:

Name: ${name}
Email: ${email}
Subject: ${subject}
${servicesDetailsText}
Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        ${servicesDetailsHtml}
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This message was sent from the Abyss Studios website contact form.</small></p>
      `,
    });

    console.log('Contact email sent successfully:', info.messageId);
    return NextResponse.json({ 
      message: 'Message sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { 
        message: 'Failed to send message',
        error: error instanceof Error ? error.message : 'Unknown error',
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL
        }
      },
      { status: 500 }
    );
  }
}
