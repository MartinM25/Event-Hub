import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { CalendarClock, MapPin, UserRound   } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const desiredWidth = 650; // Set your desired width here
  const originalWidth = 700; // Set the original width of your image
  const originalHeight = 500; // Set the original height of your image

  // Calculate the height to maintain aspect ratio
  const desiredHeight = Math.round(
    (originalHeight / originalWidth) * desiredWidth
  );

  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center w-full md:px-20">
        <div className="">
          <div className="rounded-lg md:mt-4 justify-center bg-secondary">
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={desiredWidth}
              height={desiredHeight}
              className="object-cover mx-auto object-center"
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row w-full py-6">
            <div className="w-full lg:w-[70%] lg:pr-4">
              <div className="rounded ml-4 lg:ml-0 lg:mb-4 items-center text-sm text-primary font-bold bg-green-500/10 px-2 py-1 inline-block">
                <p className="">{event.category.name}</p> 
              </div>
              <h2 className="text-4xl font-bold capitalize lg:pb-4 mx-auto p-4 lg:p-0">
                {event.title}
              </h2>
              <p className="text-sm lg:pb-4 mx-auto p-4 lg:p-0">
                {event.description}
              </p>
              <div className="flex gap-8 flex-row items-center bg-secondary rounded-lg h-16 p-4 my-2 mx-4 lg:mx-0">
               <UserRound className="h-8 w-8" />
               <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  By{" "}{" "}
                  <span className="font-bold">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p> 
              </div>
              <div className="flex flex-col lg:py-4 mx-auto p-4 lg:p-0">
                <h3 className="text-2xl font-bold">Date & Time</h3>
                <div className="flex py-3 items-center">
                  <CalendarClock className="h-5 w-5" />
                  <div className="flex flex-wrap items-center px-4 text-sm">
                    <p>
                      {formatDateTime(event.startDateTime).dateAndTime},{" "}
                      {formatDateTime(event.startDateTime).timeOnly}{" "}
                    </p>
                    {" - "}
                    {formatDateTime(event.startDateTime).dateAndTime ===
                    formatDateTime(event.endDateTime).dateAndTime ? (
                      <>
                        <p>{formatDateTime(event.endDateTime).timeOnly}</p>
                      </>
                    ) : (
                      <p>
                        - {formatDateTime(event.endDateTime).dateAndTime},{" "}
                        {formatDateTime(event.endDateTime).timeOnly}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:pb-4 mx-auto p-4 lg:p-0">
                <h3 className="text-2xl font-bold">Location</h3>
                <div className="flex py-3 items-center">
                  <MapPin className="h-6 w-6" />
                  <p className="px-4 text-sm">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-full lg:w-[30%]">
              <div className="w-full border lg:sticky lg:top-6 z-10 p-4 gap-4 rounded-lg h-[140px] items-center">
                <p className="text-primary text-center font-bold text-lg">
                  {event.isFree ? "FREE" : `$${event.price}`}
                </p>
                <CheckoutButton event={event} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS WITH THE SAME CATEGORY */}
      <section className="w-full px-4 md:px-20 my-8 flex flex-col gap-8 md:gap-12 border-t">
        <h2 className="font-bold text-4xl pt-4">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>

      {/*STICKY PRICE ELEMENT THAT ONLY SHOWS ON SMALL DEVICES  */}
      <section>
        <div className="lg:hidden w-full border-t fixed bottom-0 z-10 bg-background">
          <div className="p-4 gap-4 h-[100px]">
            <p className="text-primary text-center font-bold text-lg">
              {event.isFree ? "FREE" : `$${event.price}`}
            </p>
            <CheckoutButton event={event} />
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetails;
