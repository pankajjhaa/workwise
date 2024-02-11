import {z} from 'zod'

export const loginSchema = z.object({
  email: z

    .string({
      required_error: "Please enter your email",
    }).min(1, {
      message: "This field is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Please enter your password",
    }).min(1, {
      message: "This field is required",
    }),
})

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter your email",
    })
    .min(1, {
      message: "This field is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Please enter your password",
    }).min(1, {
      message: "This field is required",
    }),
})
