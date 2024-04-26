"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories();
  }, [])

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if(category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
}
  
  return (
    <div>
      <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="bg-secondary border-none min-h-[54px] md:w-[300px] ">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="items-center">
          <SelectItem value="All">All</SelectItem>
          {categories.map((category) => (
          <SelectItem value={category.name} key={category._id} className="">
            {category.name}
          </SelectItem>
        ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
