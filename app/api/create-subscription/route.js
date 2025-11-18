import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { planType } = req.body;

  const planId =
    planType === "monthly"
      ? process.env.RAZORPAY_MONTHLY_PLAN_ID
      : process.env.RAZORPAY_YEARLY_PLAN_ID;

  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_PAYMENT_KEY_ID,
    key_secret: process.env.RAZORPAY_PAYMENT_KEY_SECRET,
  });

  const result = await instance.subscriptions.create({
    plan_id: planId,
    customer_notify: 1,
    quantity: 1,
    total_count: 1,
    addons: [],
    notes: {
      key1: "Note",
    },
  });

  return NextResponse.json(result);
}
