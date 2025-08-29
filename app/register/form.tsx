"use client";

import Alerts from "@/components/Alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    console.log({ response });
    if (response.ok) {
      setShowAlert(true);
      setTimeout(() => router.push("/login"), 2000); 
    }
  };

  return (
    <>
      {showAlert && (<Alerts title="Sign Up successful" description="" />)}
      <div className="w-screen min-h-screen flex justify-center items-center bg-gray-100">
        <div className=" w-96 h-auto py-4 px-6 outline rounded-xl bg-white">
          <div className="text-center font-bold text-2xl py-5">
            <h1>Register Now</h1>
          </div>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Label htmlFor="fullName">Full Name</Label>
              <Input name="fullName" type="text" placeholder="Jane Doe" />
            </div>
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
              <Button className="w-full" type="submit">
                Sign UP &rarr;
              </Button>
            </div>
            <div className="mb-5">
              <p>
                Already have an account?{" "}
                <Link href={"/login"} className="underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
