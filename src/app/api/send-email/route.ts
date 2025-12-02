import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, service, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content - HTML with clean, professional design
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px; background-color: #2563eb; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <!-- Full Name -->
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="width: 120px; font-weight: bold; color: #374151; font-size: 14px;">Full Name:</td>
                                                <td style="color: #1f2937; font-size: 14px;">${fullName}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Email -->
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="width: 120px; font-weight: bold; color: #374151; font-size: 14px;">Email:</td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Phone -->
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="width: 120px; font-weight: bold; color: #374151; font-size: 14px;">Phone:</td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Service -->
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="width: 120px; font-weight: bold; color: #374151; font-size: 14px;">Service:</td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    <span style="display: inline-block; padding: 4px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 4px; font-size: 13px;">${service}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Message -->
                                <tr>
                                    <td style="padding: 20px 0;">
                                        <p style="margin: 0 0 8px 0; font-weight: bold; color: #374151; font-size: 14px;">Message:</p>
                                        <div style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 4px; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                                Submitted on ${new Date().toLocaleString(
                                  "en-US",
                                  {
                                    timeZone: "Asia/Ho_Chi_Minh",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  }
                                )} (Vietnam Time)
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();

    const emailText = `
New Contact Form Submission

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}

Submitted at: ${new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh"
    })}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact: ${service} - ${fullName}`,
      text: emailText,
      html: emailHtml,
      replyTo: email
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
