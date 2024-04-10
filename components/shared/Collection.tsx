import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import CardComponent from './Card'

type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events",
  specialPage: boolean
}

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  specialPage
}: CollectionProps) => {

  const getColumnClass = () => {
    if (specialPage === true) {
      return 'grid-cols-3'
    } else {
      return 'grid-cols-4'
    }
  }

  return (
    <>
      {data.length > 0 ? (
        <div className='flex flex-col items-center'>
          <ul className={`grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:${getColumnClass()} xl:gap-10 `}>
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className='flex justify-center'>
                  <CardComponent 
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice} 
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ): (
        <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 py-28 bg-secondary'>
          <h3 className='text-3xl font-bold'>{emptyTitle}</h3>
          <p className='text-sm md:text-lg italic'>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default Collection