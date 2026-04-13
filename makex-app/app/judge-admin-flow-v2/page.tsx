"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Table = {
  id: string;
  label: string;
  shortLabel: string;
  category: string;
};

type QueueItem = {
  id: string;
  tableId: string;
  teamName: string;
  status: "In Progress" | "Next" | "Prepare" | "Queued" | "Finished" | "Absent" | "Delayed";
  scheduledTime: string;
};

type AdminResult = {
  id: string;
  teamName: string;
  tableLabel: string;
  status: "Finished" | "Absent" | "Delayed";
  score: string;
  time: string;
  notes: string;
  signatureImage: string;
};

const tables: Table[] = [
  {
    id: "CAT7-T1",
    label: "MakeX Inspire (8-12 years old) • Table 1",
    shortLabel: "Table 1",
    category: "MakeX Inspire (8-12 years old)",
  },
  {
    id: "CAT2-T1",
    label: "Sportswonderland (6-7 years old) • Table 1",
    shortLabel: "Table 1",
    category: "Sportswonderland (6-7 years old)",
  },
];

const initialQueue: QueueItem[] = [
  { id: "Q1", tableId: "CAT7-T1", teamName: "RoboHolic Alpha", status: "In Progress", scheduledTime: "09:00" },
  { id: "Q2", tableId: "CAT7-T1", teamName: "Mindscape Beta", status: "Next", scheduledTime: "09:10" },
  { id: "Q3", tableId: "CAT7-T1", teamName: "Code Rockets", status: "Prepare", scheduledTime: "09:20" },
  { id: "Q4", tableId: "CAT7-T1", teamName: "Mini Robots", status: "Queued", scheduledTime: "09:30" },
];

export default function JudgeAdminFlowV2Page() {
  const [selectedTable, setSelectedTable] = useState("CAT7-T1");
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [adminResults, setAdminResults] = useState<AdminResult[]>([]);
  const [runTime, setRunTime] = useState("0");
  const [teamScore, setTeamScore] = useState("0");
  const [judgeNotes, setJudgeNotes] = useState("");
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureForTeamId, setSignatureForTeamId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);

  const currentTableMeta = useMemo(() => tables.find((table) => table.id === selectedTable) || tables[0], [selectedTable]);
  const visibleQueue = useMemo(() => queue.filter((item) => item.tableId === selectedTable), [queue, selectedTable]);
  const currentTeam = useMemo(
    () => visibleQueue.find((item) => item.status === "In Progress") || visibleQueue[0] || null,
    [visibleQueue]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    if (currentTeam && signatureForTeamId && signatureForTeamId !== currentTeam.id) {
      clearSignaturePad();
    }
  }, [currentTeam, signatureForTeamId]);

  function clearSignaturePad() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
    setSignatureForTeamId(null);
  }

  function getCanvasPosition(evt: MouseEvent | React.MouseEvent<HTMLCanvasElement> | TouchEvent | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const touchLike = "touches" in evt && evt.touches?.[0] ? evt.touches[0] : null;
    const clientX = touchLike ? touchLike.clientX : "clientX" in evt ? evt.clientX : 0;
    const clientY = touchLike ? touchLike.clientY : "clientY" in evt ? evt.clientY : 0;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function startDrawing(evt: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!currentTeam) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawingRef.current = true;
    setSignatureForTeamId(currentTeam.id);
    const pos = getCanvasPosition(evt);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    evt.preventDefault();
  }

  function moveDrawing(evt: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const pos = getCanvasPosition(evt);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasSignature(true);
    evt.preventDefault();
  }

  function stopDrawing() {
    drawingRef.current = false;
  }

  function captureSignatureImage() {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return "";
    return canvas.toDataURL("image/png");
  }

  function finalizeAction(status: AdminResult["status"], requireSignature: boolean) {
    if (!currentTeam) {
      alert("No current team selected.");
      return;
    }
    if (requireSignature && !(hasSignature && signatureForTeamId === currentTeam.id)) {
      alert(`The current team (${currentTeam.teamName}) must sign before Finish.`);
      return;
    }

    const signatureImage = status === "Finished" ? captureSignatureImage() : "";

    setAdminResults((current) => [
      {
        id: `R${Date.now()}`,
        teamName: currentTeam.teamName,
        tableLabel: currentTableMeta.label,
        status,
        score: status === "Finished" ? (teamScore || "0") : "--",
        time: status === "Finished" ? `${runTime || "0"} sec` : "--",
        notes: judgeNotes || "No notes",
        signatureImage,
      },
      ...current,
    ]);

    setQueue((current) =>
      current.map((item) => {
        if (item.tableId !== selectedTable) return item;
        if (item.id === currentTeam.id) return { ...item, status };
        if (item.status === "Next") return { ...item, status: "In Progress" };
        if (item.status === "Prepare") return { ...item, status: "Next" };
        if (item.status === "Queued") return { ...item, status: "Prepare" };
        return item;
      })
    );

    clearSignaturePad();
    setTeamScore("0");
    setRunTime("0");
    setJudgeNotes("");
  }

  const signatureReady = currentTeam && hasSignature && signatureForTeamId === currentTeam.id;

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: 24, display: "grid", gap: 20 }}>
        <section style={heroStyle}>
          <span style={badgeStyle}>Judge → Admin Flow v2</span>
          <h1 style={{ marginTop: 16, marginBottom: 12 }}>Absent goes to admin, no standalone Next, signature image saved</h1>
          <p style={mutedStyle}>
            The queue advances only after a final judge action: <strong>Finish</strong>, <strong>Absent</strong>, or <strong>Delay</strong>.
            <strong> Finish</strong> requires the current team signature, and admin receives the signature as an image.
          </p>
        </section>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1.08fr 0.92fr" }}>
          <section style={cardStyle}>
            <h2>Judge panel</h2>
            <div style={rowStyle}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Assigned table</label>
                <select value={selectedTable} onChange={(e) => { setSelectedTable(e.target.value); clearSignaturePad(); }} style={inputStyle}>
                  {tables.map((table) => (
                    <option key={table.id} value={table.id}>{table.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Run time (seconds)</label>
                <input type="number" min={0} value={runTime} onChange={(e) => setRunTime(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Team score</label>
                <input type="number" min={0} value={teamScore} onChange={(e) => setTeamScore(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ ...panelStyle, background: "#eef2ff", marginTop: 16 }}>
              {currentTeam ? (
                <>
                  <span style={pillStyle}>{currentTeam.status}</span>
                  <h3 style={{ marginTop: 12 }}>{currentTeam.teamName}</h3>
                  <p style={mutedStyle}>{currentTableMeta.category} • {currentTableMeta.shortLabel}</p>
                  <p><strong>Scheduled:</strong> {currentTeam.scheduledTime}</p>
                </>
              ) : (
                <p style={mutedStyle}>No current team.</p>
              )}
            </div>

            <div style={{ marginTop: 8, fontSize: 13, color: signatureReady ? "#15803d" : "#b45309", fontWeight: 700 }}>
              {currentTeam
                ? signatureReady
                  ? `Signature captured for ${currentTeam.teamName}. Finish can send to admin.`
                  : `Signature required for ${currentTeam.teamName} before Finish.`
                : "No current team."}
            </div>

            <div style={{ ...rowStyle, marginTop: 16 }}>
              <button style={warningButtonStyle} onClick={() => finalizeAction("Delayed", false)}>Delay & Send to Admin</button>
              <button style={dangerButtonStyle} onClick={() => finalizeAction("Absent", false)}>Absent & Send to Admin</button>
              <button style={successButtonStyle} onClick={() => finalizeAction("Finished", true)}>Finish & Send to Admin</button>
            </div>

            <div style={{ ...cardInsetStyle, marginTop: 16 }}>
              <h3 style={{ marginTop: 0 }}>Queue</h3>
              <div style={queueGridStyle}>
                {visibleQueue.map((item) => (
                  <div key={item.id} style={{ ...panelStyle, background: queueTone(item.status) }}>
                    <strong>{item.status}</strong>
                    <div style={{ marginTop: 8 }}>{item.teamName}</div>
                    <div style={smallMutedStyle}>{item.scheduledTime}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...rowStyle, marginTop: 16, alignItems: "stretch" }}>
              <div style={{ flex: 1 }}>
                <h3>Judge notes</h3>
                <textarea value={judgeNotes} onChange={(e) => setJudgeNotes(e.target.value)} placeholder="Add penalties, retry note, or observations..." style={textareaStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <h3>Current team signature</h3>
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={180}
                  style={canvasStyle}
                  onMouseDown={startDrawing}
                  onMouseMove={moveDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={moveDrawing}
                  onTouchEnd={stopDrawing}
                />
                <div style={{ marginTop: 12 }}>
                  <button style={secondaryButtonStyle} onClick={clearSignaturePad}>Clear signature</button>
                </div>
              </div>
            </div>
          </section>

          <section style={cardStyle}>
            <h2>Admin received results</h2>
            <p style={mutedStyle}>Admin receives finished, absent, and delayed results. Finished teams show the signature image.</p>
            <div style={{ overflowX: "auto", marginTop: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Team</th>
                    <th style={thStyle}>Table</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Score</th>
                    <th style={thStyle}>Time</th>
                    <th style={thStyle}>Notes</th>
                    <th style={thStyle}>Signature</th>
                  </tr>
                </thead>
                <tbody>
                  {adminResults.length ? adminResults.map((item) => (
                    <tr key={item.id}>
                      <td style={tdStyle}><strong>{item.teamName}</strong></td>
                      <td style={tdStyle}>{item.tableLabel}</td>
                      <td style={tdStyle}><span style={pillStyle}>{item.status}</span></td>
                      <td style={tdStyle}>{item.score}</td>
                      <td style={tdStyle}>{item.time}</td>
                      <td style={tdStyle}>{item.notes}</td>
                      <td style={tdStyle}>
                        {item.signatureImage ? (
                          <img src={item.signatureImage} alt="signature" style={signatureImageStyle} />
                        ) : (
                          <span style={smallMutedStyle}>No signature</span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} style={{ ...tdStyle, color: "#475569" }}>No results received yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function queueTone(status: QueueItem["status"]) {
  if (status === "In Progress") return "#eef2ff";
  if (status === "Next") return "#fef3c7";
  if (status === "Prepare") return "#ffedd5";
  if (status === "Finished") return "#dcfce7";
  if (status === "Absent") return "#fee2e2";
  return "white";
}

const heroStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 22,
  padding: 22,
};

const cardStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 22,
  padding: 22,
};

const cardInsetStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 16,
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#e2e8f0",
  color: "#334155",
  borderRadius: 999,
  padding: "6px 12px",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const mutedStyle: React.CSSProperties = {
  color: "#475569",
  lineHeight: 1.6,
};

const smallMutedStyle: React.CSSProperties = {
  color: "#64748b",
  fontSize: 12,
  marginTop: 6,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  color: "#475569",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 100,
  padding: 12,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  resize: "vertical",
};

const panelStyle: React.CSSProperties = {
  padding: 16,
  borderRadius: 18,
  border: "1px solid #e2e8f0",
};

const queueGridStyle: React.CSSProperties = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};

const pillStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#e2e8f0",
  fontSize: 12,
  fontWeight: 700,
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  background: "white",
  color: "#0f172a",
  fontWeight: 700,
  cursor: "pointer",
};

const warningButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#f59e0b",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const dangerButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#ef4444",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const successButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#16a34a",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const canvasStyle: React.CSSProperties = {
  width: "100%",
  height: 180,
  border: "1px dashed #94a3b8",
  borderRadius: 14,
  background: "white",
  touchAction: "none",
};

const signatureImageStyle: React.CSSProperties = {
  width: 140,
  height: 56,
  objectFit: "contain",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  background: "white",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: 12,
  borderBottom: "1px solid #e2e8f0",
  verticalAlign: "top",
};

const tdStyle: React.CSSProperties = {
  textAlign: "left",
  padding: 12,
  borderBottom: "1px solid #e2e8f0",
  verticalAlign: "top",
};
