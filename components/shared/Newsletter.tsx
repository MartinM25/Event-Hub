"use client"

import React, { useState, useEffect } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
})

const Newsletter = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);

    setShowSuccess(true);
    // Clear input field
    form.reset({ email: ""})
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showSuccess) {
      timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          setShowSuccess(false);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess, countdown]);

  const handleOkClick = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <section classname={`flex flex-row gap-x-4 justify-center md:justify-start ${showSuccess ? 'hidden' : ''}`}>
        <div className='w-full '>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='w-full pr-6'>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Subscribe"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
      
      {/* success div */}
      {showSuccess && (
        <section className="w-full my-4 border-2 border-primary rounded-md p-4">
          <p className="font-semibold">Thank you for Subscribing!</p>
          <div className="flex flex-row justify-between items-center">
            <small>Look for us in your inbox.</small>
            <Button onClick={handleOkClick} variant="outline" className="bg-secondary hover:bg-white hover:border-primary">
              {`Ok (${countdown})`}
            </Button>
          </div>
        </section>
      )}
    </>
  )
}    

export default Newsletter