// api/contact.js
import { Resend } from 'resend';

const BRAND = {
  name: 'ShropShine Cleaning',
  // Tailwind brand colours
  primary: '#1abc9f',   // teal-green
  soft: '#e8f9f7',      // very light aqua
  dark: '#2c3e50',      // strong dark text
  // visuals
  border: '#e8f9f7',
  bg: '#e8f9f7',
  text: '#2c3e50',
  subtext: '#2c3e50',
  // use an absolute URL for emails
  logo: 'https://shropshinecleaning.com/logo.png',
  siteUrl: 'https://shropshinecleaning.com',
  // sender addresses (must be verified in Resend)
  bookingsFrom: 'ShropShine <web-bookings@shropshinecleaning.com>',
  noreplyFrom: 'ShropShine-no-reply <noreply@shropshinecleaning.com>',
  // where you receive enquiries
  adminTo: ['bookings@shropshinecleaning.com'],
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const contentType = req.headers['content-type'] || '';
    let data = {};

    if (contentType.includes('application/json')) {
      data = (req.body && Object.keys(req.body).length) ? req.body : await readJson(req);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const raw = await readRaw(req);
      data = Object.fromEntries(new URLSearchParams(raw));
    } else {
      return res.status(415).json({ ok: false, error: 'Unsupported content type' });
    }

    // Honeypot
    if (data._gotcha) return res.status(200).json({ ok: true });

    // Validation
    const required = ['name', 'email', 'phone', 'serviceDate', 'serviceTime', 'message'];
    const missing = required.filter((k) => !String(data[k] || '').trim());
    if (missing.length) {
      return res.status(400).json({ ok: false, error: 'Please fill in all fields.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);

      // Admin notification (reply-to customer)
      await resend.emails.send({
        from: BRAND.bookingsFrom,
        to: BRAND.adminTo,
        reply_to: data.email, // reply goes to the customer
        subject: 'New ShropShine contact request',
        html: renderThemedEmail({ variant: 'admin', ...data }),
      });

      // Customer confirmation (auto-reply)
      await resend.emails.send({
        from: BRAND.noreplyFrom,
        to: [data.email],
        subject: 'We received your request — ShropShine Cleaning',
        html: renderThemedEmail({ variant: 'customer', ...data }),
      });
    } else {
      console.warn('RESEND_API_KEY not set: skipping email send.');
    }

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
  try { return JSON.parse(raw); } catch { return {}; }
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
  const fontStack = "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
  const heading = variant === 'admin' ? 'New contact request' : 'Thanks — we received your request';
  const intro = variant === 'admin'
    ? `A new enquiry has been submitted on <strong>${escapeHtml(BRAND.name)}</strong>.`
    : `Hi ${escapeHtml(name)},<br>Thanks for contacting <strong>${escapeHtml(BRAND.name)}</strong>. We’ve received your request and will be in touch shortly.`;

  const footer = variant === 'admin'
    ? `Reply directly to this email to contact the customer.`
    : `If you need to update anything, just reply to this email or visit <a href="${BRAND.siteUrl}" style="color:${BRAND.primary};text-decoration:none">${BRAND.siteUrl.replace('https://','')}</a>.`;

  const actionBtn = variant === 'customer'
    ? `<a href="${BRAND.siteUrl}" style="
        display:inline-block;
        padding:12px 20px;
        border-radius:10px;
        background:${BRAND.primary};
        color:#ffffff;
        font-weight:600;
        text-decoration:none;
        box-shadow:0 2px 6px rgba(0,0,0,0.12);
      ">Visit our Website</a>`
    : '';

  return `
  <div style="background:${BRAND.bg};padding:24px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.06);">
      <tr>
        <td style="background:${BRAND.primary};padding:16px 20px;">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
            <tr>
              <td style="color:#ffffff;font:700 18px ${fontStack}">
                ${escapeHtml(BRAND.name)}
              </td>
              <td align="right">
                ${BRAND.logo ? `<img src="${BRAND.logo}" alt="${escapeHtml(BRAND.name)}" height="30" style="display:block;border:0;outline:none;"/>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:22px;color:${BRAND.text};font:400 16px/1.65 ${fontStack}">
          <h2 style="margin:0 0 10px 0;font:800 24px/1.25 ${fontStack};color:${BRAND.dark}">${heading}</h2>
          <p style="margin:0 0 16px;color:${BRAND.subtext}">${intro}</p>

          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;margin:8px 0 18px">
            ${row('Name', name)}
            ${row('Email', email)}
            ${row('Phone', phone)}
            ${row('Preferred Date', serviceDate)}
            ${row('Preferred Time', serviceTime)}
          </table>

          <div style="margin:14px 0 8px;font-weight:700;color:${BRAND.dark}">Message</div>
          <div style="padding:14px;border:1px solid ${BRAND.border};border-radius:10px;background:${BRAND.soft};white-space:pre-wrap;color:${BRAND.text}">${escapeHtml(message)}</div>

          ${actionBtn ? `<div style="margin-top:20px">${actionBtn}</div>` : ''}

          <p style="margin:20px 0 0;color:${BRAND.subtext};font-size:14px">${footer}</p>
        </td>
      </tr>

      <tr>
        <td style="padding:14px 20px;border-top:1px solid ${BRAND.border};color:${BRAND.subtext};font:400 13px/1.5 ${fontStack}">
          &copy; ${new Date().getFullYear()} ${escapeHtml(BRAND.name)}
        </td>
      </tr>
    </table>
  </div>`;

  function row(label, value) {
    return `
      <tr>
        <td style="width:170px;padding:10px 12px;border:1px solid ${BRAND.border};border-right:0;border-radius:10px 0 0 10px;background:#ffffff;font-weight:700;color:${BRAND.dark}">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;border:1px solid ${BRAND.border};border-radius:0 10px 10px 0;background:#ffffff;color:${BRAND.text}">${escapeHtml(value || '')}</td>
      </tr>`;
  }
}