"use server";
import { z } from "zod";
import { registerSchema } from "@/validators/registration";

import { v2 as cloudinary } from "cloudinary";

import { db } from "@/db";
import { candidates, education } from "@/db/schema";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { format, parse } from "date-fns";
import { eq, sql } from "drizzle-orm";
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
    board: in_board,
    marksheetNumber: in_marksheetNo,
    obtained: parseInt(in_obtained),
    percentage: in_percentage,
    rollNo: in_rollNo,
    total: parseInt(in_total),
    year: parseInt(in_year),
  });
  const in_id = await db
    .insert(education)
    .values(in_edu)
    .returning({ intermediate: education.id });

  const gr_edu = insertEduSchema.parse({
    qualification: "Graduation",
    board: gr_board,
    marksheetNumber: gr_marksheetNo,
    obtained: parseInt(gr_obtained),
    percentage: gr_percentage,
    rollNo: gr_rollNo,
    total: parseInt(gr_total),
    year: parseInt(gr_year),
  });
  const gr_id = await db
    .insert(education)
    .values(gr_edu)
    .returning({ graduation: education.id });

  // save all other data

  const insertUserSchema = createInsertSchema(candidates);
  // convert all dated to string
  const { dateOfBirth, printDate, ...rest1 } = rest;

  const dob = parse(dateOfBirth, "dd-MM-yyyy", new Date());
  const college = await getCollegeBySlug(collegeSlug);
  const regNo = await getRegistrationNo(college);

  const dateFormat = process.env.DB_DATE_STYLE;
  const cand = insertUserSchema.parse({
    registrationNo: regNo,
    printDate: format(printDate, "MM-dd-yyyy"),
    dateOfBirth: format(dob, "MM-dd-yyyy"),
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
  const link = await generate(parseInt(candId));
  return link;
}

export async function getCollege(slug: string) {
  const college = await getCollegeBySlug(slug);
  return college;
}

export async function getRegistrationNo(college: CollegeType) {
  let bcount = 0;
  const count = await db
    .select({
      count: sql<number>`cast(count(${candidates.id}) as int)`,
    })
    .from(candidates)
    .where(eq(candidates.collegeId, college.id));
  if (count.length > 0) {
    bcount = count[0].count;
  }
  const regNo = `${college.slug?.toUpperCase()}${bcount
    .toString()
    .padStart(3, "0")}`;
  return regNo;
}
