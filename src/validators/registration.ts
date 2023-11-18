import { z } from "zod";

export const registerSchema = z.object({
  registrationNo: z.string(),
  name: z.string().min(2).max(255),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  motherName: z.string(),
  fatherName: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
  category: z.enum(["GEN", "OBC", "SC", "ST"]),
  sub_category: z.string(),
  nationality: z.string(),
  address: z.string(),
  district: z.string(),
  state: z.string(),
  pin: z.string(),
  email: z.string().email(),
  registrationMode: z.string().optional(),
  transaction_id: z.string().optional(),
  amount: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  txnDate: z.date().optional(),
  photo: z.string().optional(),
  signature: z.string().optional(),

  printDate: z.date({
    required_error: "A print date is required.",
  }),

  submissionDate: z.date({
    required_error: "A submission date is required.",
  }),
  hs_board: z.string().optional(),
  hs_year: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  hs_marksheetNo: z.string().optional(),
  hs_rollNo: z.string().optional(),
  hs_total: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  hs_obtained: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  hs_percentage: z.string(),
  in_board: z.string().optional(),
  in_year: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  in_marksheetNo: z.string().optional(),
  in_rollNo: z.string().optional(),
  in_total: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  in_obtained: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  in_percentage: z.string(),

  gr_board: z.string().optional(),
  gr_year: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  gr_marksheetNo: z.string().optional(),
  gr_rollNo: z.string().optional(),
  gr_total: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  gr_obtained: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please check the value should be Integer",
  }),
  gr_percentage: z.string(),
});

export const GENDER_CHOICES = [
  { value: "MALE", display: "Male" },
  { value: "FEMALE", display: "Female" },
  { value: "OTHERS", display: "Others" },
];

export const CATEGORY_CHOICES = [
  { value: "GEN", display: "GENERAL" },
  { value: "OBC", display: "OTHER BACKWARD CLASS" },
  { value: "SC", display: "SCHEDULED CASTE" },
  { value: "ST", display: "SCHEDULED TRIBE" },
];