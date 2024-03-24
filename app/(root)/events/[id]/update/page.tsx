import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs';

const UpdateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="py-5 md:py-10">
        <h3 className="wrapper h3-bold text-left md:text-center">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Update" />
      </div>
    </>  
  )
}

export default UpdateEvent