"use client"

import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchComponent = ({ placeholder = "Search Title..." }: { placeholder?: string }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"]
        })
      }

      router.push(newUrl, { scroll: false });

    }, 300)

    return () => clearTimeout(delayDebounceFn);
    
  }, [query, searchParams, router])

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-lg bg-secondary px-4 py-2">
      <Search className="w-6 h-6 text-zinc-500"/>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}  
        className="bg-secondary outline-offset-0 border-0 focus:border-0"  
      />
    </div>
  ) 
}

export default SearchComponent