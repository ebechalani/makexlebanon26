"use client";

import { useMemo, useState } from "react";
import { buildTables, competitionCategories } from "../../lib/competition";

const tables = buildTables(competitionCategories);

const records = [
  {
    id: "C1",
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
    id: "C2",
    teamName: "Mini Robots",
    studentNames: ["Clarita Bachaalany"],
    coach: "Eddy Bachaalany",
    parent: "Mrs. Bachaalany",
    categoryId: "CAT2",
    tableId: "CAT2-T2",
    scheduledTime: "09:15",
    status: "On Deck",
  },
  {
    id: "C3",
    teamName: "Code Rockets",
    studentNames: ["Chloe Abi Ghanem"],
    coach: "Coach Rita",
    parent: "Mrs. Abi Ghanem",
    categoryId: "CAT3",
    tableId: "CAT3-T1",
    scheduledTime: "09:25",
    status: "Scheduled",
  },
];

export default function CoachPage() {
  const [selectedCoach, setSelectedCoach] = useState("Eddy Bachaalany");
  const coaches = [...new Set(records.map((item) => item.coach))];
  const visibleRecords = useMemo(() => records.filter((item) => item.coach === selectedCoach), [selectedCoach]);

  return (
    <main className="page">
      <div className="container grid" style={{ gap: 20 }}>
        <section className="hero">
          <span className="badge">Coach</span>
          <h1 style={{ marginTop: 16, marginBottom: 12 }}>Coach and Teacher Tracking</h1>
          <p className="muted" style={{ fontSize: 18, lineHeight: 1.6 }}>
            Coaches should only see their own teams, table numbers, and what action to take now.
          </p>
        </section>

        <section className="card">
          <label className="muted" style={{ display: "block", marginBottom: 10 }}>Select coach</label>
          <select value={selectedCoach} onChange={(e) => setSelectedCoach(e.target.value)} style={inputStyle}>
            {coaches.map((coach) => (
              <option key={coach} value={coach}>{coach}</option>
            ))}
          </select>
        </section>

        <section className="grid grid-2">
          {visibleRecords.map((record) => {
            const table = tables.find((item) => item.id === record.tableId);
            const message =
              record.status === "In Progress"
                ? "Your team is competing now."
                : record.status === "On Deck"
                ? "Prepare now. Your team is next."
                : record.status === "Called"
                ? "Go to the table now."
                : "Stay alert for the upcoming turn.";

            return (
              <div key={record.id} className="card">
                <strong>{record.teamName}</strong>
                <p className="muted" style={{ marginTop: 8 }}>{record.studentNames.join(", ")}</p>
                <p style={{ marginTop: 12 }}><strong>Status:</strong> {record.status}</p>
                <p style={{ marginTop: 8 }}><strong>Table:</strong> {table?.shortLabel}</p>
                <p style={{ marginTop: 8 }}><strong>Time:</strong> {record.scheduledTime}</p>
                <div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: "#f1f5f9" }}>
                  {message}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  width: "100%",
};
