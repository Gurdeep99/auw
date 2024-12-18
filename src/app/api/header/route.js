import { NextResponse } from "next/server";

export async function POST(req) {
  // Extract the 'hello' header from the request
  const helloHeader = req.headers;

    return NextResponse.json({ message: helloHeader });
}
