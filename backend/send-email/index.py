"""Отправка писем с формы обратной связи на сайте Кухня"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        email = body.get("email", "").strip()
        message = body.get("message", "").strip()

        if not name or not message:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Имя и сообщение обязательны"}),
            }

        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_pass = os.environ.get("SMTP_PASS", "")
        email_to = os.environ.get("EMAIL_TO", smtp_user)

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Новое сообщение с сайта Кухня от {name}"
        msg["From"] = smtp_user
        msg["To"] = email_to

        html = f"""
        <html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
          <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#f97316,#e11d48);padding:24px 28px;">
              <h2 style="color:#fff;margin:0;font-size:20px;">🔥 Новое сообщение с сайта Кухня</h2>
            </div>
            <div style="padding:28px;">
              <p style="margin:0 0 12px;color:#555;font-size:14px;"><strong style="color:#111;">Имя:</strong> {name}</p>
              <p style="margin:0 0 12px;color:#555;font-size:14px;"><strong style="color:#111;">Email:</strong> {email if email else "не указан"}</p>
              <div style="background:#fff8f3;border-left:4px solid #f97316;padding:16px;border-radius:0 8px 8px 0;margin-top:16px;">
                <p style="margin:0;color:#333;font-size:15px;line-height:1.6;">{message}</p>
              </div>
            </div>
            <div style="padding:16px 28px;background:#f9f9f9;border-top:1px solid #eee;">
              <p style="margin:0;color:#aaa;font-size:12px;">Кухня — сайт кулинарных рецептов · Казань</p>
            </div>
          </div>
        </body></html>
        """

        msg.attach(MIMEText(html, "html", "utf-8"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, email_to, msg.as_string())

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"ok": True}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": str(e)}),
        }
