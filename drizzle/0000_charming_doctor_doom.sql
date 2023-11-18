DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('GEN', 'OBC', 'SC', 'ST');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('MALE', 'FEMALE', 'OTHERS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"reg_no" text NOT NULL,
	"name" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"mother_name" text NOT NULL,
	"father_name" text NOT NULL,
	"gender" "gender" NOT NULL,
	"category" "category" NOT NULL,
	"sub_category" text,
	"nationality" text DEFAULT 'Indian' NOT NULL,
	"highschool_id" integer,
	"intermediate_id" integer,
	"graduation_id" integer,
	"address" text,
	"district" text,
	"state" text,
	"pin" text,
	"email" text,
	"registration_mode" text,
	"txn_id" text,
	"amount" integer,
	"txn_date" date,
	"photo" text,
	"signature" text,
	"submission_date" date,
	"print_date" date,
	"accoutn_no" text,
	"college_id" integer,
	"file_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "colleges" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"image" text,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"qualification" text,
	"board" text,
	"year" integer,
	"marksheet_no" text,
	"roll_no" text,
	"total" integer,
	"obtained" integer,
	"percentage" numeric(4, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"password" text,
	"college_id" integer,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidates" ADD CONSTRAINT "candidates_highschool_id_education_id_fk" FOREIGN KEY ("highschool_id") REFERENCES "education"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidates" ADD CONSTRAINT "candidates_intermediate_id_education_id_fk" FOREIGN KEY ("intermediate_id") REFERENCES "education"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidates" ADD CONSTRAINT "candidates_graduation_id_education_id_fk" FOREIGN KEY ("graduation_id") REFERENCES "education"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidates" ADD CONSTRAINT "candidates_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
