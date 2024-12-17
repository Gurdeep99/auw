import sharp from "sharp";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const width = parseInt(searchParams.get("w")) || 1080;
    const aspectRatio = searchParams.get("r") || "16x9";
    const quality = parseInt(searchParams.get("q")) || 80;

    // Extract aspect ratio and calculate height
    const [aspectW, aspectH] = aspectRatio.split("x").map(Number);
    if (!aspectW || !aspectH) {
      return new Response("Invalid aspect ratio format. Use r=16x9", { status: 400 });
    }
    const height = Math.round((width * aspectH) / aspectW);

    // Create SVG with text "AUW" centered
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="black" />
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.round(height / 5)}" fill="white" text-anchor="middle" alignment-baseline="middle">
          AUW
        </text>
      </svg>
    `;

    // Use sharp to convert SVG to PNG or JPEG
    const buffer = await sharp(Buffer.from(svg))
      .jpeg({ quality: Math.min(Math.max(quality, 1), 100) }) // Clamp quality between 1-100
      .toBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
