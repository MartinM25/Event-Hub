import EventForm from '@/components/shared/EventForm'
import { Separator } from '@/components/ui/separator';
import { getEventById } from '@/lib/actions/event.actions';
import { UpdateEventParams } from '@/types';
import { auth } from '@clerk/nextjs';

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id }}: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id)

  return (
    <>
      <section className="space-y-6 py-5 md:py-10 w-full px-8 lg:px-20 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Event</h2>
          <p className="text-muted-foreground">
            Update your Event.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="my-6">
          <EventForm 
            userId={userId} 
            type="Update"
            event={event}
            eventId={event._id} 
          />
        </div>
      </section>
    </>  
  )
}

export default UpdateEvent