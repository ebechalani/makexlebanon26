import { NextResponse } from "next/server";
import { getCompetitionTables } from "../../../lib/data-source";

export async function GET() {
  const tables = await getCompetitionTables();
  return NextResponse.json({ tables });
}
