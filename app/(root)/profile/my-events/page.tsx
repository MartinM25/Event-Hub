"use server"

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { auth } from '@clerk/nextjs';
import { SearchParamProps } from '@/types';
import Link from 'next/link';
import { getEventsByUser } from '@/lib/actions/event.actions'
import { Collection } from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';

const MyEvents = async ({ searchParams }: SearchParamProps) => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between">  
        <div>
          <h3 className="text-lg font-medium">Events</h3>
          <p className="text-sm text-muted-foreground">
          These are the events that I have organized.
          </p>
        </div>
        <Button variant="ghost" asChild size="lg">
          <Link href="/events/create">
            Create Event
          </Link>
        </Button>
      </div>
      <Separator />
      <section className=''>
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
          specialPage={true}
        />
      </section>
  </div>
  )
}

export default MyEvents