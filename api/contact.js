// api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const contentType = req.headers['content-type'] || '';
    let data = {};

    if (contentType.includes('application/json')) {
      // If the body isn't auto-parsed, fall back to manual parse
      data = (req.body && Object.keys(req.body).length) ? req.body : await readJson(req);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const raw = await readRaw(req);
      data = Object.fromEntries(new URLSearchParams(raw));
    } else {
      // (We no longer send multipart/form-data from the frontend.)
      return res.status(415).json({ ok: false, error: 'Unsupported content type' });
    }

    // Honeypot: if bots fill this, pretend success
    if (data._gotcha) return res.status(200).json({ ok: true });

    // Server-side validation (mirrors your client check)
    const required = ['name', 'email', 'phone', 'serviceDate', 'serviceTime', 'message'];
    const missing = required.filter(k => !String(data[k] || '').trim());
    if (missing.length) {
      return res.status(400).json({ ok: false, error: 'Please fill in all fields.' });
    }

    // TODO (optional): store or notify
    // - Email via Resend (free tier):
    //    import { Resend } from 'resend';
    //    const resend = new Resend(process.env.RESEND_API_KEY);
    //    await resend.emails.send({
    //      from: 'ShropShine <no-reply@your-domain>',
    //      to: 'you@your-email',
    //      subject: 'New contact request',
    //      html: `
    //        <p><b>Name:</b> ${escapeHtml(data.name)}</p>
    //        <p><b>Email:</b> ${escapeHtml(data.email)}</p>
    //        <p><b>Phone:</b> ${escapeHtml(data.phone)}</p>
    //        <p><b>Date:</b> ${escapeHtml(data.serviceDate)}</p>
    //        <p><b>Time:</b> ${escapeHtml(data.serviceTime)}</p>
    //        <p><b>Message:</b><br>${escapeHtml(data.message).replace(/\\n/g,'<br>')}</p>
    //      `,
    //    });
    //
    // - Persist to DB (e.g., Vercel Postgres/Supabase) if you want a record.

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

function readRaw(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
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
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}