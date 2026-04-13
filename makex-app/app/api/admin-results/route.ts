import { NextResponse } from "next/server";
import { sampleAdminResults } from "../../../lib/judge-admin-types";

export async function GET() {
  return NextResponse.json({ results: sampleAdminResults });
}
