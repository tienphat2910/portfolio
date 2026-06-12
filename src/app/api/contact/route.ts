import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Validate fields
    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, subject, and message are required." },
        { status: 400 }
      );
    }

    let savedToSupabase = false;

    // 1. Save to Supabase (if configured)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = (await createClient()) as any;
        const { error } = await supabase
          .from("contact_messages")
          .insert([
            {
              name: fullName,
              email,
              phone,
              subject,
              message,
              status: "unread"
            }
          ]);

        if (error) throw error;
        savedToSupabase = true;
      } catch (dbError) {
        console.error("Failed to save message in Supabase database:", dbError);
      }
    } else {
      console.warn("Supabase credentials missing. Submission will only be processed via Email (if configured).");
    }

    // 2. Send email notification (optional fallback/alert)
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_TO) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || "smtp.gmail.com",
          port: parseInt(process.env.EMAIL_PORT || "587"),
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        const emailHtml = `
          <h3>New Portfolio Message Submission</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="padding: 10px; background-color: #f5f5f5; border-left: 4px solid #10b981;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        `;

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO,
          subject: `Portfolio Contact: ${subject} - ${fullName}`,
          html: emailHtml,
          replyTo: email
        });
        emailSent = true;
      } catch (mailError) {
        console.error("Failed to send notification email:", mailError);
      }
    }

    // If we could not save to Supabase AND could not send email, return failure
    if (!savedToSupabase && !emailSent) {
      return NextResponse.json(
        { error: "Failed to process form submission. Please configure database or email credentials." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Form submission received successfully",
      savedToSupabase,
      emailSent
    });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
