"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const router = useRouter();
    return <div className="w-screen h-screen">
        <div className="w-full h-full flex items-center justify-center">
            <Button onClick={() => {
                router.push("/TravelForm");
            }}>Open Form</Button>
        </div>
    </div>
}