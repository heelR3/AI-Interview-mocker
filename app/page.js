"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Page from "./(auth)/sign-in/[[...sign-in]]/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return // wait for Clerk to load user status

    if (isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  return null
}
