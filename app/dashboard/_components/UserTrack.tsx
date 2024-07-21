"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

function UserTrack() {
  const { user } = useUser();

  useEffect(() => {
    user && getData();
  }, [user]);

  const getData = async () => {
    const result = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

      getTotalUsage
  };

  const getTotalUsage = () => {
    let total: number = 0;
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.length);
    });

    console.log(total);
  };

  return (
    <div className="bg-primary text-white p-3 rounded-lg">
      <div>
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: "35%",
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">562/10,000 credits are used</h2>
      </div>
      <Button variant={"outline"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}

export default UserTrack;
