import { NextResponse } from "next/server";

export async function POST(req) {
  // Extract the 'hello' header from the request
  const helloHeader = req.headers.get("deviceId");

  if (helloHeader) {
    // Return the header value in the response
    return NextResponse.json({ deviceId: helloHeader });
  } else {
    // Return an error response if the 'hello' header is missing
    return NextResponse.json({ error: "Missing 'hello' header" }, { status: 400 });
  }
}
