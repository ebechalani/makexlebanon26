import { buildTables, competitionCategories } from "../../lib/competition";

const tables = buildTables(competitionCategories);

const liveRows = [
  { id: "L1", tableId: "CAT7-T1", teamName: "RoboHolic Alpha", status: "NOW", scheduledTime: "09:00" },
  { id: "L2", tableId: "CAT7-T1", teamName: "Mindscape Beta", status: "NEXT", scheduledTime: "09:10" },
  { id: "L3", tableId: "CAT7-T1", teamName: "Code Rockets", status: "PREPARE", scheduledTime: "09:20" },
  { id: "L4", tableId: "CAT2-T1", teamName: "Mini Robots", status: "NOW", scheduledTime: "09:07" },
  { id: "L5", tableId: "CAT2-T1", teamName: "RoboHolic Delta", status: "NEXT", scheduledTime: "09:15" }
];

export default function LivePage() {
  const visibleTables = tables.slice(0, 8);

  return (
    <main className="page">
      <div className="container grid" style={{ gap: 20 }}>
        <section className="hero" style={{ background: "#0f172a", color: "white" }}>
          <span className="badge">Public Live Board</span>
          <h1 style={{ marginTop: 16, marginBottom: 12 }}>Now • Next • Prepare</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#cbd5e1" }}>
            This page is for parents, students, and venue screens. It will later update automatically from judge actions.
          </p>
        </section>

        <section className="grid grid-2">
          {visibleTables.map((table) => {
            const items = liveRows.filter((row) => row.tableId === table.id);
            return (
              <div key={table.id} className="card">
                <strong>{table.category}</strong>
                <p className="muted" style={{ marginTop: 8 }}>{table.shortLabel}</p>
                <div className="grid" style={{ gap: 12, marginTop: 16 }}>
                  {["NOW", "NEXT", "PREPARE"].map((slot) => {
                    const row = items.find((item) => item.status === slot);
                    return (
                      <div key={slot} style={{ padding: 14, borderRadius: 14, background: slot === "NOW" ? "#eef2ff" : slot === "NEXT" ? "#fef3c7" : "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <strong>{slot}</strong>
                        <div style={{ marginTop: 8 }}>{row?.teamName || "No team assigned"}</div>
                        <div className="muted" style={{ marginTop: 6 }}>{row ? `Scheduled ${row.scheduledTime}` : ""}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
