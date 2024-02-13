"use client"

import * as React from "react"
import {useTransition} from "react"

import {cn} from "@repo/ui/lib/utils"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@repo/ui/components/ui/form";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "@workwise/prisma/zod/auth";
import {useRouter} from "next/navigation";
import {Input} from "@repo/ui/components/ui/input";
import {login} from "../../actions/login";
import SubmitButton from "@repo/ui/components/ui/submit-button";
import {register} from "../../actions/register";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

const RegisterForm = ({className, ...props}: UserAuthFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema), defaultValues: {
      name: "", email: "", password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(() => {
      register(values)
        .then((data) => {
          // setError(data.error);
          // setSuccess(data.success);
        });
    });

    await login({email: values?.email, password: values?.password})
    router.push('/')
  }

  return <>
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" method={"post"}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (<>
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type={"text"} placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </>

              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (<>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type={"email"} placeholder="Johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </>

              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (<>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type={"password"} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </>

              )}
            />


            <SubmitButton loading={isPending} text={"Register"}/>
          </form>
        </Form>

      </div>
    </div>
  </>
}

export default RegisterForm;
