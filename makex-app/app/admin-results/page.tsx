"use client";

import { useState } from "react";

type AdminResult = {
  id: string;
  teamName: string;
  category: string;
  tableLabel: string;
  status: "Finished" | "Absent" | "Delayed";
  score: string;
  time: string;
  notes: string;
  signatureImage: string;
  judgeName: string;
};

const sampleSignature =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="220" height="70" viewBox="0 0 220 70">
    <rect width="220" height="70" fill="white"/>
    <path d="M15 45 C 35 15, 45 60, 68 28 S 105 55, 126 30 S 165 56, 205 26" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>
`);

const initialResults: AdminResult[] = [
  {
    id: "AR1",
    teamName: "RoboHolic Alpha",
    category: "MakeX Inspire (8-12 years old)",
    tableLabel: "Table 1",
    status: "Finished",
    score: "185",
    time: "92 sec",
    notes: "Clean run, no penalties.",
    signatureImage: sampleSignature,
    judgeName: "Judge 1",
  },
  {
    id: "AR2",
    teamName: "Mindscape Beta",
    category: "MakeX Inspire (8-12 years old)",
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
    tableLabel: "Table 1",
    status: "Delayed",
    score: "--",
    time: "--",
    notes: "Robot battery issue, sent back to waiting area.",
    signatureImage: "",
    judgeName: "Judge 2",
  },
];

export default function AdminResultsPage() {
  const [results] = useState<AdminResult[]>(initialResults);

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: 24, display: "grid", gap: 20 }}>
        <section style={heroStyle}>
          <span style={badgeStyle}>Admin Results Dashboard</span>
          <h1 style={{ marginTop: 16, marginBottom: 12 }}>Judge decisions received by admin</h1>
          <p style={mutedStyle}>
            This page shows the final actions sent by judges: <strong>Finished</strong>, <strong>Absent</strong>, and <strong>Delayed</strong>,
            with score, time, notes, judge name, and the team signature image when a finished run is confirmed.
          </p>
        </section>

        <section style={cardStyle}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Team</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Table</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Score</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Notes</th>
                  <th style={thStyle}>Judge</th>
                  <th style={thStyle}>Signature</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}><strong>{item.teamName}</strong></td>
                    <td style={tdStyle}>{item.category}</td>
                    <td style={tdStyle}>{item.tableLabel}</td>
                    <td style={tdStyle}><span style={{ ...pillStyle, background: statusBg(item.status) }}>{item.status}</span></td>
                    <td style={tdStyle}>{item.score}</td>
                    <td style={tdStyle}>{item.time}</td>
                    <td style={tdStyle}>{item.notes}</td>
                    <td style={tdStyle}>{item.judgeName}</td>
                    <td style={tdStyle}>
                      {item.signatureImage ? (
                        <img src={item.signatureImage} alt="signature" style={signatureImageStyle} />
                      ) : (
                        <span style={smallMutedStyle}>No signature</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function statusBg(status: AdminResult["status"]) {
  if (status === "Finished") return "#dcfce7";
  if (status === "Absent") return "#fee2e2";
  return "#ffedd5";
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
};

const pillStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
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
