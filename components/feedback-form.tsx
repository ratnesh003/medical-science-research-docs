"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  content: z
    .string()
    .min(10, {
      message: "content must be at least 10 characters.",
    })
    .max(5000000, {
      message: "content must not be longer than 5000000 characters.",
    }),
  email: z.string({
    required_error : "The Email is required for the comment"
  }).email()
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
  const { username, content } = values;
  console.log(username);
  console.log(content);
};

const FeedbackForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      content: "",
      email: ""
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-10"
      >
        <div className="flex items-center w-full gap-4 grow">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem
                className="w-1/3"
              >
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem
                className="w-2/3"
              >
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about how it felt"
                    className="resize-none h-44"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default FeedbackForm;
