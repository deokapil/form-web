import { db } from "@/db";
import { candidates, colleges } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCollegeList = async () => {
  const collegeList = await db.query.colleges.findMany();
  return collegeList;
};

export const getCollegeBySlug = async (slug: string) => {
  console.log(slug);
  const collegeList = await db
    .select()
    .from(colleges)
    .where(eq(colleges.slug, slug));
  console.log(collegeList);
  return collegeList[0];
};

export const getCandidatesByCollege = async (collegeSlug: string) => {
  const college = await db.query.colleges.findFirst({
    where: eq(colleges.slug, collegeSlug),
  });
  if (college) {
    const candList = await db.query.candidates.findMany({
      where: eq(candidates.collegeId, college.id),
    });
    return candList;
  }
  return [];
};
