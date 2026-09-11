import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  BrainCircuit,
  Calculator,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Flame,
  Gauge,
  Lightbulb,
  Link2,
  LockKeyhole,
  Menu,
  MessageCircle,
  Network,
  Play,
  Plus,
  Radio,
  Search,
  Sparkles,
  Target,
  Trophy,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type View = "overview" | "aulas" | "praticar" | "ferramentas" | "cronograma" | "comunidade";

type IconType = typeof Atom;

const navItems: { id: View; label: string; icon: IconType }[] = [
  { id: "overview", label: "Visão geral", icon: Compass },
  { id: "aulas", label: "Aulas", icon: BookOpen },
  { id: "praticar", label: "Praticar", icon: Target },
  { id: "ferramentas", label: "Ferramentas", icon: Network },
  { id: "cronograma", label: "Cronograma", icon: CalendarDays },
  { id: "comunidade", label: "Comunidade", icon: MessageCircle },
];

const lessons = [
  { title: "Leis de Newton sem decoreba", subject: "Mecânica", duration: "18 min", progress: 72, tone: "violet" },
  { title: "Como interpretar gráficos de movimento", subject: "Cinemática", duration: "24 min", progress: 38, tone: "cyan" },
  { title: "Energia: do skate à montanha-russa", subject: "Energia", duration: "16 min", progress: 0, tone: "amber" },
];

const studyPlan = [
  { day: "Hoje", title: "Revisar vetores e grandezas", meta: "Aula + 5 questões", done: true },
  { day: "Amanhã", title: "Leis de Newton", meta: "Vídeo de 18 min", done: false },
  { day: "Quinta", title: "Lista: dinâmica", meta: "10 questões comentadas", done: false },
];

const questions = [
  { topic: "Mecânica", title: "Por que a força normal não é sempre igual ao peso?", replies: 12, time: "há 8 min" },
  { topic: "Eletrodinâmica", title: "Como saber o sentido da corrente no circuito?", replies: 7, time: "há 24 min" },
  { topic: "Óptica", title: "Lente convergente pode formar imagem virtual?", replies: 4, time: "há 1 h" },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? "brand-mark-compact" : ""}`}>
      <div className="brand-orbit"><Atom size={compact ? 17 : 20} strokeWidth={2.3} /></div>
      {!compact && <span>Edivan <strong>PRO</strong></span>}
    </div>
  );
}

function Pill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "green" | "purple" | "amber" }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

function ProgressBar({ value, color = "violet" }: { value: number; color?: string }) {
  return <div className="progress-track"><div className={`progress-fill progress-${color}`} style={{ width: `${value}%` }} /></div>;
}

function Overview({ onNavigate, isAuthenticated }: { onNavigate: (view: View) => void; isAuthenticated: boolean }) {
  return (
    <div className="content-stack">
      <section className="welcome-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <Pill tone="purple"><Sparkles size={13} /> Seu próximo passo</Pill>
          <h1>A Física está em tudo.<br /><em>Aprenda a enxergar.</em></h1>
          <p>Uma jornada clara, prática e inteligente para você transformar fórmulas em compreensão.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => onNavigate("aulas")}><Play size={16} fill="currentColor" /> Continuar estudando</button>
            <button className="button button-ghost-light" onClick={() => onNavigate("cronograma")}>Ver meu plano <ArrowRight size={16} /></button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-large" />
          <div className="orbit orbit-small" />
          <div className="hero-atom"><Atom size={94} strokeWidth={1.1} /></div>
          <div className="formula formula-one">F = m · a</div>
          <div className="formula formula-two">ΔE = hf</div>
          <div className="formula formula-three">v = Δs / Δt</div>
          <div className="floating-dot dot-one" /><div className="floating-dot dot-two" /><div className="floating-dot dot-three" />
        </div>
      </section>

      {!isAuthenticated && <section className="auth-banner">
        <div className="auth-banner-icon"><LockKeyhole size={19} /></div>
        <div><strong>Salve seu progresso e personalize sua jornada</strong><span>Entre gratuitamente para acompanhar aulas, metas e conquistas.</span></div>
        <button className="button button-small button-dark" onClick={startLogin}>Entrar na plataforma <ArrowRight size={15} /></button>
      </section>}

      <section className="section-heading-row">
        <div><span className="eyebrow">Sua jornada</span><h2>Continue de onde parou</h2></div>
        <button className="text-button" onClick={() => onNavigate("aulas")}>Ver todas as aulas <ChevronRight size={16} /></button>
      </section>
      <section className="lesson-grid">
        {lessons.map((lesson, index) => (
          <article className={`lesson-card lesson-${lesson.tone}`} key={lesson.title} onClick={() => onNavigate("aulas")}>
            <div className="lesson-art"><div className="art-grid" /><span className="lesson-number">0{index + 1}</span><div className="lesson-art-icon">{index === 0 ? <Zap /> : index === 1 ? <Waves /> : <Gauge />}</div><span className="play-circle"><Play size={16} fill="currentColor" /></span></div>
            <div className="lesson-body"><div className="lesson-topline"><Pill>{lesson.subject}</Pill><span className="duration"><Clock3 size={13} /> {lesson.duration}</span></div><h3>{lesson.title}</h3><div className="lesson-progress"><div><span>{lesson.progress > 0 ? `${lesson.progress}% concluído` : "Ainda não iniciado"}</span><strong>{lesson.progress}%</strong></div><ProgressBar value={lesson.progress} color={lesson.tone} /></div></div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel plan-panel">
          <div className="panel-heading"><div><span className="eyebrow">Plano da semana</span><h2>Rota de Domínio</h2></div><button className="icon-button" aria-label="Abrir cronograma" onClick={() => onNavigate("cronograma")}><ArrowRight size={17} /></button></div>
          <div className="plan-list">{studyPlan.map((item) => <div className={`plan-item ${item.done ? "plan-done" : ""}`} key={item.title}><div className="plan-check">{item.done ? <Check size={14} /> : <span />}</div><div className="plan-item-copy"><span>{item.day}</span><strong>{item.title}</strong><small>{item.meta}</small></div><ChevronRight className="plan-chevron" size={16} /></div>)}</div>
          <button className="button button-outline full-width" onClick={() => onNavigate("cronograma")}>Abrir cronograma completo</button>
        </article>
        <article className="panel progress-panel">
          <div className="panel-heading"><div><span className="eyebrow">Painel de evolução</span><h2>Seu progresso</h2></div><Trophy className="heading-accent" size={22} /></div>
          <div className="progress-score"><div className="score-ring"><div><strong>68</strong><span>%</span></div></div><div><strong className="score-title">Bom ritmo, continue!</strong><p>Você estudou mais que 74% dos alunos esta semana.</p></div></div>
          <div className="stats-row"><div><strong>12</strong><span>aulas vistas</span></div><div><strong>86</strong><span>questões feitas</span></div><div><strong>4</strong><span>dias seguidos</span></div></div>
          <button className="button button-soft full-width" onClick={() => onNavigate("praticar")}><Flame size={16} /> Ver análise detalhada</button>
        </article>
      </section>

      <section className="real-life-banner" onClick={() => onNavigate("comunidade")}>
        <div className="real-life-copy"><Pill tone="amber"><Lightbulb size={13} /> Física Fora do Quadro</Pill><h2>Por que o celular esquenta quando você joga?</h2><p>Descubra a física por trás de situações que acontecem com você todos os dias.</p><button className="text-button text-button-light">Explorar curiosidade <ArrowRight size={16} /></button></div><div className="phone-illustration"><div className="phone-frame"><div className="phone-screen"><div className="phone-sun" /><div className="phone-wave" /></div></div><div className="phone-spark spark-a">+</div><div className="phone-spark spark-b">×</div></div>
      </section>
    </div>
  );
}

function AulasView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <div className="content-stack"><div className="page-intro"><div><span className="eyebrow">Aprender</span><h1>Biblioteca de aulas</h1><p>Conteúdo direto ao ponto, com exemplos que fazem sentido.</p></div><button className="button button-primary" onClick={() => onNavigate("cronograma")}><Sparkles size={16} /> Montar minha trilha</button></div><div className="filter-row"><button className="filter-chip filter-active">Tudo</button><button className="filter-chip">Mecânica</button><button className="filter-chip">Energia</button><button className="filter-chip">Eletromagnetismo</button><button className="filter-chip">ENEM</button><div className="search-box"><Search size={16} /><input placeholder="Buscar aula" /></div></div><div className="course-grid">{[...lessons, { title: "Potência elétrica sem mistério", subject: "Eletrodinâmica", duration: "21 min", progress: 0, tone: "green" }].map((lesson, index) => <article className={`lesson-card lesson-${lesson.tone}`} key={lesson.title} onClick={() => onNavigate("aulas")}><div className="lesson-art"><div className="art-grid" /><span className="lesson-number">0{index + 1}</span><div className="lesson-art-icon">{index % 2 === 0 ? <Zap /> : <Atom />}</div><span className="play-circle"><Play size={16} fill="currentColor" /></span></div><div className="lesson-body"><div className="lesson-topline"><Pill>{lesson.subject}</Pill><span className="duration"><Clock3 size={13} /> {lesson.duration}</span></div><h3>{lesson.title}</h3><div className="lesson-progress"><div><span>{lesson.progress ? `${lesson.progress}% concluído` : "Aula recomendada"}</span><strong>{lesson.progress}%</strong></div><ProgressBar value={lesson.progress} color={lesson.tone} /></div></div></article>)}</div></div>;
}

function PracticeView() {
  const [selected, setSelected] = useState<number | null>(null);
  return <div className="content-stack"><div className="page-intro"><div><span className="eyebrow">Praticar</span><h1>Arena de Questões</h1><p>Treine, entenda seus erros e transforme dificuldade em domínio.</p></div><div className="streak-badge"><Flame size={17} /><strong>4 dias</strong><span>de sequência</span></div></div><div className="practice-layout"><section className="panel challenge-panel"><div className="challenge-top"><Pill tone="purple">Desafio rápido</Pill><span>Questão 01 de 05</span></div><h2>Um corpo de massa 2 kg parte do repouso e sofre uma força resultante constante de 10 N. Qual é sua aceleração?</h2><div className="options">{["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"].map((option, index) => <button className={`answer-option ${selected === index ? "answer-selected" : ""}`} key={option} onClick={() => setSelected(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div><div className="challenge-footer"><span><Clock3 size={14} /> sem pressão: 02:45</span><button className="button button-primary" disabled={selected === null}>Responder <ArrowRight size={15} /></button></div></section><aside className="panel skill-panel"><span className="eyebrow">Mapa de domínio</span><h2>Seu desempenho por tema</h2>{[["Mecânica", 82, "violet"], ["Cinemática", 64, "cyan"], ["Energia", 47, "amber"], ["Eletrodinâmica", 31, "green"]].map(([name, value, color]) => <div className="skill-row" key={name as string}><div><span>{name}</span><strong>{value}%</strong></div><ProgressBar value={value as number} color={color as string} /></div>)}<button className="button button-soft full-width">Ver relatório completo</button></aside></div></div>;
}

function ToolsView() {
  const [calculator, setCalculator] = useState("0");
  const [nodes, setNodes] = useState(["Mecânica", "Força", "Movimento"]);
  const append = (value: string) => setCalculator((current) => current === "0" ? value : current + value);
  const clear = () => setCalculator("0");
  return <div className="content-stack"><div className="page-intro"><div><span className="eyebrow">Laboratório de Estudos</span><h1>Ferramentas que pensam com você</h1><p>Organize ideias, calcule com segurança e experimente novos caminhos.</p></div></div><div className="tools-grid"><section className="panel mindmap-panel"><div className="panel-heading"><div><Pill tone="purple"><Network size={13} /> Constelação de Ideias</Pill><h2>Mapa mental de Mecânica</h2></div><button className="icon-button" onClick={() => setNodes([...nodes, `Ideia ${nodes.length - 2}`])} aria-label="Adicionar nó"><Plus size={17} /></button></div><div className="mindmap-canvas"><div className="mindmap-line line-a" /><div className="mindmap-line line-b" /><div className="mindmap-line line-c" />{nodes.map((node, index) => <button className={`mind-node node-${index}`} key={`${node}-${index}`} onClick={() => setNodes(nodes.filter((_, itemIndex) => itemIndex !== index))}>{node}<span>×</span></button>)}<div className="mindmap-hint"><Plus size={14} /> clique em + para adicionar</div></div><div className="tool-footer"><span><Check size={14} /> Salvo agora</span><button className="text-button">Abrir editor completo <ArrowRight size={15} /></button></div></section><section className="panel calculator-panel"><div className="panel-heading"><div><Pill tone="green"><Calculator size={13} /> Bancada PRO</Pill><h2>Calculadora de Física</h2></div><span className="calculator-status">Pronta</span></div><div className="calculator-display"><span>Resultado</span><strong>{calculator}</strong></div><div className="calculator-keys">{["C", "(", ")", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "π", "="].map((key) => <button className={key === "=" ? "key-equals" : key === "C" ? "key-clear" : ""} key={key} onClick={() => key === "C" ? clear() : key === "=" ? setCalculator((current) => { try { return String(Function(`return ${current.replace("×", "*").replace("÷", "/")}`)()); } catch { return "Erro"; } }) : key === "π" ? append("3.14159") : append(key)}>{key}</button>)}</div><div className="unit-note"><Gauge size={14} /> As unidades aparecem no seu resultado.</div></section></div></div>;
}

function ScheduleView() {
  const [profile, setProfile] = useState("Pouco tempo");
  const profiles = ["Pouco tempo", "Começando do zero", "Reta final", "Alto desempenho"];
  return <div className="content-stack"><div className="page-intro"><div><span className="eyebrow">Personalização</span><h1>Rota de Domínio</h1><p>Um plano que se adapta à sua rotina, não o contrário.</p></div><button className="button button-primary"><Sparkles size={16} /> Recalcular plano</button></div><section className="profile-selector"><span className="eyebrow">Qual é o seu momento?</span><div className="profile-options">{profiles.map((item) => <button className={`profile-option ${profile === item ? "profile-selected" : ""}`} key={item} onClick={() => setProfile(item)}><span className="profile-option-dot" />{item}</button>)}</div></section><div className="schedule-layout"><section className="panel calendar-panel"><div className="calendar-top"><div><span className="eyebrow">Setembro 2026</span><h2>Semana 2 <span>·</span> Fundamentos</h2></div><div className="calendar-nav"><button className="icon-button"><ChevronRight size={16} className="rotate-180" /></button><button className="icon-button"><ChevronRight size={16} /></button></div></div><div className="week-days">{["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"].map((day, index) => <div className={index === 1 ? "today-column" : ""} key={day}><span>{day}</span><strong>{14 + index}</strong></div>)}</div><div className="calendar-events"><div className="calendar-event event-purple" style={{ gridColumn: "1 / 3" }}><span>08:00</span><strong>Vetores e grandezas</strong><small>Aula · 20 min</small></div><div className="calendar-event event-cyan" style={{ gridColumn: "3 / 5" }}><span>18:30</span><strong>Leis de Newton</strong><small>Prática · 30 min</small></div><div className="calendar-event event-amber" style={{ gridColumn: "5 / 8" }}><span>Sábado</span><strong>Lista de dinâmica</strong><small>10 questões</small></div></div></section><aside className="panel goal-panel"><div className="goal-icon"><Target size={20} /></div><span className="eyebrow">Meta do mês</span><h2>Dominar Mecânica</h2><p>Você está a 3 sessões de completar o primeiro marco.</p><div className="goal-progress"><strong>72%</strong><ProgressBar value={72} color="violet" /></div><div className="goal-milestone"><Award size={16} /><span>Próximo marco: <strong>Base sólida</strong></span></div></aside></div></div>;
}

function CommunityView() {
  return <div className="content-stack"><div className="page-intro"><div><span className="eyebrow">Ponto de Apoio</span><h1>Dúvidas que viram aprendizado</h1><p>Pergunte, compartilhe seu raciocínio e aprenda com a comunidade.</p></div><button className="button button-primary"><Plus size={16} /> Fazer uma pergunta</button></div><div className="community-layout"><section className="panel questions-panel"><div className="panel-heading"><div><Pill tone="purple"><MessageCircle size={13} /> Comunidade</Pill><h2>Perguntas recentes</h2></div><button className="text-button">Ver todas <ChevronRight size={15} /></button></div>{questions.map((question) => <div className="question-item" key={question.title}><div className="question-avatar">{question.topic.charAt(0)}</div><div className="question-copy"><div><Pill>{question.topic}</Pill><small>{question.time}</small></div><strong>{question.title}</strong><span><MessageCircle size={13} /> {question.replies} respostas</span></div><ChevronRight size={17} /></div>)}</section><aside className="panel ai-panel"><div className="ai-orb"><BrainCircuit size={24} /></div><Pill tone="green">Em breve</Pill><h2>Edivan IA</h2><p>Seu tutor de Física baseado no conteúdo do professor, disponível para explicar conceitos passo a passo.</p><button className="button button-dark full-width">Quero ser avisado <ArrowRight size={15} /></button></aside></div><section className="real-life-banner compact-banner"><div className="real-life-copy"><Pill tone="amber"><Lightbulb size={13} /> Física Fora do Quadro</Pill><h2>Envie um fenômeno para explicar</h2><p>O que você vê no cotidiano também pode ser uma ótima pergunta de Física.</p></div><div className="phenomenon-orbit"><Atom size={66} /></div></section></div>;
}

export default function Home() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [view, setView] = useState<View>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const currentLabel = useMemo(() => navItems.find((item) => item.id === view)?.label ?? "Visão geral", [view]);

  const renderView = () => {
    if (view === "overview") return <Overview onNavigate={setView} isAuthenticated={isAuthenticated} />;
    if (view === "aulas") return <AulasView onNavigate={setView} />;
    if (view === "praticar") return <PracticeView />;
    if (view === "ferramentas") return <ToolsView />;
    if (view === "cronograma") return <ScheduleView />;
    return <CommunityView />;
  };

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
      <div className="sidebar-top"><BrandMark /><button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Fechar menu"><X size={19} /></button></div>
      <div className="sidebar-section-label">Sua plataforma</div>
      <nav className="main-nav">{navItems.map((item) => { const Icon = item.icon; return <button className={`nav-item ${view === item.id ? "nav-active" : ""}`} key={item.id} onClick={() => { setView(item.id); setMobileNav(false); }}><Icon size={18} /><span>{item.label}</span>{item.id === "comunidade" && <span className="nav-notification">3</span>}</button>; })}</nav>
      <div className="sidebar-bottom"><div className="sidebar-callout"><div className="callout-icon"><Sparkles size={17} /></div><strong>Aprenda com estratégia</strong><span>Seu próximo marco está mais perto do que parece.</span><button onClick={() => setView("cronograma")}>Ver meu plano <ArrowRight size={14} /></button></div><div className="sidebar-user">{loading ? <div className="user-skeleton" /> : <><div className="avatar">{user?.name?.charAt(0) ?? "E"}</div><div className="user-info"><strong>{user?.name ?? "Aluno visitante"}</strong><span>{isAuthenticated ? "Aluno Edivan PRO" : "Explore a plataforma"}</span></div>{isAuthenticated ? <button className="more-button" onClick={logout} title="Sair">···</button> : <button className="more-button" onClick={startLogin} title="Entrar">↗</button>}</>}</div></div>
    </aside>
    {mobileNav && <button className="mobile-overlay" onClick={() => setMobileNav(false)} aria-label="Fechar menu" />}
    <main className="main-content"><header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu size={20} /></button><div className="breadcrumb"><span>Minha jornada</span><ChevronRight size={14} /><strong>{currentLabel}</strong></div></div><div className="topbar-actions"><button className="topbar-icon" aria-label="Dúvidas"><CircleHelp size={18} /></button><button className="topbar-icon notification-dot" aria-label="Notificações"><Radio size={18} /></button><div className="topbar-avatar">{user?.name?.charAt(0) ?? "E"}</div></div></header><div className="page-container">{renderView()}</div></main>
  </div>;
}
