import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Home() {
  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6
  });

  return (
    <>
      <section className=" bg-dotted-pattern bg-contain py-5 md-py-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex md:pl-20 xl:pl-10 pl-10 flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <Button size="lg" asChild className="rounded-lg h-[54px] p-regular-16 dark:text-white w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image 
            src="/assets/images/picturee.png"
            alt="hero image"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-right 2xl:max-h[50vh] justify-end"
          />
        </div>
      </section>
     
      <section id="events" className="flex flex-col px-10 md:px-20 py-8" >
        <h2 className="h2-bold">Trust by <br /> Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CategoryFilter
        </div>

        <Collection 
          data={events?.data}
          page={1}
          limit={6}
          totalPages={2}
          collectionType="All_Events"
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"       
        />
      </section>
    </>
  );
}
