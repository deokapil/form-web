import { db } from "@/db";
import { candidates, colleges, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCollegeList = async () => {
  const collegeList = await db.query.colleges.findMany();
  return collegeList;
};

export const getCollegeListByAdmin = async (
  adminEmail: string | undefined | null
) => {
  if (!adminEmail) {
    return [];
  }
  const user = await db.query.users.findFirst({
    where: eq(users.email, adminEmail),
  });
  if (!user?.collegeId) {
    return [];
  }
  const collegeList = await db.query.colleges.findMany({
    where: eq(colleges.id, user?.collegeId),
  });
  return collegeList;
};
export const getCollegeBySlug = async (slug: string) => {
  const collegeList = await db
    .select()
    .from(colleges)
    .where(eq(colleges.slug, slug));
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
