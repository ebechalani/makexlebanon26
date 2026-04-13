import Link from "next/link";
import { competitionCategories } from "@/lib/competition";

export default function HomePage() {
  return (
    <main className="page">
      <div className="container grid" style={{ gap: 20 }}>
        <section className="hero">
          <span className="badge">MakeX Lebanon 2026</span>
          <h1 style={{ marginTop: 16, marginBottom: 12 }}>Live Competition Management System</h1>
          <p className="muted" style={{ fontSize: 18, lineHeight: 1.6 }}>
            Online structure for admin scheduling, judge live updates, coach tracking, and the public live board.
            Table counts are configurable per category and can be changed later.
          </p>
        </section>

        <section className="grid grid-2">
          <Link href="/admin" className="linkCard">Open Admin</Link>
          <Link href="/judge" className="linkCard">Open Judge View</Link>
          <Link href="/coach" className="linkCard">Open Coach View</Link>
          <Link href="/live" className="linkCard">Open Public Live Board</Link>
        </section>

        <section className="card">
          <h2>Configured categories</h2>
          <div className="grid grid-2" style={{ marginTop: 16 }}>
            {competitionCategories.map((category) => (
              <div key={category.id} className="card">
                <strong>{category.fullName}</strong>
                <p className="muted" style={{ marginTop: 8 }}>
                  {category.tableCount} table{category.tableCount > 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
