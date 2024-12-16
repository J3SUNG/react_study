"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { SignUpSchema } from "@/schemas/auth";
import db from "@/db";
import { user } from "@/db/schema";
import { redirect } from "next/navigation";

export const signUp = async (_: unknown, formData: FormData) => {
  const validateFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return { errorMessage: "입력값이 올바르지 않습니다." };
  }

  const { email, name, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { errorMessage: "이미 존재하는 이메일입니다." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(user).values({ name, email, password: hashedPassword });
  } catch (error) {
    console.error(error);
    return { errorMessage: "회원가입 중 오류가 발생했습니다." };
  }
  redirect("/login");
};
