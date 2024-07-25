"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContxt";

function UserTrack() {
  const { user } = useUser();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updateUsageCredit, setUpdateUsageCredit } = useContext(
    UpdateCreditUsageContext
  );

  const [maxWords, setMaxWords] = useState(10000);

  useEffect(() => {
    user && getData();
    user && isUserSubscribed();
  }, [user]);

  useEffect(() => {
    getData();
  }, [updateUsageCredit && user]);

  const getTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element) => {
      total += element.aiResponse.length;
    });
    setTotalUsage(total);
  };

  const getData = async () => {
    if (!user) return;

    const result: HISTORY[] | any = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

    getTotalUsage(result);
  };

  const isUserSubscribed = async () => {
    const result = await db
      .select()
      .from(UserSubscription)
      .where(
        eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress)
      );

    if (result) {
      setUserSubscription(true);
      setMaxWords(100000);
    }
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <div>
          <h2 className="font-medium">Credits</h2>
          <div className="h-2 bg-[#9981f9] w-full rounded-full">
            <div
              className="h-2 bg-white rounded-full"
              style={{
                width: `${(totalUsage / maxWords) * 100}%`,
              }}
            ></div>
          </div>
          <h2 className="text-sm my-2">
            {totalUsage}/{maxWords} credits are used
          </h2>
        </div>
        <Button variant={"outline"} className="w-full my-3 text-primary">
          Upgrade
        </Button>
      </div>
    </div>
  );
}

export default UserTrack;
