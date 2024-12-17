import { createCanvas } from 'canvas';
import sharp from 'sharp';

export default async function handler(req, res) {
  try {
    // Parse query parameters
    const { w = 1080, r = '16x9', q = 80 } = req.query;

    // Extract and validate parameters
    const width = parseInt(w, 10) || 1080;
    const quality = parseInt(q, 10) || 80;
    const [aspectWidth, aspectHeight] = r.split('x').map(Number);

    // Ensure valid aspect ratio
    if (!aspectWidth || !aspectHeight || aspectWidth <= 0 || aspectHeight <= 0) {
      return res.status(400).send('Invalid aspect ratio. Use format r=16x9');
    }

    // Calculate height based on aspect ratio
    const height = Math.round((width * aspectHeight) / aspectWidth);

    // Create a canvas and draw the image
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Set background to black
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Add white text "AUW" in the center
    ctx.fillStyle = '#FFF';
    ctx.font = `${Math.round(height / 5)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AUW', width / 2, height / 2);

    // Convert canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Use Sharp to adjust image quality
    const finalImage = await sharp(buffer)
      .jpeg({ quality: Math.min(Math.max(quality, 1), 100) }) // Clamp quality between 1 and 100
      .toBuffer();

    // Set response headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(finalImage);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Internal Server Error');
  }
}
