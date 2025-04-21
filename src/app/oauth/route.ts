// src/app/oauth/route.js

import { AUTH_COOKIE } from "@/features/auth/constans";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID } from "@/config";

export async function GET(request:NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  const { account, databases } = await createAdminClient();

  if (!userId || !secret) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const session = await account.createSession(userId, secret);

  cookies().set(AUTH_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  try {
    // Check if user has any workspaces
    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("userId", userId)]
    );

    if (members.documents.length > 0) {
      // If user has workspaces, redirect to their first workspace
      const workspaceId = members.documents[0].workspaceId;
      return NextResponse.redirect(`${request.nextUrl.origin}/workspaces/${workspaceId}`);
    } else {
      // If no workspaces, redirect to create workspace page
      return NextResponse.redirect(`${request.nextUrl.origin}/workspaces/create`);
    }
  } catch (error) {
    console.error("Error checking workspaces in OAuth flow:", error);
    // Fallback to landing page on error
    return NextResponse.redirect(`${request.nextUrl.origin}/landingpage`);
  }
}