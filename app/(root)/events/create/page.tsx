import EventForm from '@/components/shared/EventForm'
import { Separator } from '@/components/ui/separator';
import { auth } from '@clerk/nextjs';

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  console.log(userId);

  return (
    <>
      <div className="space-y-6 py-5 md:py-10 w-full px-8 lg:px-20 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">
            Create an Event.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col">
          <EventForm userId={userId} type="Create" />
        </div>
      </div> 
    </>  
  )
}

export default CreateEvent