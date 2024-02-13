"use client"

import * as React from "react"
import {useTransition} from "react"

import {cn} from "@repo/ui/lib/utils"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@repo/ui/components/ui/form";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@workwise/prisma/zod/auth";
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@repo/ui/components/ui/button";
import Link from "next/link";
import {Input} from "@repo/ui/components/ui/input";
import {login} from "../../actions/login";
import SubmitButton from "@repo/ui/components/ui/submit-button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

const LoginForm = ({className, ...props}: UserAuthFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values, callbackUrl)
        .then((data: any) => {
          if (data?.error) {
            console.log(data?.error)
            // return toast({
            //   title: data?.error,
            //   variant: "destructive"
            // })
          }

          if (data?.success) {
            form.reset();
            router.push('/')
          }
        })
        .catch((err: any) => {
          console.error("Error Log", err)
        });
    });
  }

  return <>
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" method={"post"}>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <>
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
              render={({field}) => (
                <>
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

            <div className={"mt-2 text-right"}>
              <Link href={'/auth/reset-password'}>
                <p className={"text-sm"}>Forgot password?</p>
              </Link>
            </div>

            <SubmitButton loading={isPending} text={"Sign in"}/>
          </form>
        </Form>

      </div>
    </div>
  </>
}

export default LoginForm;
