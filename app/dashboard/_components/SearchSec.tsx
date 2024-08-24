import { Search } from "lucide-react";
import React from "react";

const SearchSec = ({ onSearchInput }: any) => {
  return (
    <div className="p-10 bg-gradient-to-br top-0 from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white sticky z-50">
      <h2 className="text-3xl font-bold ">Browse All Template</h2>
      <p>What Would You Like to Create Today ?</p>
      <div className="w-full flex justify-center ">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-4 w-[50%]">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearchInput(e.target.value)}
            className="bg-transparent outline-none text-black w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSec;
