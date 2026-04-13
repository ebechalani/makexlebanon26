import { NextRequest, NextResponse } from "next/server";

type JudgeFinalizePayload = {
  passationId?: string;
  teamName: string;
  category?: string;
  tableId?: string;
  tableLabel: string;
  status: "Finished" | "Absent" | "Delayed";
  score?: number | null;
  timeSeconds?: number | null;
  notes?: string | null;
  signatureImage?: string | null;
  judgeName?: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<JudgeFinalizePayload>;

    if (!body.teamName || !body.tableLabel || !body.status) {
      return NextResponse.json(
        {
          ok: false,
          error: "teamName, tableLabel, and status are required.",
        },
        { status: 400 }
      );
    }

    if (body.status === "Finished" && !body.signatureImage) {
      return NextResponse.json(
        {
          ok: false,
          error: "signatureImage is required when status is Finished.",
        },
        { status: 400 }
      );
    }

    const acceptedPayload: JudgeFinalizePayload = {
      passationId: body.passationId || null,
      teamName: body.teamName,
      category: body.category || null,
      tableId: body.tableId || null,
      tableLabel: body.tableLabel,
      status: body.status,
      score: body.status === "Finished" ? body.score ?? 0 : null,
      timeSeconds: body.status === "Finished" ? body.timeSeconds ?? 0 : null,
      notes: body.notes || null,
      signatureImage: body.status === "Finished" ? body.signatureImage || null : null,
      judgeName: body.judgeName || null,
    };

    // Next phase:
    // 1. persist into Supabase passations table
    // 2. update final_result_status / judge_score / judge_time_seconds / judge_notes
    // 3. store signature image reference or data URL
    // 4. broadcast realtime update to admin dashboard

    return NextResponse.json({
      ok: true,
      message: "Judge result accepted and ready to be sent to admin.",
      result: acceptedPayload,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid JSON payload.",
      },
      { status: 400 }
    );
  }
}
