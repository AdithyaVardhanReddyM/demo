"use client";

import React, { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import mockResumeData from "@/db/mockdata";
import { Textarea } from "./ui/textarea";
import { educationSchema } from "@/lib/schemas/educationSchema";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { getEducationDescription } from "@/lib/getEduDes";
import { upsertEducationDetails } from "@/lib/actions/eduAction";
import { useAuth } from "@clerk/nextjs";

type Props = {};

const EducationForm = (props: Props) => {
  const { userId } = useAuth();
  const [info, setInfo] = useState<string>("");
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: mockResumeData.education,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  async function onSubmit(values: z.infer<typeof educationSchema>) {
    if (!userId) {
      return;
    }
    try {
      const result = await upsertEducationDetails(userId, values);

      if (result.success) {
        console.log("Education details saved successfully:", result.data);
      }
    } catch (err) {
      console.error("Error saving Education details:", err);
    }
  }

  return (
    <div className="bg-orange-100 shadow-lg rounded-xl p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 ">
              <h3>Education {index + 1}</h3>
              <FormField
                control={form.control}
                name={`education.${index}.institutionName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.educationType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Description</FormLabel>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size={"sm"} variant={"outline"}>
                            <Sparkles className="mr-1" color="orange" />
                            Generate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>AI Generate</DialogTitle>
                            <DialogDescription>
                              Provide additional information to our AI to
                              generate curated and professional description for
                              you.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col gap-4">
                            <label htmlFor="info">Additional Information</label>
                            <Input
                              id="info"
                              name="info"
                              onChange={(e) => {
                                e.preventDefault;
                                setInfo(e.target.value);
                              }}
                            />
                            <Button
                              size={"sm"}
                              variant={"outline"}
                              type="submit"
                              onClick={async () => {
                                const des = await getEducationDescription({
                                  data: info,
                                });
                                console.log(des);
                                field.onChange(des);
                              }}
                            >
                              <Sparkles className="mr-1" color="orange" />
                              Generate
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Delete Education
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() =>
                append({
                  institutionName: "",
                  educationType: "",
                  startDate: new Date(),
                  description: "",
                })
              }
            >
              Add Education
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;
