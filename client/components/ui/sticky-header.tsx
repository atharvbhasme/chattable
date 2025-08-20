"use client";
import { Separator } from "@/components/ui/separator";

export function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl">
          Chattable
        </h1>
      </div>
      <Separator />
    </header>
  );
}