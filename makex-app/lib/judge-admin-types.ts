export type JudgeFinalStatus = "Finished" | "Absent" | "Delayed";

export type JudgeFinalizePayload = {
  passationId?: string | null;
  teamName: string;
  category?: string | null;
  tableId?: string | null;
  tableLabel: string;
  status: JudgeFinalStatus;
  score?: number | null;
  timeSeconds?: number | null;
  notes?: string | null;
  signatureImage?: string | null;
  judgeName?: string | null;
};

export type AdminResultRecord = {
  id: string;
  teamName: string;
  category?: string | null;
  tableId?: string | null;
  tableLabel: string;
  status: JudgeFinalStatus;
  score: string;
  time: string;
  notes: string;
  signatureImage: string;
  judgeName: string;
};

export const sampleAdminResults: AdminResultRecord[] = [
  {
    id: "AR1",
    teamName: "RoboHolic Alpha",
    category: "MakeX Inspire (8-12 years old)",
    tableId: "CAT7-T1",
    tableLabel: "Table 1",
    status: "Finished",
    score: "185",
    time: "92 sec",
    notes: "Clean run, no penalties.",
    signatureImage: "",
    judgeName: "Judge 1",
  },
  {
    id: "AR2",
    teamName: "Mindscape Beta",
    category: "MakeX Inspire (8-12 years old)",
    tableId: "CAT7-T1",
    tableLabel: "Table 1",
    status: "Absent",
    score: "--",
    time: "--",
    notes: "Team did not arrive when called.",
    signatureImage: "",
    judgeName: "Judge 1",
  },
  {
    id: "AR3",
    teamName: "Mini Robots",
    category: "Sportswonderland (6-7 years old)",
    tableId: "CAT2-T1",
    tableLabel: "Table 1",
    status: "Delayed",
    score: "--",
    time: "--",
    notes: "Robot battery issue, sent back to waiting area.",
    signatureImage: "",
    judgeName: "Judge 2",
  },
];
