"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import Image from "next/image";
import Link from "next/link";
import { Gem } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

interface UserAccountProps {
  email: string | null | undefined;
  name: string | null | undefined;
  imageUrl?: string | null | undefined;
  isSubscribed: boolean;
}

export const UserButton = ({
  email,
  name,
  imageUrl,
  isSubscribed,
}: UserAccountProps) => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {imageUrl ? (
            <div className="relative aspect-square h-full w-full">
              <Image
                fill
                src={imageUrl}
                alt="profile picture"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <AvatarFallback className="bg-violet-600">
              <FaUser className="text-white" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="font-medium text-sm text-black">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-zinc-700">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {user && (
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          {isSubscribed ? (
            <Link href="/dashboard/billing">Manage Subscription</Link>
          ) : (
            <Link href="/pricing">
              Upgrade <Gem className="text-violet-600 h-4 w-4 ml-1.5" />
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
