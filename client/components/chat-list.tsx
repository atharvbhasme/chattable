'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChatListItem } from "@/components/chat-list-item";

export function ChatList() {
  const arr = Array.from({ length: 20 }, (_, i) => i);

  return (
    <Accordion
      type="multiple"
      className="max-w-lg my-4 w-full space-y-2"
      defaultValue={["item-1"]}
    >
      <AccordionItem value="item-1" className="border rounded-md">
        <AccordionTrigger className="px-3 py-2">
          Online
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance px-3 pb-3 h-[400px] overflow-y-auto">
          {arr.map((i) => (
            <ChatListItem key={i} />
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border rounded-md">
        <AccordionTrigger className="px-3 py-2">
          Old Messages
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance px-3 pb-3 h-[400px] overflow-y-auto">
          {arr.map((i) => (
            <ChatListItem key={i} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
