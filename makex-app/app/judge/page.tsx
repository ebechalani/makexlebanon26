"use client";

import { useMemo, useState } from "react";
import { buildTables, competitionCategories } from "../../lib/competition";

const tables = buildTables(competitionCategories);

const initialQueue = [
  { id: "Q1", tableId: "CAT7-T1", teamName: "RoboHolic Alpha", status: "In Progress", scheduledTime: "09:00" },
  { id: "Q2", tableId: "CAT7-T1", teamName: "Mindscape Beta", status: "Next", scheduledTime: "09:10" },
  { id: "Q3", tableId: "CAT7-T1", teamName: "Code Rockets", status: "Prepare", scheduledTime: "09:20" },
  { id: "Q4", tableId: "CAT2-T1", teamName: "Mini Robots", status: "In Progress", scheduledTime: "09:07" },
  { id: "Q5", tableId: "CAT2-T1", teamName: "RoboHolic Delta", status: "Next", scheduledTime: "09:15" },
];

export default function JudgePage() {
  const [selectedTable, setSelectedTable] = useState("CAT7-T1");
  const [queue, setQueue] = useState(initialQueue);

  const selectedTableMeta = tables.find((table) => table.id === selectedTable);
  const visibleQueue = useMemo(() => queue.filter((item) => item.tableId === selectedTable), [queue, selectedTable]);

  function moveQueueForward() {
    setQueue((current) =>
      current.map((item) => {
        if (item.tableId !== selectedTable) return item;
        if (item.status === "In Progress") return { ...item, status: "Completed" };
        if (item.status === "Next") return { ...item, status: "In Progress" };
        if (item.status === "Prepare") return { ...item, status: "Next" };
        return item;
      })
    );
  }

  return (
    <main className="page">
      <div className="container grid" style={{ gap: 20 }}>
        <section className="hero">
          <span className="badge">Judge</span>
          <h1 style={{ marginTop: 16, marginBottom: 12 }}>Judge Table View</h1>
          <p className="muted" style={{ fontSize: 18, lineHeight: 1.6 }}>
            Judges only need their table, the current queue, and one-tap controls to move the competition forward.
          </p>
        </section>

        <section className="card">
          <label className="muted" style={{ display: "block", marginBottom: 10 }}>Select assigned table</label>
          <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} style={inputStyle}>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>{table.label}</option>
            ))}
          </select>
        </section>

        <section className="card">
          <h2>{selectedTableMeta?.category}</h2>
          <p className="muted" style={{ marginTop: 8 }}>{selectedTableMeta?.shortLabel}</p>
          <div className="grid grid-2" style={{ marginTop: 16 }}>
            {visibleQueue.map((item) => (
              <div key={item.id} className="card">
                <strong>{item.status}</strong>
                <h3 style={{ marginTop: 12 }}>{item.teamName}</h3>
                <p className="muted" style={{ marginTop: 8 }}>Scheduled {item.scheduledTime}</p>
              </div>
            ))}
          </div>
          <button onClick={moveQueueForward} style={{ ...buttonStyle, marginTop: 16 }}>Finish current and call next</button>
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
