import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import CardComponent from "./Card";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  specialPage: boolean;
};

export const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  specialPage,
}: CollectionProps) => {

  const containerClassName = specialPage ? "grid w-full grid-cols-1 md: md:gap-4 lg:grid-cols-3" : "grid w-full grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4"

  return (
    <>
      {data.length > 0 ? (
        <div className="flex">
          <ul className={containerClassName}>
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li
                  key={event._id}
                  className="flex justify-center pb-6 md:pb-0"
                >
                  <CardComponent
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 py-28 bg-secondary">
          <h3 className="tex-2xl md:text-3xl font-bold px-4">{emptyTitle}</h3>
          <p className="text-sm md:text-lg italic">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};
