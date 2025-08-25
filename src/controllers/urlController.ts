import { Request, Response } from 'express';
import Url from '../models/Url';
import { nanoid } from 'nanoid';

interface AuthRequest extends Request {
  userId?: string;
}

export const shortenUrl = async (req: AuthRequest, res: Response) => {
  const { longUrl } = req.body;
  const userId = req.userId;

  if (!longUrl || !longUrl.startsWith('http') || !userId) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const shortId = nanoid(6);

  try {
    const newUrl = await Url.create({ longUrl, shortId, userId });
    const host = req.get("host");       // e.g. my-app.up.railway.app
    const protocol = req.protocol;      // http or https
    const domain = `${protocol}://${host}`;
    res.status(201).json({ shortUrl: `${domain}/${shortId}` });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const redirectToLongUrl = async (req: Request, res: Response) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};