
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const history = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, email));

  const subscription = await db
    .select()
    .from(UserSubscription)
    .where(eq(UserSubscription.email, email));

  return new Response(
    JSON.stringify({ history, subscription }),
    { headers: { "Content-Type": "application/json" } }
  );
}
