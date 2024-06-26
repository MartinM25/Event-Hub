"use client";

import React from "react";
import { Button } from "../ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn } from "@clerk/clerk-react";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="w-full">
      {/* Cannot buy past event */}
      {hasEventFinished ? (
        <p className="p-2 text-red-500">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="w-full">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
