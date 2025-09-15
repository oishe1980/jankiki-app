const webpush = require('web-push');

// TODO: Replace with your own VAPID keys
const publicVapidKey = 'YOUR_PUBLIC_KEY';
const privateVapidKey = 'YOUR_PRIVATE_KEY';

webpush.setVapidDetails(
  'mailto:you@example.com',
  publicVapidKey,
  privateVapidKey
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subscription, payload } = req.body;

    if (!subscription || !payload) {
      return res.status(400).json({ error: 'Missing subscription or payload' });
    }

    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error sending push:', err);
      return res.status(500).json({ error: 'Push failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}