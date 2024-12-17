import { createCanvas } from 'canvas';
import sharp from 'sharp';

export async function GET(request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get('w')) || 1080;
    const aspectRatio = searchParams.get('r') || '16x9';
    const quality = parseInt(searchParams.get('q')) || 80;

    // Extract and validate aspect ratio
    const [aspectWidth, aspectHeight] = aspectRatio.split('x').map(Number);
    if (!aspectWidth || !aspectHeight || aspectWidth <= 0 || aspectHeight <= 0) {
      return new Response('Invalid aspect ratio. Use format r=16x9', { status: 400 });
    }

    // Calculate height based on the aspect ratio
    const height = Math.round((width * aspectHeight) / aspectWidth);

    // Create a canvas and draw the image
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Set black background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Add white "AUW" text in the center
    ctx.fillStyle = '#FFF';
    ctx.font = `${Math.round(height / 5)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AUW', width / 2, height / 2);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Use Sharp to adjust quality and format
    const finalImage = await sharp(buffer)
      .jpeg({ quality: Math.min(Math.max(quality, 1), 100) }) // Clamp quality between 1 and 100
      .toBuffer();

    // Return the image as a response
    return new Response(finalImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
