"use client";
import React, { useState } from "react";
import SearchSec from "./_components/SearchSec";
import TemplateSec from "./_components/TemplateSec";

const page = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>();

  return (
    <div>
      {/* Search Section */}
      <SearchSec onSearchInput={(value: string) => setUserSearchInput(value)} />
      {/* Search Section */}

      {/* Template Section */}
      <TemplateSec userSearchInput={userSearchInput} />
      {/* Template Section */}
    </div>
  );
};

export default page;
