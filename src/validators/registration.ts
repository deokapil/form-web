import { parse, isValid } from "date-fns";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(255),
  dateOfBirth: z
    .string()
    .refine((val) => isValid(parse(val, "dd-MM-yyyy", new Date())), {
      message: "Correct format is dd-mm-yyyy e.g. 03-05-2011",
    }),
  motherName: z.string(),
  fatherName: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
  category: z.enum(["GEN", "OBC", "SC", "ST", "MIN"]),
  sub_category: z.string(),
  nationality: z.string(),
  address: z.string(),
  district: z.string(),
  state: z.string(),
  pin: z.string(),
  email: z.string().email(),
  // registrationMode: z.string().optional(),
  // transaction_id: z.string().optional(),
  // amount: z
  //   .string()
  //   .refine((val) => !Number.isNaN(parseInt(val, 10)), {
  //     message: "Expected number, received a string",
  //   })
  //   .optional(),
  // txnDate: z.date().optional(),
  photo: z.string().optional(),
  signature: z.string().optional(),

  printDate: z
    .string()
    .refine((val) => isValid(parse(val, "dd-MM-yyyy", new Date())), {
      message: "Correct format is dd-mm-yyyy e.g. 03-05-2011",
    }),
  // printDate: z.date({
  //   required_error: "A print date is required.",
  // }),

  // submissionDate: z.date({
  //   required_error: "A submission date is required.",
  // }),
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
  hs_percentage: z.string().refine((val) => checkPercent(val), {
    message: "Value should be of decimal type 2 decimal places e.g. 80.45",
  }),
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
  in_percentage: z.string().refine((val) => checkPercent(val), {
    message: "Value should be of decimal type 2 decimal places e.g. 80.45",
  }),

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
  gr_percentage: z.string().refine((val) => checkPercent(val), {
    message: "Value should be of decimal type 2 decimal places e.g. 80.45",
  }),
});

const checkPercent = (val: string) => {
  const strVal = parseFloat(val);
  const valsplit = val.split(".");
  let test = true;
  if (!val.match("^[0-9]*\\.?[0-9]*$")) {
    return false;
  }
  if (val.split(".").length > 1 && val.split(".")[1].length > 2) {
    test = false;
  }
  return !Number.isNaN(strVal) && strVal < 100 && test;
};

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
  { value: "MIN", display: "MINORITY" },
];
