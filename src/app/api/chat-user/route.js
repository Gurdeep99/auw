// /app/api/myjtotish/route.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please define MONGODB_URI and MONGODB_DB in your environment variables.");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db("auw");
    return { client, db };
}

export async function POST(req) {
    // Validate headers
    const clientKey = req.headers.get("clientkey");
    const propertyKey = req.headers.get("propertykey");
    const authorization = req.headers.get("Authorization");

    if (clientKey !== process.env.CLIENT_KEY || propertyKey !== process.env.PROPERTY_KEY || authorization !== process.env.AUTHORIZATION) {
        return new Response(
            JSON.stringify({ error: "Unauthorized request" }),
            {
                status: 401,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const body = await req.json();
    const { type, token } = body;

    if (!type || (type !== "user" && type !== "guruji")) {
        return new Response(
            JSON.stringify({ error: "Invalid user parameter" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    if (!token) {
        return new Response(
            JSON.stringify({ error: "Token is required" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("token");

    const currentUser = user === "user" ? "user" : "guruji";
    const otherUser = user === "user" ? "guruji" : "user";

    // Update or insert the current user's token
    await collection.updateOne(
        { user: currentUser },
        { $set: { token } },
        { upsert: true }
    );

    // Retrieve the other user's token
    const otherUserData = await collection.findOne({ user: otherUser });

    return new Response(
        JSON.stringify({
            user: otherUser === "user" ? "user" : "guruji",
            token: otherUserData ? otherUserData.token : null,
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}
