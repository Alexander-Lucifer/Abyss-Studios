import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Log form data (excluding sensitive information)
    console.log('Received application for position:', formData.get('position'));
    
    // Check if SMTP is properly configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || 
        process.env.SMTP_HOST === 'SMTP_HOST' || process.env.SMTP_USER === 'SMTP_USER') {
      console.log('SMTP not configured, returning error to trigger fallback');
      return NextResponse.json(
        { 
          message: 'SMTP not configured - please use mailto fallback',
          fallback: true
        },
        { status: 500 }
      );
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

    // Prepare email content
    const position = formData.get('position') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const portfolio = formData.get('portfolio') as string;
    const experience = formData.get('experience') as string;
    const message = formData.get('message') as string;
    const resume = formData.get('resume') as File;

    if (!resume) {
      throw new Error('Resume file is required');
    }

    // Convert resume to buffer
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    console.log('Resume processed successfully');

    // Send email from user's email address
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: `Job Application: ${position} - ${name}`,
      text: `
Position: ${position}
Name: ${name}
Email: ${email}
Phone: ${phone}
Portfolio: ${portfolio}
Experience: ${experience}

Cover Letter:
${message}
      `,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Portfolio:</strong> ${portfolio}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <h3>Cover Letter:</h3>
        <p>${(message || '').replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This application was sent from the Abyss Studios website career form.</small></p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    console.log('Email sent successfully:', (info as any).messageId);
    return NextResponse.json({ 
      message: 'Application submitted successfully',
      messageId: (info as any).messageId
    });
  } catch (error) {
    console.error('Error sending application:', error);
    return NextResponse.json(
      { 
        message: 'Failed to submit application',
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