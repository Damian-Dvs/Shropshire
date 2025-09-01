// api/contact.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const contentType = req.headers['content-type'] || '';
    let data = {};

    // Accept JSON (your frontend default) and URL-encoded (fallback)
    if (contentType.includes('application/json')) {
      data = (req.body && Object.keys(req.body).length) ? req.body : await readJson(req);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const raw = await readRaw(req);
      data = Object.fromEntries(new URLSearchParams(raw));
    } else {
      return res.status(415).json({ ok: false, error: 'Unsupported content type' });
    }

    // Honeypot: if filled, pretend success
    if (data._gotcha) return res.status(200).json({ ok: true });

    // Server-side validation (matches your client fields)
    const required = ['name', 'email', 'phone', 'serviceDate', 'serviceTime', 'message'];
    const missing = required.filter((k) => !String(data[k] || '').trim());
    if (missing.length) {
      return res.status(400).json({ ok: false, error: 'Please fill in all fields.' });
    }

    // ---- EMAIL NOTIFICATION (Resend) ----
    // Set RESEND_API_KEY in Vercel → Project → Settings → Environment Variables
    // Also set a verified sending domain in Resend and use it in the `from` field.
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const html = renderHtmlEmail({
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceDate: data.serviceDate,
        serviceTime: data.serviceTime,
        message: data.message,
      });

      // Change the addresses to your own
      await resend.emails.send({
        from: 'ShropShine <bookings@shropshinecleaning.com>', // must be a verified domain in Resend
        to: ['damiandvs87@btinternet.com'],                    // where you want to receive notifications
        subject: 'New ShropShine contact request',
        html,
      });
    } else {
      // No API key: skip email but still succeed
      console.warn('RESEND_API_KEY not set: skipping email send.');
    }

    // You could also store to DB here (Vercel Postgres, Supabase, etc.)

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

/* ---------- helpers ---------- */

function readRaw(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

async function readJson(req) {
  const raw = await readRaw(req);
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHtmlEmail({ name, email, phone, serviceDate, serviceTime, message }) {
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New contact request</h2>
      <table cellspacing="0" cellpadding="6" style="border-collapse:collapse">
        <tr>
          <td style="font-weight:600">Name</td>
          <td>${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="font-weight:600">Email</td>
          <td>${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="font-weight:600">Phone</td>
          <td>${escapeHtml(phone)}</td>
        </tr>
        <tr>
          <td style="font-weight:600">Preferred Date</td>
          <td>${escapeHtml(serviceDate)}</td>
        </tr>
        <tr>
          <td style="font-weight:600">Preferred Time</td>
          <td>${escapeHtml(serviceTime)}</td>
        </tr>
      </table>
      <h3 style="margin:16px 0 8px">Message</h3>
      <div>${escapeHtml(message).replace(/\n/g, '<br>')}</div>
    </div>
  `;
}