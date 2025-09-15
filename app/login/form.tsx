"use client";
import Alerts from "@/components/Alerts";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";

export default function Form() {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    
    if (response?.error) {      
      console.log("Login failed:", response.error);
      setAlertTitle("Login Failed");
      setAlertDescription("Please check your email and password and try again.");
      setShowAlert(true);
    } else if (response?.ok && !response.error) {
      console.log("Login successful!");
      setAlertTitle("Login Successful");
      setAlertDescription("Redirecting to dashboard...");
      setShowAlert(true);
      // Delay redirect to show success message
      setTimeout(() => {
        router.push("/Dashboard");
      }, 1500);
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-100 relative">
      {/* Fixed positioned alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <Alerts title={alertTitle} description={alertDescription} />
        </div>
      )}
      
      <div className="w-96 h-auto py-4 px-6 outline rounded-xl bg-white">
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
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input 
              name="password" 
              type="password" 
              placeholder="*********"
              required
            />
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
        <div className="w-full border-b border-gray-300 my-4"></div>
        <div className="py-5">
          <Button className="w-full" type="button">
            <GoogleIcon />
            Login with google
          </Button>
        </div>
      </div>
    </div>
  );
}