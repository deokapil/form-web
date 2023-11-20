"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  registerSchema,
  CATEGORY_CHOICES,
  GENDER_CHOICES,
} from "@/validators/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
4;
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { getCollege, saveRegistration } from "@/app/_actions";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast, useToast } from "@/components/ui/use-toast";
import Education from "./Education";
import CloudinaryUploadForm from "./CloudinaryUploadForm";
import { CldImage } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

type ImageProps = {
  file: File;
  preview: string;
};

const RegistrationForm = () => {
  const [photo, setPhoto] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [college, setCollege] = useState<CollegeType | undefined>();
  const [signature, setSignature] = useState<string | undefined>();
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  type Inputs = z.infer<typeof registerSchema>;
  const form = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      registrationNo: "",
      name: "",
      dateOfBirth: "",
      motherName: "",
      fatherName: "",
      gender: "MALE",
      category: "GEN",
      sub_category: "",
      nationality: "",
      address: "",
      district: "",
      state: "",
      pin: "",
      email: "",
      photo: "",
      signature: "",
      hs_board: "",
      hs_marksheetNo: "",
      hs_obtained: "",
      hs_percentage: "",
      hs_rollNo: "",
      hs_total: "",
      hs_year: "",
      in_board: "",
      in_marksheetNo: "",
      in_obtained: "",
      in_percentage: "",
      in_rollNo: "",
      in_total: "",
      in_year: "",
      gr_board: "",
      gr_marksheetNo: "",
      gr_obtained: "",
      gr_percentage: "",
      gr_rollNo: "",
      gr_total: "",
      gr_year: "",
    },
  });
  // console.log(form.watch());

  useEffect(() => {
    getCollege(params.collegeSlug as string).then((result) => {
      setCollege(result);
    });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    if (!signature || !photo) {
      toast({
        variant: "destructive",
        title: "Signature and Photograph required please upload",
        description: "There was a problem with your request.",
      });
      setLoading(false);
      return;
    } else {
      data.signature = signature;
      data.photo = photo;
    }
    try {
      const cand = await saveRegistration(data, params.collegeSlug as string);
      router.push(`/${params.collegeSlug}/candidate/${cand.id}`);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="flex justify-center">
          {college?.logo && (
            <Image
              src={college.logo}
              height={100}
              width={500}
              alt="Picture of the author"
            />
          )}
        </div>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-sky-100">
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="registrationNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration No</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Personal Details
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Of Birth</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. 12-09-2012" />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mothers Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {GENDER_CHOICES.map((choice) => {
                                return (
                                  <SelectItem
                                    value={choice.value}
                                    key={choice.value}
                                  >
                                    {choice.display}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fathers Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CATEGORY_CHOICES.map((choice) => {
                                return (
                                  <SelectItem
                                    value={choice.value}
                                    key={choice.value}
                                  >
                                    {choice.display}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="sub_category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub Category</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Education Details
                </h6>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  10th or Equivalent
                </h6>
                <div className="flex flex-wrap">
                  <Education prefix="hs" />
                </div>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Intermediate or Equivalent
                </h6>
                <div className="flex flex-wrap">
                  <Education prefix="in" />
                </div>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Graduation
                </h6>
                <div className="flex flex-wrap">
                  <Education prefix="gr" />
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Communication/Correspondence Details
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pin Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Id</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Documents Upload
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Photograph
                    </h6>
                    <div className="flex items-center content-center justify-center">
                      {photo ? (
                        <CldImage
                          width="300"
                          height="400"
                          src={photo}
                          sizes="100vw"
                          alt="Description of my image"
                        />
                      ) : null}
                    </div>
                    <CloudinaryUploadForm setPhoto={setPhoto} />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Signature
                    </h6>
                    <div className="flex items-center content-center justify-center">
                      {signature ? (
                        <CldImage
                          width="300"
                          height="400"
                          src={signature}
                          sizes="100vw"
                          alt="Description of my image"
                        />
                      ) : null}
                    </div>
                    <CloudinaryUploadForm setPhoto={setSignature} />
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Decleration
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4"></div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormField
                      control={form.control}
                      name="printDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Print Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="flex flex-wrap">
                  {loading ? (
                    <Loader2 />
                  ) : (
                    <Button type="submit">Submit</Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegistrationForm;
