'use client'
import { homePageDataInterface } from "@/app/landing/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function HomePageSelector(
  data: homePageDataInterface
) {
  const {optionName,optionDesc, onClick} = data;
  return (
    <Card onClick={onClick} className="max-w-xs md:max-w-md w-80 h-[20rem] bg-slate-50 transition-all duration-300 ease-in-out hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer shadow-lg rounded-xl flex flex-col justify-between overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center mb-2">
          {optionName}
        </CardTitle>
        <CardDescription className="text-sm text-center">
          {optionDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex justify-center items-end">
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 group-hover:bg-gray-300 dark:group-hover:bg-gray-600">
          <ArrowRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </div>
      </CardContent>
    </Card>
  );
}
