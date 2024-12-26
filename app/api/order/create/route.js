import { processPayment } from "@/app/utils/utils";

export async function POST(request) {
  try {
    console.log("===================");
    console.log("Order created");
    console.log("===================");

    const body = await request.json();
    const result = await processPayment(body);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Error creating product" }, { status: 500 });
  }
}
