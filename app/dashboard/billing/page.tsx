"use client";

import Script from "next/script";
import { PricingCard } from "../_components/PricingCard";

export default function BillingPage() {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="bg-white m-4 rounded-md dark:bg-gray-900">
        <section className="">
          <div className="py-8 px-4 mx-auto max-w-screen-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold">
                Choose the plan that fits your workflow
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <PricingCard
                title="Free"
                price="$0"
                period="month"
                features={[
                  "Individual configuration",
                  "No hidden fees",
                  "1 developer",
                  "6 months premium support",
                  "6 months free updates",
                ]}
                planType="free"
              />

              <PricingCard
                title="Monthly"
                price="$9.5"
                period="month"
                features={[
                  "Individual configuration",
                  "No hidden fees",
                  "10 developers",
                  "24 months support",
                  "24 months updates",
                ]}
                planType="monthly"
              />

              <PricingCard
                title="Yearly"
                price="$90.50"
                period="year"
                features={[
                  "Individual configuration",
                  "No hidden fees",
                  "100+ developers",
                  "36 months support",
                  "36 months updates",
                ]}
                planType="yearly"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
