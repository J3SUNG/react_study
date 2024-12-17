import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, { message: "이름은 한글 또는 영문만 입력 가능합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .regex(/[A-Z]/, { message: "비밀번호에 대문자를 포함해주세요." })
    .regex(/[a-z]/, { message: "비밀번호에 소문자를 포함해주세요." })
    .regex(/[0-9]/, { message: "비밀번호에 숫자를 포함해주세요." })
    .regex(/[\W_]/, { message: "비밀번호에 특수문자를 포함해주세요." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});
