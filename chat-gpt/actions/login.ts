"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { createSession } from "./sessions";
import { redirect } from "next/navigation";

export const login = async (_: unknown, formData: FormData) => {
  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return { errorMessage: "입력값이 올바르지 않습니다." };
  }

  const { email, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { errorMessage: "존재하지 않는 사용자입니다." };
    }

    const { id, name, password: userPassword } = existingUser;
    const apsswordMatch = await bcrypt.compare(password, userPassword);

    if (!apsswordMatch) {
      return { errorMessage: "비밀번호가 일치하지 않습니다." };
    }

    await createSession({ id, name });
  } catch (error) {
    console.error(error);
    return { errorMessage: "로그인에 실패했습니다." };
  }

  redirect("/");
};
