import { competitionCategories, buildTables, type CompetitionCategory, type CompetitionTable } from "./competition";
import { mockPassations } from "./mock-data";
import { isSupabaseConfigured } from "./supabase-client";

export type PassationStatus =
  | "Scheduled"
  | "Checked-in"
  | "On Deck"
  | "Called"
  | "In Progress"
  | "Completed"
  | "Delayed"
  | "Absent";

export type PassationRecord = {
  id: string;
  teamName: string;
  studentNames: string[];
  coach: string;
  parent: string;
  categoryId: string;
  tableId: string;
  scheduledTime: string;
  status: PassationStatus;
};

export async function getCompetitionCategories(): Promise<CompetitionCategory[]> {
  return competitionCategories;
}

export async function getCompetitionTables(): Promise<CompetitionTable[]> {
  return buildTables(competitionCategories);
}

export async function getPassations(): Promise<PassationRecord[]> {
  if (isSupabaseConfigured()) {
    // Supabase query layer will be added next.
    // Keeping this fallback allows the UI to run before backend wiring is finished.
  }

  return mockPassations.map((item) => ({
    id: item.id,
    teamName: item.teamName,
    studentNames: [...item.studentNames],
    coach: item.coach,
    parent: item.parent,
    categoryId: item.categoryId,
    tableId: item.tableId,
    scheduledTime: item.scheduledTime,
    status: item.status,
  }));
}
