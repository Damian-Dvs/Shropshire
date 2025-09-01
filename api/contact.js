// api/contact.js
const BRAND = {
  name: 'ShropShine Cleaning',
  primary: '#0ea5e9', // Tailwind sky-500-ish
  text: '#0b1320',
  subtext: '#475569',
  border: '#e5e7eb',
  bg: '#f8fafc',
  logo: 'https://shropshinecleaning.com/icon-192.png', // change if you have a different logo path
  siteUrl: 'https://shropshinecleaning.com'
};

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

      // Admin notification
      await resend.emails.send({
        from: `ShropShine <bookings@shropshinecleaning.com>`, // must be a verified domain in Resend
        to: ['damiandvs87@btinternet.com'],                    // where you want to receive notifications
        reply_to: data.email,                                   // reply goes to the customer directly
        subject: 'New ShropShine contact request',
        html: renderThemedEmail({ variant: 'admin', ...data }),
      });

      // Customer confirmation (sent to the person who filled the form)
      await resend.emails.send({
        from: `ShropShine <bookings@shropshinecleaning.com>`,
        to: [data.email],
        subject: 'We received your request — ShropShine Cleaning',
        html: renderThemedEmail({ variant: 'customer', ...data }),
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

function renderThemedEmail({ variant = 'admin', name, email, phone, serviceDate, serviceTime, message }) {
  const heading = variant === 'admin' ? 'New contact request' : 'Thanks — we received your request';
  const intro = variant === 'admin'
    ? `A new enquiry has been submitted on ${BRAND.name}.`
    : `Hi ${escapeHtml(name)},<br>Thanks for contacting <strong>${BRAND.name}</strong>. We’ve received your request and will be in touch shortly.`;

  const footer = variant === 'admin'
    ? `Reply directly to this email to contact the customer.`
    : `If you need to update anything, just reply to this email or visit <a href="${BRAND.siteUrl}">${BRAND.siteUrl.replace('https://','')}</a>.`;

  const actionBtn = variant === 'customer'
    ? `<a href="${BRAND.siteUrl}" style="display:inline-block;padding:12px 18px;border-radius:8px;background:${BRAND.primary};color:#fff;text-decoration:none;font-weight:600">Visit our website</a>`
    : '';

  return `
  <div style="background:${BRAND.bg};padding:24px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden">
      <tr>
        <td style="background:${BRAND.primary};padding:16px 20px">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
            <tr>
              <td style="color:#fff;font:600 18px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
                ${escapeHtml(BRAND.name)}
              </td>
              <td align="right">
                ${BRAND.logo ? `<img src="${BRAND.logo}" alt="${escapeHtml(BRAND.name)}" height="28" style="display:block;border:0;outline:none;"/>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 22px;color:${BRAND.text};font:400 16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <h2 style="margin:0 0 8px 0;font:700 22px/1.3 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.text}">${heading}</h2>
          <p style="margin:0 0 16px;color:${BRAND.subtext}">${intro}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 8px;margin:8px 0 16px">
            ${row('Name', name)}
            ${row('Email', email)}
            ${row('Phone', phone)}
            ${row('Preferred Date', serviceDate)}
            ${row('Preferred Time', serviceTime)}
          </table>
          <div style="margin:12px 0 6px;font-weight:600">Message</div>
          <div style="padding:12px;border:1px solid ${BRAND.border};border-radius:8px;background:#fafafa;white-space:pre-wrap">${escapeHtml(message)}</div>
          ${actionBtn ? `<div style="margin-top:18px">${actionBtn}</div>` : ''}
          <p style="margin:18px 0 0;color:${BRAND.subtext};font-size:14px">${footer}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-top:1px solid ${BRAND.border};color:${BRAND.subtext};font:400 13px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          &copy; ${new Date().getFullYear()} ${escapeHtml(BRAND.name)}
        </td>
      </tr>
    </table>
  </div>`;

  function row(label, value) {
    return `
      <tr>
        <td style="width:160px;padding:10px 12px;border:1px solid ${BRAND.border};border-right:0;border-radius:8px 0 0 8px;background:#fff;font-weight:600">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;border:1px solid ${BRAND.border};border-radius:0 8px 8px 0;background:#fff">${escapeHtml(value || '')}</td>
      </tr>`;
  }
}