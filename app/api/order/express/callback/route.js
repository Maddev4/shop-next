import { NextResponse } from "next/server";
import { handleMpesaExpressCallback } from "@/app/utils/utils";

export async function POST(request) {
  try {
    const callbackData = await request.json();
    console.log("Express Callback received:", callbackData);

    // Create mock response object to maintain compatibility with Express handler
    const mockRes = {
      json: (data) => NextResponse.json(data),
      status: (code) => ({
        json: (data) => NextResponse.json(data, { status: code }),
      }),
    };

    // Process callback using existing handler
    const result = await handleMpesaExpressCallback(
      { body: callbackData },
      mockRes
    );

    // If result is a NextResponse, return it directly
    if (result instanceof NextResponse) {
      return result;
    }

    // Otherwise wrap the result in NextResponse
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing M-pesa Express callback:", error);
    return NextResponse.json(
      {
        ResultCode: 1,
        ResultDesc: "Internal server error",
      },
      { status: 500 }
    );
  }
}
