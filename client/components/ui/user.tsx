"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as React from "react";

function User() {
  return (
    <Avatar>
      <AvatarImage src="https://ui-avatars.com/api/?name=Chat&background=random" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export { User }