import { Request, Response } from 'express';
import Url from '../models/Url';
import { nanoid } from 'nanoid';

interface AuthRequest extends Request {
  userId?: string;
}

const baseUrl = 'http://localhost:3000';

export const shortenUrl = async (req: AuthRequest, res: Response) => {
  const { longUrl } = req.body;
  const userId = req.userId;

  if (!longUrl || !longUrl.startsWith('http') || !userId) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const shortId = nanoid(6);

  try {
    const newUrl = await Url.create({ longUrl, shortId, userId });
    res.status(201).json({ shortUrl: `${baseUrl}/${shortId}` });
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