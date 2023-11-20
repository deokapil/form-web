import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  integer,
  varchar,
  date,
  serial,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";

export const colleges = pgTable("colleges", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  logo: text("image"),
  slug: text("slug"),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  collegeId: integer("college_id").references(() => colleges.id),
});

export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHERS"]);
export const categoryEnum = pgEnum("category", [
  "GEN",
  "OBC",
  "SC",
  "ST",
  "MIN",
]);

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  qualification: text("qualification"),
  board: text("board"),
  year: integer("year"),
  marksheetNumber: text("marksheet_no"),
  rollNo: text("roll_no"),
  total: integer("total"),
  obtained: integer("obtained"),
  percentage: numeric("percentage", {
    precision: 4,
    scale: 2,
  }),
});

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  registrationNo: text("reg_no").notNull(),
  name: text("name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  motherName: text("mother_name").notNull(),
  fatherName: text("father_name").notNull(),
  gender: genderEnum("gender").notNull(),
  category: categoryEnum("category").notNull(),
  sub_category: text("sub_category"),
  nationality: text("nationality").notNull().default("Indian"),
  highSchool: integer("highschool_id").references(() => education.id),
  intermediate: integer("intermediate_id").references(() => education.id),
  graduation: integer("graduation_id").references(() => education.id),
  address: text("address"),
  district: text("district"),
  state: text("state"),
  pin: text("pin"),
  email: text("email"),
  registrationMode: text("registration_mode"),
  transaction_id: text("txn_id"),
  amount: integer("amount"),
  txnDate: date("txn_date"),
  photo: text("photo"),
  signature: text("signature"),
  submissionDate: date("submission_date"),
  printDate: date("print_date"),
  ac_num: text("accoutn_no"),
  collegeId: integer("college_id").references(() => colleges.id),
  fileUrl: text("file_url"),
});

export const collegeRelations = relations(colleges, ({ many }) => ({
  users: many(users),
  registrations: many(candidates),
}));

export const postsRelations = relations(candidates, ({ one }) => ({
  college: one(colleges, {
    fields: [candidates.collegeId],
    references: [colleges.id],
  }),
}));

export const userRelations = relations(users, ({ one }) => ({
  college: one(colleges, {
    fields: [users.collegeId],
    references: [colleges.id],
  }),
}));
