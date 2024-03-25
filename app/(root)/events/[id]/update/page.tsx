import EventForm from '@/components/shared/EventForm'
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
      <section className="py-5 md:py-10">
        <h3 className="wrapper h3-bold text-left md:text-center">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm 
          userId={userId} 
          type="Update"
          event={event}
          eventId={event._id} 
        />
      </div>
    </>  
  )
}

export default UpdateEvent