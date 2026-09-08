"use client";

import { FormEvent, useState } from "react";

type Page = "Home" | "AI Office" | "Tasks" | "Customers" | "Reports" | "Settings";
type Status = "Online" | "Working" | "Chatting" | "Thinking";

type Agent = {
  name: string;
  role: string;
  status: Status;
  icon: string;
  desk: string;
  message: string;
  task: string;
};

const navigation: { label: Page; icon: string }[] = [
  { label: "Home", icon: "⌂" },
  { label: "AI Office", icon: "⚙" },
  { label: "Tasks", icon: "▣" },
  { label: "Customers", icon: "♟" },
  { label: "Reports", icon: "◔" },
  { label: "Settings", icon: "⚙" },
];

const agents: Agent[] = [
  { name: "AI Manager", role: "Manager", status: "Working", icon: "🤖", desk: "manager", message: "Semua agent on track! Ada 3 closing hari ini.", task: "Monitor performa, bagi tugas, update owner." },
  { name: "Sales Membership", role: "Sales", status: "Chatting", icon: "👨🏻‍💼", desk: "membership", message: "Halo! Yuk join membership ke MAINku. Banyak banget keuntungannya! 🔥", task: "Pitching membership ke customer." },
  { name: "Sales Promo", role: "Sales", status: "Working", icon: "👩🏻‍💼", desk: "promo", message: "Ada promo top up! Diskon sampai 50% nih, buruan! 🔥", task: "Menawarkan promo top up & event." },
  { name: "Creative Agent", role: "Creative", status: "Working", icon: "👩🏻‍🎨", desk: "creative", message: "Visual promo baru sedang masuk proses render.", task: "Bikin konten, desain, caption, brief." },
  { name: "CS Agent", role: "Customer Service", status: "Online", icon: "👩🏻‍💻", desk: "cs", message: "Mau tanya apa? Siap bantu Kak! 😊", task: "Jawab pertanyaan & kelola ticket." },
  { name: "Support Hub", role: "Support", status: "Thinking", icon: "👨🏻‍💻", desk: "support", message: "Cek tiket customer... Update ke Google Sheets. Siap, Kak!", task: "Cek tiket, update Google Sheets, follow up." },
];

const activities = [
  ["☁", "Sales Membership", "Mengirim pesan ke customer", "+2 chat · 2m ago"],
  ["🔥", "Sales Promo", "Memberikan penawaran promo", "+1 chat · 4m ago"],
  ["✺", "Creative Agent", "Selesai membuat desain konten", "+1 task · 6m ago"],
  ["◉", "CS Agent", "Menjawab pertanyaan customer", "+3 chat · 7m ago"],
  ["🤖", "AI Manager", "Memberikan tugas baru", "+5 task · 12m ago"],
  ["M", "Astra", "Mengecek laporan performa harian", "+1 report · 12m ago"],
  ["♛", "Sales Membership", "Closing - Member Baru", "+Rp 49.000 · 15m ago"],
];

const chats = [
  ["Rizky", "Mau join membership, bisa?", "2m"],
  ["Dika", "Ada promo untuk MLBB?", "4m"],
  ["Sari", "Tanya harga diamond?", "7m"],
  ["Fajar", "Kapan promo berikutnya?", "10m"],
];

function StatusPill({ status }: { status: Status }) {
  return <span className={`status status-${status.toLowerCase()}`}>● {status}</span>;
}

function ComingSoon({ page, onHome }: { page: Page; onHome: () => void }) {
  return <section className="coming-soon"><span>MAINku AI OFFICE</span><h1>{page}</h1><p>Ruang kerja {page.toLowerCase()} siap dikembangkan. Untuk saat ini, semua data menggunakan dummy data.</p><button onClick={onHome}>← Kembali ke Home</button></section>;
}

export default function Home() {
  const [page, setPage] = useState<Page>("Home");
  const [activeAgent, setActiveAgent] = useState<Agent>(agents[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  function navigate(nextPage: Page) { setPage(nextPage); setMenuOpen(false); }
  function selectAgent(agent: Agent) { setActiveAgent(agent); setToast(`${agent.name} sedang ${agent.status.toLowerCase()}.`); }
  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setToast(`Pesan untuk ${activeAgent.name} terkirim.`);
    setMessage("");
  }

  return <main className="blueprint-app">
    <header className="app-header">
      <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Buka menu">☰</button>
      <button className="wordmark" onClick={() => navigate("Home")}><span className="cube">M</span><span><b>MAINKU<span>.COM</span></b><small>Top Up Game · Digital Product · Membership</small></span></button>
      <section className="astra-banner"><span className="astra-orb">🤖</span><div><b>AI Astra <i>●</i></b><p>Semua berjalan sesuai rencana, Boss! 5 agent aktif, 12 chat diproses, 3 closing hari ini.</p></div><em>⌁</em></section>
      <div className="header-status"><span>●</span> Office Online</div>
      <div className="clock"><b>16:24</b><small>08 Sep 2026</small></div>
      <div className="owner"><span>👨🏻‍💼</span><p><b>Owner</b><small>Pras</small></p></div>
    </header>

    <div className="dashboard-layout">
      <aside className={`left-rail ${menuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>×</button>
        <nav>{navigation.map((item) => <button key={item.label} className={page === item.label ? "active" : ""} onClick={() => navigate(item.label)}><i>{item.icon}</i>{item.label}</button>)}</nav>
        <div className="brand-card"><div className="brand-seal"><span>▰</span><b>M</b></div><p>“Top Up Aman<br />Harga Terbaik<br />Proses Cepat.”</p></div>
        <div className="goals"><h3>Today&apos;s Goal</h3><p><span>✓</span> New Member <b>12/20</b></p><p><span>✓</span> Sales <b>25/50</b></p><p><span>✓</span> Revenue <b>Rp 3,5jt / 10jt</b></p></div>
      </aside>
      {menuOpen && <button className="nav-overlay" onClick={() => setMenuOpen(false)} aria-label="Tutup menu" />}

      <section className="main-area">
        {page !== "Home" ? <ComingSoon page={page} onHome={() => navigate("Home")} /> : <>
          <div className="office-scene">
            <div className="scene-sign server-sign"><b>SERVER & DATABASE</b><p>✓ Google Sheets (Customer DB)<br />✓ Chat Automation<br />✓ Workflow Astra</p></div>
            <div className="scene-sign poster-one">PLAY<br />TOP UP<br />LEVEL UP <span>🎮</span></div>
            <div className="scene-sign poster-two">GAME<br />BUKAN<br />SEKEDAR<br />HIBURAN <span>🎮</span></div>
            <div className="scene-sign marketing-sign">MARKETING LAB <small>↗ ╱╲</small></div>
            <div className="neon-logo"><span>▰</span><b>MAINKU<span>.COM</span></b></div>
            <div className="floor-grid" />
            <div className="office-plant plant-a">☘</div><div className="office-plant plant-b">☘</div><div className="office-cat">🐈</div>
            {agents.map((agent) => <button key={agent.name} className={`desk ${agent.desk} ${activeAgent.name === agent.name ? "selected" : ""}`} onClick={() => selectAgent(agent)}>
              <div className="agent-callout"><b>{agent.name.toUpperCase()}</b><StatusPill status={agent.status} /></div><div className="speech">{agent.message}</div><div className="desk-top"><span className="monitor">⌁</span><span className="agent-face">{agent.icon}</span><span className="keyboard">⌨</span></div>
            </button>)}
            <div className="lounge"><b>MAINKU.COM</b><span>Play · Top Up</span></div>
          </div>
          <section className="agent-status"><h2>Status Agent</h2><div>{agents.map((agent) => <button key={agent.name} className={activeAgent.name === agent.name ? "selected" : ""} onClick={() => selectAgent(agent)}><span className="status-avatar">{agent.icon}</span><p><b>{agent.name}</b><StatusPill status={agent.status} /><small>{agent.task}</small></p><i>◆</i></button>)}</div></section>
        </>}</section>

      <aside className="right-rail"><section className="activity"><h2>Aktivitas Terbaru</h2>{activities.map(([icon, agent, action, meta]) => <article key={`${agent}-${action}`}><span>{icon}</span><p><b>{agent}</b>{action}<small>{meta}</small></p></article>)}</section><section className="chat"><h2>Live Chat Customer</h2>{chats.map(([name, text, time]) => <button key={name} onClick={() => { setChatOpen(true); setToast(`Membuka chat ${name}.`); }}><span>👤</span><p><b>{name}</b>{text}</p><time>{time}</time></button>)}<button className="all-chat" onClick={() => setChatOpen(true)}>Lihat Semua Chat →</button></section></aside>
    </div>
    <footer><span>●</span> Powered by GPT-6 Astra <i /> AI Multi-Agent System <i /> Google Sheets Integration <i /> Free / Affordable Tools <b>Bukan sekadar kerja, ini tim AI yang beneran bekerja! 🔥</b></footer>
    {chatOpen && <div className="chat-modal" role="dialog" aria-modal="true"><form onSubmit={sendMessage}><button type="button" className="modal-close" onClick={() => setChatOpen(false)}>×</button><span className="modal-avatar">{activeAgent.icon}</span><h2>Chat dengan {activeAgent.name}</h2><p>{activeAgent.message}</p><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tulis pesan untuk agent..." autoFocus /><button type="submit">Kirim pesan →</button></form></div>}
    {toast && <button className="toast" onClick={() => setToast("")}>{toast} ×</button>}
  </main>;
}
