import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password, collegeId } = body;
    const hashedPwd = await hash(password, 10);
    const newUser = await db.insert(users).values({
      email,
      password: hashedPwd,
      name: username,
      collegeId: parseInt(collegeId),
    });
    return NextResponse.json(
      { user: newUser, message: "user created" },
      { status: 201 }
    );
  } catch (error) {}
}
