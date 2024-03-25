import { getEventById } from '@/lib/actions/event.actions'
import { SearchParamProps } from '@/types'
import { formatDateTime } from '@/lib/utils'
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin  } from 'lucide-react';


import Image from 'next/image'
import React from 'react'

const EventDetails = async ({ params: { id }}: SearchParamProps) => {
  const event = await getEventById(id)
  
  return (
    <section className='flex justify-center'>
      <div className="">
        <Image 
          src={event.imageUrl}
          alt="hero image"
          width={2000}
          height={1000}
          className="h-[400px] min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className='flex flex-col lg:flex-row gap-5 justify-between'>
            <div className="flex flex-col gap-6 md:w-[60%] w-full">
              <h2 className='h2-bold'>{event.title}</h2>
              <div className="flex flex-row gap-3">
                <p className=" ml-2">
                  by{' '}
                  <span className="text-primary">{event.organizer.firstName} {event.organizer.lastName}</span>
                </p>
                <Separator orientation="vertical" className="h-6" />
                <p className="truncate cursor-pointer hover:underline">{event.url}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="p-bold-20 text-grey-600">About</p>
                <Separator className='my-4' />
                <p className="p-medium-16 lg:p-regular-18">{event.description}</p> 
              </div>
            </div>
            <div className='w-[495px]'>
              <Card className=''>
                <CardHeader>
                  <CardTitle className='flex flex-row mb-4 items-center'>
                    <p className='text-sm pr-2 text-[#A5A5AA]'>Price: </p>
                    <p className="p-bold-20 text-green-700">
                      {event.isFree ? 'FREE' : `$${event.price}`}
                    </p>
                  </CardTitle>
                  <CardDescription>
                    <Separator />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex gap-2 md:gap-2 items-center text-sm pb-6'>
                    <CalendarDays className='h-6.4 w-6.4'/>
                    <div className="flex flex-row items-center gap-2">
                      <p className=''>
                        {formatDateTime(event.startDateTime).dateOnly}{' '}
                        {formatDateTime(event.startDateTime).timeOnly}
                      </p>
                        {'-'}
                      <p className=''>
                        {formatDateTime(event.endDateTime).dateOnly}{' '}
                        {formatDateTime(event.endDateTime).timeOnly}
                      </p>
                    </div>
                  </div>
                  <div className=" flex items-center gap-2 text-sm">
                    <MapPin className='w-6 h-6' />
                    <p className="">{event.location}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className='w-full'>Buy Ticket</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          {/* <CheckoutButton event={event} /> */}
        </div>
      </div>
    </section>
  )
}

export default EventDetails