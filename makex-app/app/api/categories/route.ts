import { NextResponse } from "next/server";
import { getCompetitionCategories } from "../../../lib/data-source";

export async function GET() {
  const categories = await getCompetitionCategories();
  return NextResponse.json({ categories });
}
