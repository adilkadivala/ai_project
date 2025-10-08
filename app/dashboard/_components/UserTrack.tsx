"use client";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContxt";

function UserTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateUsageCredit } = useContext(UpdateCreditUsageContext);

  const [maxWords, setMaxWords] = useState(10000);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user, updateUsageCredit]);

  const fetchData = async () => {
    const res = await fetch(`/api/user-track?email=${user?.primaryEmailAddress?.emailAddress}`);
    const data = await res.json();

    // total usage
    let total = 0;
    data.history.forEach((el: any) => (total += el.aiResponse.length));
    setTotalUsage(total);

    // subscription
    if (data.subscription.length > 0) {
      setUserSubscription(true);
      setMaxWords(100000);
    }
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${(totalUsage / maxWords) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} credits are used
        </h2>
      </div>
    </div>
  );
}

export default UserTrack;
