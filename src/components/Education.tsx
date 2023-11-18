"use client";
import React from "react";
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
import { useFormContext } from "react-hook-form";

type Props = {
  prefix: string;
};

const Education = ({ prefix }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 px-4">
        <FormField
          control={control}
          name={`${prefix}_board`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board/University</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <FormField
          control={control}
          name={`${prefix}_year`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full lg:w-3/12 px-4">
        <FormField
          control={control}
          name={`${prefix}_marksheetNo`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marsheet No</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full lg:w-3/12 px-4">
        <FormField
          control={control}
          name={`${prefix}_rollNo`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roll No</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full lg:w-2/12 px-4">
        <FormField
          control={control}
          name={`${prefix}_total`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Marks</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full lg:w-2/12 px-4">
        <FormField
          control={control}
          name={`${prefix}_obtained`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Obtained</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full lg:w-2/12 px-4">
        <FormField
          control={control}
          name={`${prefix}_percentage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage</FormLabel>
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
  );
};

export default Education;
