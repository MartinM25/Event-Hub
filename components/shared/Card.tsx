import React from 'react'
import Link from 'next/link'

import { auth } from '@clerk/nextjs'
import { Separator } from '../ui/separator'
import { formatDateTime } from '@/lib/utils'
import { DeleteConfirmation } from './DeleteConfirmation'
import { IEvent } from '@/lib/database/models/event.model'
import { ArrowUpRight, SquarePen, PenLine  } from 'lucide-react'

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
    <div className='group relative flex h-[330px] max-w-[380px] w-full flex-col overflow-hidden transition-all'>
      
        <Link 
          href={`/events/${event._id}`}
          style={{backgroundImage: `url(${event.imageUrl})`}}
          className='flex-center flex-grow bg-secondary bg-cover bg-center text-secondary'
        />
        {isEventCreator && !hidePrice && (
          <div className='absolute right-2 top-2 flex flex-col gap-2 '>
            
            <Link href={`/events/${event._id}/update`} className='justify-between items-center bg-white dark:bg-secondary p-2 rounded-full'>
              <SquarePen className='h-4 w-4'/>
            </Link>
            
            <DeleteConfirmation eventId={event._id} />
        
          </div>        
        )}

      <div className='flex h-[150px] border flex-col gap-2 p-5 md:gap-3'>
        
        {!hidePrice && 
          <div className='flex gap-2 items-center'>
            <span className='p-semibold-14 text-sm text-secondary-foreground w-min'>
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <Separator orientation='vertical' className='h-4'/>
            <p className='text-sm p-semibold-14 text-secondary-foreground'>
              {event.category.name}
            </p>
          </div> 
        }

        <Link href={`/events/${event._id}`}>
          <p className='line-clamp-1 flex-1'>
            {event.title}
          </p>
        </Link>

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
     
      </div>
    </div>
  )  
}

export default CardComponent