"use client"

import * as z from "zod"
import Dropdown from "@/components/shared/Dropdown"

import { MapPin, CalendarDays, DollarSign, Link, Loader2 } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { eventDefaultValues } from "@/constants"
import { eventFormSchema } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FileUpload } from "./FileUpload"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"

type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter();
  const initialValues = event && type === "Update" 
    ? {
        ...event,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime)
      } 
    : eventDefaultValues;
  const { startUpload } = useUploadThing('imageUploader')

   // 1. Define your form.
   const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!eventId) {
        router.back()
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Event Title" className="" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormDescription>
                  Select a category for your event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl className="h-[239px]">
                  <Textarea placeholder="Decription" className="" {...field} />
                </FormControl>
                <FormDescription>
                  This is the description of the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl className="border h-[239px]">
                  <FileUpload 
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormDescription>
                  Upload the image for the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="flex-center border focus-within:border-primary rounded-lg">
                    <MapPin className="ml-2 h-5 w-5" />
                    <Input placeholder="Location or Online" className="border-none" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Where will the event be?.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <div className="flex-center py-2 border text-sm rounded-lg">
                    <CalendarDays className="ml-2 h-5 w-5" />
                    <DatePicker 
                      selected={field.value} 
                      onChange={(date: Date) => field.onChange(date)} 
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd MMMM YYYY, h:mm a"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  When will the event start?.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <div className="flex-center py-2 border text-sm rounded-lg">
                    <CalendarDays className="ml-2 h-5 w-5" />
                    <DatePicker 
                      selected={field.value} 
                      onChange={(date: Date) => field.onChange(date)} 
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd MMMM YYYY, h:mm a"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  When will the event end?.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="flex-center border rounded-lg">
                    <DollarSign className="ml-2 h-5 w-5" />
                    <Input type="number" placeholder="Event price" className="input-field" {...field} />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Free Ticket
                              </label>
                              <Checkbox 
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree" 
                                className="mr-2 h-4 w-4" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  The cost of the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event link</FormLabel>
                <FormControl>
                  <div className="flex-center border rounded-lg">
                    <Link className="ml-2 h-4 w-4" />
                    <Input placeholder="Url" className="input-field" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  This is the link to the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit" 
          className="md:w-[75%] md:mx-auto col-span-2"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ): `${type} Event`}
        </Button>
      </form>

    </Form>
  )
}
// 71717A
export default EventForm