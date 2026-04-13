import { buildTables, competitionCategories } from "./competition";

export const mockTables = buildTables(competitionCategories);

export const mockPassations = [
  {
    id: "P1",
    teamName: "RoboHolic Alpha",
    studentNames: ["Alexander Rabbat"],
    coach: "Eddy Bachaalany",
    parent: "Mrs. Rabbat",
    categoryId: "CAT7",
    tableId: "CAT7-T1",
    scheduledTime: "09:00",
    status: "In Progress",
  },
  {
    id: "P2",
    teamName: "Mini Robots",
    studentNames: ["Clarita Bachaalany"],
    coach: "Eddy Bachaalany",
    parent: "Mrs. Bachaalany",
    categoryId: "CAT2",
    tableId: "CAT2-T2",
    scheduledTime: "09:10",
    status: "On Deck",
  },
  {
    id: "P3",
    teamName: "Code Rockets",
    studentNames: ["Chloe Abi Ghanem"],
    coach: "Coach Rita",
    parent: "Mrs. Abi Ghanem",
    categoryId: "CAT3",
    tableId: "CAT3-T1",
    scheduledTime: "09:12",
    status: "Called",
  },
  {
    id: "P4",
    teamName: "RoboHolic Delta",
    studentNames: ["Benita Bachaalany"],
    coach: "Eddy Bachaalany",
    parent: "Mrs. Bachaalany",
    categoryId: "CAT1",
    tableId: "CAT1-T1",
    scheduledTime: "09:07",
    status: "Scheduled",
  }
] as const;
