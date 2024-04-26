import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Collection } from '@/components/shared/Collection'
import { SearchParamProps } from '@/types'
import Link from 'next/link'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { auth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Profile = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage})
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  return (
  <div className="space-y-6 w-full">
    <div className="flex flex-row justify-between">  
      <div>
        <h3 className="text-lg font-medium">Tickets</h3>
        <p className="text-sm text-muted-foreground">
          These are the events that I have bought.
        </p>
      </div>
      <Button variant="ghost" asChild size="lg">
        <Link href="/#events">
          Explore Events
        </Link>
      </Button>
    </div>
    <Separator />
    <section className='justify-start'>
      <Collection 
        data={orderedEvents}
        emptyTitle="No event tickets purchased yet"
        emptyStateSubtext="No worries - plenty of exciting events to explore!"
        collectionType="My_Tickets"
        limit={3}
        page={ordersPage}
        urlParamName="ordersPage"
        totalPages={orders?.totalPages}
        specialPage={true}
      />
    </section>
  </div>
  )
}

export default Profile
