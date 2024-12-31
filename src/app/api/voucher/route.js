// app/api/voucher/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  const clientKey = req.headers.get("clientkey");
  const propertyKey = req.headers.get("propertykey");
  const authorization = req.headers.get("Authorization");

  if (
    clientKey !== process.env.CLIENT_KEY ||
    propertyKey !== process.env.PROPERTY_KEY ||
    authorization !== process.env.AUTHORIZATION
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = {
    title: "फ्लिपकार्ट गिफ्ट वाउचर 150 रुपये का",
    subTitle: "वाउचर रिडीम करने के लिए चरणों का पालन करें",
    background : "https://auw.gurdeep.net/flipkart.png",
    icon : "flipkart",
    points: 200,
    slug: "#",
    subText: "वाउचर कैसे भुनाएँ",
    subDescription: "वाउचर रिडीम करने के लिए चरणों का पालन करें",
    redeem: [
      {
        id : 1,
        point: "पॉइंट रीडीम करके गिफ्ट कार्ड प्राप्त करें",
      },
      {
        id : 2,
        point: "आपको गिफ्ट कार्ड कोड मिलेगा।",
      },
      {
        id : 3,
        point: "Amazon वेबसाइट पर जाएँ",
      },
      {
        id : 4,
        point: '"नयासेक्शनजोड़ें" में वाउचर कोड दर्ज करें',
      },
      {
        id : 5,
        point: 'वाउचर जोड़ने के लिए "जोड़ेंबटन" पर क्लिक करें',
      },
      {
        id : 6,
        point: "बधाई हो आपका वाउचर मान्य हो गया है",
      },
      {
        id : 7,
        point: "बधाई हो आपका वाउचर मान्य हो गया है",
      },
      {
        id : 8,
        point: "बधाई हो आपका वाउचर मान्य हो गया है",
      },
      {
        id : 9,
        point: "बधाई हो आपका वाउचर मान्य हो गया है",
      },
    ],
  };

  return NextResponse.json(data);
}
