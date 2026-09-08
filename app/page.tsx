"use client";

import { FormEvent, useState } from "react";

type Page = "Dashboard" | "AI Office" | "Customers" | "Tasks" | "Agent Activity" | "Reports";
type Status = "IDLE" | "THINKING" | "WORKING" | "CHATTING" | "DONE";

type Agent = {
  name: string;
  role: string;
  status: Status;
  icon: string;
  desk: string;
  message: string;
  task: string;
  activity: string;
  color: string;
};

const navigation: { label: Page; icon: string }[] = [
  { label: "Dashboard", icon: "▦" },
  { label: "AI Office", icon: "⌘" },
  { label: "Customers", icon: "♙" },
  { label: "Tasks", icon: "✓" },
  { label: "Agent Activity", icon: "◌" },
  { label: "Reports", icon: "▤" },
];

const agents: Agent[] = [
  { name: "AI Manager", role: "Command Center", status: "WORKING", icon: "manager", desk: "manager-desk", message: "Memprioritaskan 3 closing hari ini.", task: "Membagi task dan memantau performa tim.", activity: "Menerbitkan brief morning shift.", color: "#ff4d61" },
  { name: "Sales Membership", role: "Sales Desk", status: "CHATTING", icon: "membership", desk: "membership-desk", message: "Menghubungi member baru.", task: "Menawarkan benefit membership MAINku.", activity: "Membalas chat customer Rizky.", color: "#43c7ff" },
  { name: "Sales Promo", role: "Campaign Desk", status: "WORKING", icon: "promo", desk: "promo-desk", message: "Promo top up sedang berjalan.", task: "Mengoptimalkan campaign Payday 50%.", activity: "Menjadwalkan broadcast promo.", color: "#f26ec7" },
  { name: "Creative Agent", role: "Creative Lab", status: "DONE", icon: "creative", desk: "creative-desk", message: "Tiga visual promo sudah siap.", task: "Membuat desain, caption, dan creative brief.", activity: "Menyelesaikan banner Mobile Legends.", color: "#9d7dff" },
  { name: "Customer Service", role: "CS Desk", status: "CHATTING", icon: "cs", desk: "cs-desk", message: "Menjawab pertanyaan customer.", task: "Menangani chat dan ticket pelanggan.", activity: "Menyelesaikan ticket #2941.", color: "#ffad5b" },
  { name: "Support Hub", role: "Support Desk", status: "THINKING", icon: "support", desk: "support-desk", message: "Mengecek alur ticket baru.", task: "Verifikasi order dan update support queue.", activity: "Menganalisis issue top up terakhir.", color: "#49d9b1" },
];

const activities = [
  ["M", "AI Manager", "menerbitkan brief morning shift", "2 menit lalu"],
  ["S", "Sales Membership", "mengirim 2 pesan ke customer", "4 menit lalu"],
  ["P", "Sales Promo", "menjadwalkan campaign Payday", "8 menit lalu"],
  ["C", "Creative Agent", "menyelesaikan desain konten", "12 menit lalu"],
];

function StatusBadge({ status }: { status: Status }) {
  return <span className={`status-badge ${status.toLowerCase()}`}><i />{status}</span>;
}

function BlockyAvatar({ agent, owner = false }: { agent: Agent; owner?: boolean }) {
  return <div className={`blocky-avatar ${agent.icon} ${agent.status.toLowerCase()} ${owner ? "owner-avatar" : ""}`} style={{ "--agent-color": agent.color } as React.CSSProperties} aria-hidden="true">
    <span className="avatar-shadow" /><span className="avatar-leg left" /><span className="avatar-leg right" /><span className="avatar-torso" /><span className="avatar-arm left" /><span className="avatar-arm right" /><span className="avatar-head"><i /><i /><b /></span><span className="avatar-hair" />
  </div>;
}

function Workstation({ agent, selected, onSelect }: { agent: Agent; selected: boolean; onSelect: () => void }) {
  return <button className={`workstation ${agent.desk} ${selected ? "selected" : ""}`} onClick={onSelect} style={{ "--agent-color": agent.color } as React.CSSProperties}>
    <div className="agent-tag"><strong>{agent.name}</strong><StatusBadge status={agent.status} /></div>
    <div className="speech-bubble">{agent.message}</div>
    <div className="iso-chair"><span /><i /></div>
    <div className="iso-desk"><div className="monitor"><i /><b /></div><div className="monitor second"><i /><b /></div><span className="desk-light" /></div>
    <BlockyAvatar agent={agent} />
  </button>;
}

function OwnerStation() {
  const owner: Agent = { name: "Owner Pras", role: "Owner", status: "WORKING", icon: "owner", desk: "owner-desk", message: "Memberi prioritas task ke Manager.", task: "", activity: "", color: "#f1bf72" };
  return <div className="owner-station"><div className="owner-label"><b>OWNER ROOM</b><span>Task source</span></div><div className="owner-desk-furniture"><i /><i /><b /></div><BlockyAvatar agent={owner} owner /><div className="workflow-line"><span>OWNER</span><i /> <b>MANAGER</b></div></div>;
}

function DashboardOverview({ openOffice }: { openOffice: () => void }) {
  return <section className="dashboard-overview"><div className="dashboard-heading"><div><span>MAINKU.COM / COMMAND CENTER</span><h1>Selamat datang, Owner.</h1><p>Semua sistem virtual office sedang berjalan normal.</p></div><button onClick={openOffice}>Buka AI Office <b>→</b></button></div><div className="metric-grid"><article><small>Total Revenue</small><b>Rp 24.8M</b><span>↗ 12.4% bulan ini</span></article><article><small>Active Customers</small><b>1,284</b><span>↗ 8.2% minggu ini</span></article><article><small>Tasks Completed</small><b>43 / 50</b><span>86% task selesai</span></article></div><div className="dashboard-preview"><div className="preview-room"><div className="preview-neon">M</div><div className="preview-desk one" /><div className="preview-desk two" /><div className="preview-desk three" /><div className="preview-agents">{agents.slice(0, 3).map((agent) => <BlockyAvatar key={agent.name} agent={agent} />)}</div></div><div><span>LIVE WORKSPACE</span><h2>Virtual team Anda sudah siap bekerja.</h2><p>Masuk ke AI Office untuk melihat posisi, status, dan task aktif dari keenam agent.</p><button onClick={openOffice}>Lihat virtual office →</button></div></div></section>;
}

function PlaceholderPage({ page, back }: { page: Page; back: () => void }) {
  return <section className="placeholder-page"><span>MAINKU AI OFFICE</span><h1>{page}</h1><p>Halaman ini telah terhubung ke navigasi dashboard dan siap dikembangkan menggunakan data bisnis Anda.</p><button onClick={back}>← Kembali ke Dashboard</button></section>;
}

export default function Home() {
  const [page, setPage] = useState<Page>("Dashboard");
  const [activeAgent, setActiveAgent] = useState<Agent>(agents[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState("");
  const [chatText, setChatText] = useState("");

  const navigate = (nextPage: Page) => { setPage(nextPage); setMenuOpen(false); };
  const sendNote = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!chatText.trim()) return; setNote(`Pesan untuk ${activeAgent.name} terkirim.`); setChatText(""); };

  return <main className="office-app">
    <aside className={`sidebar ${menuOpen ? "open" : ""}`}><div className="sidebar-brand"><span className="brand-cube">M</span><div><b>MAINku<span>.com</span></b><small>AI OFFICE</small></div><button onClick={() => setMenuOpen(false)}>×</button></div><nav>{navigation.map((item) => <button key={item.label} className={page === item.label ? "active" : ""} onClick={() => navigate(item.label)}><i>{item.icon}</i>{item.label}</button>)}</nav><div className="sidebar-pulse"><i /> <span>OFFICE ONLINE</span><b>6 AGENTS</b></div><div className="account"><span>OP</span><p><b>Owner Pras</b><small>MAINku.com</small></p></div></aside>
    {menuOpen && <button className="menu-overlay" onClick={() => setMenuOpen(false)} aria-label="Tutup menu" />}
    <section className="app-content"><header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(true)}>☰</button><div><small>VIRTUAL OPERATIONS / LIVE</small><h1>{page}</h1></div><div className="astra"><span>AI</span><p><b>Astra Command</b><small>Semua agent berjalan sesuai rencana.</small></p></div><div className="top-avatar">OP</div></header>
      {page === "Dashboard" && <DashboardOverview openOffice={() => navigate("AI Office")} />}
      {page === "AI Office" && <><section className="office-layout"><div className="office-main"><div className="office-heading"><div><span>LIVE VIRTUAL OFFICE / ISOMETRIC VIEW</span><h2>MAINku Operations Floor</h2></div><p><i /> 6 agent online</p></div><div className="office-room isometric-office"><div className="room-shell"><div className="wall-light left" /><div className="wall-light right" /><div className="room-logo"><b>M</b><span>MAINku.com</span></div><div className="wall-screen server"><b>SERVER<br />AI ROOM</b><i /><i /><i /></div><div className="wall-screen creative"><b>CREATIVE<br />STUDIO</b><i /><i /></div><div className="wall-poster one">PLAY<br />TOP UP<br /><em>LEVEL UP</em></div><div className="wall-poster two">BUILD<br />YOUR<br /><em>GAME</em></div><div className="floor" /><OwnerStation /><div className="meeting-zone"><span>MEETING ROOM</span><div className="meeting-table"><i /><i /><i /><i /><b>TEAM SYNC</b></div></div><div className="lounge-zone"><span>LOUNGE</span><div className="lounge-sofa"><i /><i /></div><div className="lounge-table" /></div><div className="plant plant-one"><i /><i /><i /></div><div className="plant plant-two"><i /><i /><i /></div>{agents.map((agent) => <Workstation key={agent.name} agent={agent} selected={activeAgent.name === agent.name} onSelect={() => setActiveAgent(agent)} />)}</div></div><div className="office-hint">Klik avatar atau workstation untuk melihat detail agent</div></div>
        <aside className="agent-panel"><div className="panel-label">AGENT DETAIL</div><div className="agent-portrait" style={{ "--agent-color": activeAgent.color } as React.CSSProperties}><BlockyAvatar agent={activeAgent} /></div><h2>{activeAgent.name}</h2><p className="agent-role">{activeAgent.role}</p><StatusBadge status={activeAgent.status} /><div className="detail-block"><span>CURRENT TASK</span><p>{activeAgent.task}</p></div><div className="detail-block progress-block"><span>PROGRESS</span><b>{activeAgent.name === "AI Manager" ? "40" : activeAgent.status === "DONE" ? "100" : "65"}%</b><i><em style={{ width: activeAgent.name === "AI Manager" ? "40%" : activeAgent.status === "DONE" ? "100%" : "65%", background: activeAgent.color }} /></i></div><div className="detail-block"><span>RECENT ACTIVITY</span><p>{activeAgent.activity}</p></div><div className="agent-actions"><button onClick={() => setNote(`Membuka task ${activeAgent.name}.`)}>View Task</button><button onClick={() => document.getElementById("agent-note")?.focus()}>Chat</button></div><form onSubmit={sendNote}><label htmlFor="agent-note">Kirim instruksi</label><div><input id="agent-note" value={chatText} onChange={(event) => setChatText(event.target.value)} placeholder="Tulis instruksi..." /><button type="submit">→</button></div></form></aside></section><section className="office-bottom"><article><span>TASK OVERVIEW</span><h3>Campaign Membership</h3><p>Owner → Manager → Sales Membership</p><div><b>40%</b><i><em /></i><small>8 task aktif</small></div></article><article><span>AGENT STATUS</span><div className="status-list">{agents.map((agent) => <button key={agent.name} onClick={() => setActiveAgent(agent)}><i style={{ background: agent.color }} /><b>{agent.name}</b><StatusBadge status={agent.status} /></button>)}</div></article><article><span>RECENT ACTIVITY</span><div className="activity-list">{activities.slice(0, 3).map(([key, actor, action, time]) => <p key={key}><i>{key}</i><b>{actor}</b> {action}<small>{time}</small></p>)}</div></article></section></>}
      {page !== "Dashboard" && page !== "AI Office" && <PlaceholderPage page={page} back={() => navigate("Dashboard")} />}
    </section>
    {note && <button className="toast" onClick={() => setNote("")}>{note} <b>×</b></button>}
  </main>;
}
