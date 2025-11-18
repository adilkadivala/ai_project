"use client";

import Script from "next/script";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import moment from "moment";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { useContext, useState } from "react";
import { Loader2Icon } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const  PricingCard = ({
  title,
  price,
  period,
  features,
  planType,
}: {
  title: string;
  price: string;
  period: string;
  features: string[];
  planType: "free" | "monthly" | "yearly";
}) => {
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const activePlan = userSubscription?.planType;
  const isActive = activePlan === planType;

  const saveSubscriptionToDB = async (paymentId: string) => {
    const email = user?.primaryEmailAddress?.emailAddress || "";

    await db.insert(UserSubscription).values({
      email,
      paymentId,
      planType: planType,
      userName: user?.fullName || "",
      active: true,
      joinDate: moment().format("DD/MM/YYYY"),
    });

    window.location.reload();
  };

  const onPayment = (subId: string) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded yet. Try again.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_KEY_ID,
      subscription_id: subId,
      name: "Adil Kadival",
      description: `${title} Package`,

      handler: async function (response: any) {
        if (response.razorpay_payment_id) {
          await saveSubscriptionToDB(response.razorpay_payment_id);
        }
        setLoading(false);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const createSubscription = () => {
    setLoading(true);
    axios
      .post("/api/create-subscription", { planType })
      .then((res) => onPayment(res.data.id))
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div
        className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow 
        ${
          isActive
            ? "border-primary border-4 dark:border-primary"
            : "border-gray-200 dark:border-gray-700"
        }
        bg-white dark:bg-gray-800`}
      >
        <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
        <p className="font-light text-gray-500 dark:text-gray-400">
          Ideal plan for your workflow.
        </p>

        <div className="flex justify-center items-baseline my-8">
          <span className="mr-2 text-5xl font-extrabold">{price}</span>
          <span className="text-gray-500 dark:text-gray-400">/{period}</span>
        </div>

        <ul className="mb-8 space-y-4 text-left">
          {features.map((f) => (
            <li className="flex items-center space-x-3" key={f}>
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          disabled={isActive || loading}
          className={
            isActive
              ? "bg-white text-primary border border-primary"
              : "bg-primary text-white"
          }
          onClick={() => {
            if (
              !isActive &&
              (planType === "monthly" || planType === "yearly")
            ) {
              createSubscription();
            }
          }}
        >
          {loading && (planType === "monthly" || planType === "yearly") && (
            <Loader2Icon className="animate-spin mr-2" />
          )}
          {isActive ? "Active Plan" : "Get Started"}
        </Button>
      </div>
    </>
  );
};
