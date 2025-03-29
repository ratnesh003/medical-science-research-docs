"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  content: z
    .string()
    .min(4, {
      message: "Content must be at least 4 characters.",
    })
    .max(5000, {
      message: "Content must not be longer than 5000 characters.",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  folderId: z.string(),
});

const FeedbackForm = ({ folderId }: { folderId: string }) => {
  const { toast } = useToast();
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [otp, setOtp] = useState("");
  const [formFolderId, setformFolderId] = useState(folderId);
  const [email, setEmail] = useState("");
  const [commentData, setCommentData] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        setLoadingFeedbacks(true);
        const response = await fetch(`/api/feedback/${formFolderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const temp = await response.json();
        setFeedbacks(temp.data);
        console.log(temp);
      } catch (error: any) {
        toast({
          title: "Failed",
          description: "can not fetch comments from user",
        });
        console.error(error);
      } finally {
        setLoadingFeedbacks(false);
      }
    }

    fetchFeedbacks();
  }, [processing]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      content: "",
      email: "",
      folderId: formFolderId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setProcessing(true);
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresVerification) {
          setShowOtpPopup(true);
          setEmail(values.email);
          setCommentData(values);
        } else {
          toast({
            title: "Success",
            description: "Comment posted successfully!",
          });
          form.reset();
        }
      } else {
        toast({
          title: "Failed",
          description: data.error || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setProcessing(true);
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpPopup(false);
        await onSubmit(commentData!); // Resend comment after verification
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
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
                <FormItem className="w-1/3">
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
                <FormItem className="w-2/3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
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
                      placeholder="Tell us about your experience"
                      className="resize-none h-44"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit" disabled={processing}>
              Submit
            </Button>
          </div>
        </form>
      </Form>

      {/* OTP Verification Popup */}
      <Dialog open={showOtpPopup} onOpenChange={setShowOtpPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP for Email Verification</DialogTitle>
          </DialogHeader>
          <p>
            A verification code has been sent to {email}. Please enter it below:
          </p>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-2"
          />
          {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
          <Button onClick={handleOtpSubmit} className="mt-4">
            Verify & Submit Comment
          </Button>
        </DialogContent>
      </Dialog>

      <div className="flex gap-4 flex-col mt-4">
        {feedbacks.map((comment: any, idx) => (
          <Card key={idx}>
            <CardContent>
              <CardHeader className="pl-0 pb-2">{comment.username}</CardHeader>
              <CardDescription>{comment.content}</CardDescription>
            </CardContent>
          </Card>
        ))}

        {!feedbacks.length && (
          <Card>
            <CardContent>
              <CardHeader className="pl-0 pb-2">Add comments here</CardHeader>
              <CardDescription>No Comments on this Blog</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default FeedbackForm;
