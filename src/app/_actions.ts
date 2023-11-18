"use server";
import { z } from "zod";
import { registerSchema } from "@/validators/registration";

import { v2 as cloudinary } from "cloudinary";

import { db } from "@/db";
import { candidates, education } from "@/db/schema";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { generate } from "@/lib/pdf";
import { getCollegeBySlug } from "@/lib/qs";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME as string,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  let signature = null;
  if (cloudinaryConfig.api_secret) {
    signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "next" },
      cloudinaryConfig.api_secret
    );
  }
  return { timestamp, signature };
}

type Inputs = z.infer<typeof registerSchema>;

export async function saveRegistration(
  data: Inputs,
  collegeSlug: string
): Promise<CandRet> {
  const {
    hs_board,
    hs_marksheetNo,
    hs_obtained,
    hs_percentage,
    hs_rollNo,
    hs_total,
    hs_year,
    in_board,
    in_marksheetNo,
    in_obtained,
    in_percentage,
    in_rollNo,
    in_total,
    in_year,
    gr_board,
    gr_marksheetNo,
    gr_obtained,
    gr_percentage,
    gr_rollNo,
    gr_total,
    gr_year,
    ...rest
  } = data;
  const insertEduSchema = createInsertSchema(education);
  const hs_edu = insertEduSchema.parse({
    qualification: "High School or Equivalent",
    board: hs_board,
    marksheetNumber: hs_marksheetNo,
    obtained: parseInt(hs_obtained),
    percentage: hs_percentage,
    rollNo: hs_rollNo,
    total: parseInt(hs_total),
    year: parseInt(hs_year),
  });
  const hs_id = await db
    .insert(education)
    .values(hs_edu)
    .returning({ highSchool: education.id });

  const in_edu = insertEduSchema.parse({
    qualification: "Intermediate or Equivalent",
    board: hs_board,
    marksheetNumber: hs_marksheetNo,
    obtained: parseInt(hs_obtained),
    percentage: hs_percentage,
    rollNo: hs_rollNo,
    total: parseInt(hs_total),
    year: parseInt(hs_year),
  });
  const in_id = await db
    .insert(education)
    .values(hs_edu)
    .returning({ intermediate: education.id });

  const gr_edu = insertEduSchema.parse({
    qualification: "High School or Equivalent",
    board: hs_board,
    marksheetNumber: hs_marksheetNo,
    obtained: parseInt(hs_obtained),
    percentage: hs_percentage,
    rollNo: hs_rollNo,
    total: parseInt(hs_total),
    year: parseInt(hs_year),
  });
  const gr_id = await db
    .insert(education)
    .values(hs_edu)
    .returning({ graduation: education.id });

  // save all other data

  const insertUserSchema = createInsertSchema(candidates);
  // convert all dated to string
  const { dateOfBirth, txnDate, printDate, submissionDate, amount, ...rest1 } =
    rest;

  const college = await getCollegeBySlug(collegeSlug);
  const cand = insertUserSchema.parse({
    dateOfBirth: format(dateOfBirth, "dd-MM-yyyy"),
    txnDate: txnDate ? format(txnDate, "dd-MM-yyyy") : null,
    printDate: format(printDate, "dd-MM-yyyy"),
    submissionDate: format(submissionDate, "dd-MM-yyyy"),
    amount: amount ? parseInt(amount) : 0,
    collegeId: college.id,
    ...rest1,
    ...hs_id[0],
    ...in_id[0],
    ...gr_id[0],
  });
  const cand_id = await db
    .insert(candidates)
    .values(cand)
    .returning({ id: candidates.id });
  return cand_id[0];
}

export async function generatePDF(candId: string) {
  await generate(parseInt(candId));
}
