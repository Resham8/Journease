"use client";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect:false
    });

    // console.log({ response });
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-100">
      <div className=" w-96 h-auto py-4 px-6 outline rounded-xl">
        <div className="text-center font-bold text-2xl py-5">
          <h1>Login Now</h1>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="janedoe@example.com"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" placeholder="*********" />
          </div>
          <div className="my-3">
            <Button type="submit" className="w-full">
              LogIn &rarr;
            </Button>
          </div>
          <div className="mb-5">
            <p>
              Create an account{" "}
              <Link href={"/register"} className="underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
        <div className="w-full border-b-1 border-gray-900"></div>
        <div className="py-5">
          <Button className="w-full">
            <GoogleIcon />
            Login with google
          </Button>
        </div>
      </div>
    </div>
  );
}
