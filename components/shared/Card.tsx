import { IEvent } from '@/lib/database/models/event.model'
import { ArrowUpRight, SquarePen, PenLine  } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Separator } from '../ui/separator'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DeleteConfirmation } from './DeleteConfirmation'

type CardComponentProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const CardComponent = ({ event, hasOrderLink, hidePrice}: CardComponentProps) => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className='group relative flex min-h-[380px] w-full flex-col overflow-hidden border transition-all hover:shadow-lg md:min-h-[438px]'>
      <Link 
        href={`/events/${event.id}`}
        style={{backgroundImage: `url(${event.imageUrl})`}}
        className='flex-center flex-grow bg-secondary bg-cover bg-center text-secondary'
      />

      {/* IS EVENT CREATOR */}
      {isEventCreator && !hidePrice && (
        // <div className='absolute right-2 top-2 flex flex-col gap-3 rounded-xl bg-secondary p-2 shadow-sm transition-all hover:contrast-50'>
        //   <Link href={`/events/${event._id}/update`}>
        //     <SquarePen className='h-4 w-4'/>
        //   </Link>
        //   <DeleteConfirmation eventId={event._id} />
        // </div>
        <div className='absolute right-2 top-2 flex flex-col rounded-xl bg-secondary p-2 shadow-sm transition-all hover:contrast-50'>
        <Popover>
          <PopoverTrigger>
            <PenLine className='h-4 w-4'/>
          </PopoverTrigger>
          <PopoverContent className='w-[160px] '>
            <Link href={`/events/${event._id}/update`} className='flex text-sm hover:bg-secondary rounded px-2 py-1 items-center'>
              <SquarePen className='h-4 w-4 mr-2'/>
              <p>Update</p>
            </Link>
            <DeleteConfirmation eventId={event._id} />
            </PopoverContent>
        </Popover>
        </div>
      )}

      <Link
        href={`/events/${event.id}`}
        className='flex min-h-[130px] flex-col gap-2 p-5 md:gap-3'
      >
        {!hidePrice && <div className='flex gap-2 items-center'>
          <span className='p-semibold-14 text-sm text-secondary-foreground w-min'>
            {event.isFree ? "FREE" : `$${event.price}`}
          </span>
          <Separator orientation='vertical' className='h-4'/>
          <p className='text-sm p-semibold-14 text-secondary-foreground'>
            {event.category.name}
          </p>
        </div> }

        <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1'>
          {event.title}
        </p>

        <div className='flex-between w-full'>
          <p className='text-sm text-[#B3B3B3]'>
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className='flex gap-2'>
              <p className='text-primary'>Order Details</p>
              <ArrowUpRight className='h-5 w-5'/>
            </Link>
          )}
        </div>

        <div className='flex justify-between font-medium text-secondary-foreground text-xs'>
          <p className=''>
            {formatDateTime(event.startDateTime).dateAndTime}
          </p>
          <p className=''>
            {formatDateTime(event.startDateTime).timeOnly}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default CardComponent