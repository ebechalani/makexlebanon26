"use client";

import { useMemo, useState } from "react";
import { buildTables, competitionCategories, getTablesForCategory, type CompetitionCategory } from "../../lib/competition";

type PassationRecord = {
  id: string;
  teamName: string;
  studentNames: string[];
  coach: string;
  parent: string;
  categoryId: string;
  tableId: string;
  scheduledTime: string;
  status: "Scheduled" | "Checked-in" | "On Deck" | "Called" | "In Progress" | "Completed" | "Delayed" | "Absent";
};

const initialRecords: PassationRecord[] = [
  {
    id: "P1",
    teamName: "RoboHolic Alpha",
    studentNames: ["Alexander Rabbat"],
    coach: "Eddy Bachaalany",
    parent: "Mrs. Rabbat",
    categoryId: "CAT7",
    tableId: "CAT7-T1",
    scheduledTime: "09:00",
    status: "Checked-in",
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
    status: "Scheduled",
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
];

export default function AdminPage() {
  const [categories, setCategories] = useState<CompetitionCategory[]>(competitionCategories);
  const [records, setRecords] = useState<PassationRecord[]>(initialRecords);
  const [form, setForm] = useState({
    teamName: "",
    studentName: "",
    coach: "",
    parent: "",
    categoryId: categories[0]?.id || "CAT1",
    tableId: getTablesForCategory(categories[0]?.id || "CAT1", categories)[0]?.id || "",
    scheduledTime: "09:00",
  });

  const tables = useMemo(() => buildTables(categories), [categories]);
  const availableTables = useMemo(() => getTablesForCategory(form.categoryId, categories), [form.categoryId, categories]);

  function updateCategoryTableCount(categoryId: string, tableCount: number) {
    const safeCount = Math.max(1, tableCount || 1);
    setCategories((current) => current.map((category) => category.id === categoryId ? { ...category, tableCount: safeCount } : category));
    setForm((current) => {
      if (current.categoryId !== categoryId) return current;
      const nextTables = getTablesForCategory(categoryId, categories.map((category) => category.id === categoryId ? { ...category, tableCount: safeCount } : category));
      return {
        ...current,
        tableId: nextTables[0]?.id || "",
      };
    });
  }

  function submitRecord() {
    if (!form.teamName || !form.studentName || !form.coach || !form.parent || !form.tableId) return;

    const newRecord: PassationRecord = {
      id: `P${Date.now()}`,
      teamName: form.teamName,
      studentNames: [form.studentName],
      coach: form.coach,
      parent: form.parent,
      categoryId: form.categoryId,
      tableId: form.tableId,
      scheduledTime: form.scheduledTime,
      status: "Scheduled",
    };

    setRecords((current) => [newRecord, ...current]);
    const resetTables = getTablesForCategory(form.categoryId, categories);
    setForm((current) => ({
      ...current,
      teamName: "",
      studentName: "",
      coach: "",
      parent: "",
      tableId: resetTables[0]?.id || current.tableId,
    }));
  }

  return (
    <main className="page">
      <div className="container grid" style={{ gap: 20 }}>
        <section className="hero">
          <span className="badge">Admin</span>
          <h1 style={{ marginTop: 16, marginBottom: 12 }}>Competition Records</h1>
          <p className="muted" style={{ fontSize: 18, lineHeight: 1.6 }}>
            Admin chooses the category first, then only the tables of that category appear. Table counts can be modified later.
          </p>
        </section>

        <section className="card">
          <h2>Configurable category table counts</h2>
          <div className="grid grid-2" style={{ marginTop: 16 }}>
            {categories.map((category) => (
              <div key={category.id} className="card">
                <strong>{category.fullName}</strong>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
                  <label className="muted">Tables</label>
                  <input
                    type="number"
                    min={1}
                    value={category.tableCount}
                    onChange={(e) => updateCategoryTableCount(category.id, Number(e.target.value))}
                    style={{ padding: 10, borderRadius: 12, border: "1px solid #cbd5e1", width: 90 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Add participant passation</h2>
          <div className="grid grid-2" style={{ marginTop: 16 }}>
            <input value={form.teamName} onChange={(e) => setForm((current) => ({ ...current, teamName: e.target.value }))} placeholder="Team name" style={inputStyle} />
            <input value={form.studentName} onChange={(e) => setForm((current) => ({ ...current, studentName: e.target.value }))} placeholder="Student name" style={inputStyle} />
            <input value={form.coach} onChange={(e) => setForm((current) => ({ ...current, coach: e.target.value }))} placeholder="Coach" style={inputStyle} />
            <input value={form.parent} onChange={(e) => setForm((current) => ({ ...current, parent: e.target.value }))} placeholder="Parent" style={inputStyle} />
            <select
              value={form.categoryId}
              onChange={(e) => {
                const nextCategoryId = e.target.value;
                const nextTables = getTablesForCategory(nextCategoryId, categories);
                setForm((current) => ({
                  ...current,
                  categoryId: nextCategoryId,
                  tableId: nextTables[0]?.id || "",
                }));
              }}
              style={inputStyle}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.fullName}</option>
              ))}
            </select>
            <select value={form.tableId} onChange={(e) => setForm((current) => ({ ...current, tableId: e.target.value }))} style={inputStyle}>
              {availableTables.map((table) => (
                <option key={table.id} value={table.id}>{table.shortLabel}</option>
              ))}
            </select>
            <input type="time" value={form.scheduledTime} onChange={(e) => setForm((current) => ({ ...current, scheduledTime: e.target.value }))} style={inputStyle} />
            <button onClick={submitRecord} style={buttonStyle}>Add record</button>
          </div>
        </section>

        <section className="card">
          <h2>Current records</h2>
          <div style={{ overflowX: "auto", marginTop: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Team</th>
                  <th style={thStyle}>Student</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Table</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const table = tables.find((item) => item.id === record.tableId);
                  const category = categories.find((item) => item.id === record.categoryId);
                  return (
                    <tr key={record.id}>
                      <td style={tdStyle}>{record.teamName}</td>
                      <td style={tdStyle}>{record.studentNames.join(", ")}</td>
                      <td style={tdStyle}>{category?.fullName || record.categoryId}</td>
                      <td style={tdStyle}>{table?.shortLabel || record.tableId}</td>
                      <td style={tdStyle}>{record.scheduledTime}</td>
                      <td style={tdStyle}>{record.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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

const buttonStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#0f172a",
  color: "white",
  fontWeight: 700,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: 12,
  borderBottom: "1px solid #e2e8f0",
};

const tdStyle: React.CSSProperties = {
  padding: 12,
  borderBottom: "1px solid #e2e8f0",
};
