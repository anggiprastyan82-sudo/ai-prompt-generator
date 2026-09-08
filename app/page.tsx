"use client";

import { useState } from "react";

type Page = "Dashboard" | "AI Office" | "Customers" | "Tasks" | "Agent Activity" | "Reports";
type Status = "IDLE" | "THINKING" | "WORKING" | "CHATTING" | "COMPLETED";

const navigation: { label: Page; icon: string }[] = [
  { label: "Dashboard", icon: "⌘" },
  { label: "AI Office", icon: "◈" },
  { label: "Customers", icon: "♙" },
  { label: "Tasks", icon: "✓" },
  { label: "Agent Activity", icon: "◌" },
  { label: "Reports", icon: "▥" },
];

const agents: { name: string; role: string; status: Status; avatar: string; position: string; detail: string }[] = [
  { name: "AI Manager", role: "Command Center", status: "THINKING", avatar: "✦", position: "top-[11%] left-[40%]", detail: "Menganalisis performa tim" },
  { name: "Sales Membership", role: "Growth Desk", status: "WORKING", avatar: "◆", position: "top-[44%] left-[7%]", detail: "Menghubungi 12 member baru" },
  { name: "Sales Promo", role: "Campaign Desk", status: "CHATTING", avatar: "◉", position: "top-[44%] left-[40%]", detail: "Diskusi promo weekend" },
  { name: "Creative Agent", role: "Content Studio", status: "COMPLETED", avatar: "✺", position: "top-[44%] right-[7%]", detail: "3 visual promo selesai" },
  { name: "Customer Service", role: "Care Desk", status: "CHATTING", avatar: "◒", position: "bottom-[8%] left-[24%]", detail: "Membalas pertanyaan pelanggan" },
  { name: "Support Hub", role: "Operations", status: "IDLE", avatar: "⬡", position: "bottom-[8%] right-[24%]", detail: "Menunggu task berikutnya" },
];

const activities = [
  { time: "Baru saja", agent: "Creative Agent", action: "menyelesaikan visual promo", tone: "red" },
  { time: "4 menit lalu", agent: "Sales Promo", action: "memulai campaign Payday", tone: "blue" },
  { time: "12 menit lalu", agent: "Customer Service", action: "menangani tiket #2941", tone: "purple" },
  { time: "20 menit lalu", agent: "AI Manager", action: "membuat ringkasan harian", tone: "amber" },
];

const statusStyle: Record<Status, string> = {
  IDLE: "bg-slate-700 text-slate-300",
  THINKING: "bg-violet-500/20 text-violet-300 border-violet-400/30",
  WORKING: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
  CHATTING: "bg-orange-500/20 text-orange-300 border-orange-400/30",
  COMPLETED: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
};

function PlaceholderPage({ page }: { page: Page }) {
  const messages: Record<Exclude<Page, "Dashboard" | "AI Office">, string> = {
    Customers: "Pantau pelanggan MAINku dan riwayat top up mereka di satu tempat.",
    Tasks: "Kelola pekerjaan virtual team Anda dengan lebih terarah.",
    "Agent Activity": "Lihat riwayat aktivitas dan performa setiap AI agent.",
    Reports: "Dapatkan insight pertumbuhan bisnis dari laporan yang mudah dibaca.",
  };
  return <section className="page-placeholder"><p className="eyebrow">MAINku workspace</p><h1>{page}</h1><p>{messages[page as keyof typeof messages]}</p><span>Halaman UI siap dikembangkan</span></section>;
}

export default function Home() {
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (page: Page) => { setActivePage(page); setSidebarOpen(false); };
  return (
    <main className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark">M</div><div><b>MAINku</b><span>AI OFFICE</span></div><button className="mobile-close" onClick={() => setSidebarOpen(false)}>×</button></div>
        <nav>{navigation.map((item) => <button key={item.label} onClick={() => navigate(item.label)} className={activePage === item.label ? "nav-item active" : "nav-item"}><i>{item.icon}</i>{item.label}{item.label === "AI Office" && <em>LIVE</em>}</button>)}</nav>
        <div className="sidebar-footer"><div className="account-avatar">A</div><div><strong>Admin MAINku</strong><span>Owner account</span></div><button aria-label="Settings">⚙</button></div>
      </aside>
      {sidebarOpen && <button aria-label="Close menu" className="backdrop" onClick={() => setSidebarOpen(false)} />}

      <section className="workspace">
        <header className="topbar"><button className="menu-button" onClick={() => setSidebarOpen(true)}>☰</button><div><p className="eyebrow">GOOD MORNING, ADMIN</p><h1>{activePage === "Dashboard" ? "Command Center" : activePage}</h1></div><div className="topbar-actions"><button className="notification">♧<span /></button><div className="date"><b>08</b><span>Sep<br />2026</span></div></div></header>
        {activePage !== "Dashboard" ? <PlaceholderPage page={activePage} /> : <>
          <section className="overview-cards"><article><span>Total Revenue</span><b>Rp 24.8M</b><small className="positive">↑ 12.4% <i>vs bulan lalu</i></small></article><article><span>Active Customers</span><b>1,284</b><small className="positive">↑ 8.2% <i>vs bulan lalu</i></small></article><article><span>Tasks Completed</span><b>86%</b><small><i>43 dari 50 task</i></small></article></section>
          <section className="dashboard-grid"><div className="office-column"><div className="section-heading"><div><p className="eyebrow">LIVE WORKSPACE</p><h2>Virtual AI Office <span className="live-dot">LIVE</span></h2></div><button onClick={() => setActivePage("AI Office")}>Open AI Office ↗</button></div>
            <div className="office"><div className="office-top"><span>MAINku.com · Virtual HQ</span><span className="online"><i /> 6 AGENTS ONLINE</span></div><div className="office-grid" /> <div className="office-glow glow-one" /><div className="office-glow glow-two" />
              {agents.map((agent) => <button key={agent.name} className={`agent ${agent.position} ${selectedAgent.name === agent.name ? "selected" : ""}`} onClick={() => setSelectedAgent(agent)}><div className="agent-avatar">{agent.avatar}<span className={agent.status === "IDLE" ? "status-dot idle" : "status-dot"} /></div><div className="agent-label"><strong>{agent.name}</strong><small>{agent.role}</small><em className={statusStyle[agent.status]}>{agent.status}</em></div></button>)}
              <div className="meeting-table"><span>◆</span><span>◆</span><span>◆</span><b>AI SYNC</b></div></div>
          </div>
          <aside className="activity-panel"><div className="section-heading"><div><p className="eyebrow">LIVE FEED</p><h2>Recent Activity</h2></div><button>•••</button></div><div className="activity-list">{activities.map((item) => <article key={item.agent}><div className={`activity-icon ${item.tone}`}>✦</div><p><b>{item.agent}</b> {item.action}<span>{item.time}</span></p></article>)}</div><button className="view-all" onClick={() => setActivePage("Agent Activity")}>Lihat semua aktivitas <span>→</span></button>
            <div className="agent-focus"><p className="eyebrow">AGENT IN FOCUS</p><div><div className="focus-avatar">{selectedAgent.avatar}</div><span><b>{selectedAgent.name}</b><small>{selectedAgent.detail}</small></span></div><div className="focus-status"><span>Status sekarang</span><b className={statusStyle[selectedAgent.status]}>{selectedAgent.status}</b></div></div>
          </aside></section>
        </>}
      </section>
    </main>
  );
}
