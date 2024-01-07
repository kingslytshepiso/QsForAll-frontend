"use server";
import { cookies } from "next/headers";

export async function initializeSession() {
  cookies().set({
    name: "next-initializer",
    value: "true",
    httpOnly: true,
    path: "/",
    secure: true,
  });
}
