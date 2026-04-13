import { NextResponse } from "next/server";
import { getPassations } from "../../../lib/data-source";

export async function GET() {
  const passations = await getPassations();
  return NextResponse.json({ passations });
}
