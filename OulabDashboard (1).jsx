import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bus } from "lucide-react";

export default function OulabDashboard() {
  const [overall, setOverall] = useState(72);
  const [phase1, setPhase1] = useState(88);
  const [phase2, setPhase2] = useState(46);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTrack, setActiveTrack] = useState("");
  const [countdown, setCountdown] = useState("");

  const busPreparation = [
    { label: "Purchase of the bus", value: 100, status: "Done" },
    { label: "Internal planning & structure", value: 100, status: "Done" },
    { label: "Interior design", value: 20, status: "In Progress" },
    { label: "Interior execution", value: 0, status: "Not Started" },
    { label: "Tools & Equipment", value: 0, status: "Not Started" },
  ];

  const operationalPlans = [
    { label: "Programs methodology", value: 100, status: "Done" },
    { label: "Operational & Executive manual", value: 90, status: "In Progress" },
    { label: "Procedural manual", value: 30, status: "In Progress" },
    { label: "Training kits", value: 95, status: "In Progress" },
    { label: "Human resources", value: 70, status: "In Progress" },
    { label: "Strategic partnerships", value: 20, status: "In Progress" },
    { label: "Sustainability plan", value: 0, status: "Not Started" },
  ];

  const [routeProgress, setRouteProgress] = useState(82);
  const [lang, setLang] = useState("en");
  const [animKey, setAnimKey] = useState(0);

  // Re-trigger animations when language changes
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [lang]);

  // Countdown to Nov 20, 2025
  useEffect(() => {
    const launchDate = new Date("2025-11-20T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      if (distance < 0) {
        setCountdown(lang === "ar" ? "تم الإطلاق!" : "Launched!");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const today = new Date().toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { dateStyle: "full" });

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="relative min-h-screen w-full bg-[#0C0C0C] text-white font-salford overflow-hidden">
      <BrandStyles />

      {/* Watermark background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.04] pointer-events-none select-none"
        style={{
          backgroundImage:
            "url('https://drive.google.com/uc?export=view&id=1L8mzDwPyCXRl1nGMieRGDrQjUJhxlon0')",
        }}
      />

      {/* Language Switch */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          className={`px-3 py-1 rounded-full text-xs ${lang === "en" ? "bg-white text-black" : "bg-white/10 text-white"}`}
          onClick={() => setLang("en")}
        >EN</button>
        <button
          className={`px-3 py-1 rounded-full text-xs ${lang === "ar" ? "bg-white text-black" : "bg-white/10 text-white"}`}
          onClick={() => setLang("ar")}
        >AR</button>
      </div>

      {/* Header */}
      <header className="px-5 md:px-10 pt-6 pb-2 flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#7941E5] via-[#9324C6] to-[#F9326F]" />
          <div>
            <h1 className="text-xl md:text-2xl font-ada">{lang === "ar" ? "لوحة مؤشرات أولاب" : "Oulab Dashboard"}</h1>
            <p className="text-xs text-white/60">{lang === "ar" ? "نظرة فورية على تقدم المشروع ومسارات العمل" : "Instant view on project progress and tracks"}</p>
          </div>
        </div>
      </header>

      {/* Date and Countdown */}
      <div className="text-center py-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-ada mb-1">{today}</h2>
        <p className="text-sm md:text-base text-white/80">{lang === "ar" ? "العد التنازلي حتى الإطلاق 20 نوفمبر" : "Countdown to Launch — Nov 20"}</p>
        <p className="text-xl md:text-2xl font-mono mt-2">{countdown}</p>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowDetails(false)}>
          <div className="bg-white text-black p-6 rounded-xl w-[min(90vw,520px)]" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-semibold mb-2">{lang === "ar" ? "تفاصيل" : "Details"} — {activeTrack}</h4>
            <p className="mb-4">...</p>
            <button className="mt-2 text-sm underline" onClick={() => setShowDetails(false)}>{lang === "ar" ? "إغلاق" : "Close"}</button>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <main className="px-5 md:px-10 pb-10 grid grid-cols-1 xl:grid-cols-3 gap-6 relative z-10">
        {/* KPI Circles */}
        <section className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="card-title">{lang === "ar" ? "نسبة إنجاز مشروع أولاب" : "Overall Project Progress"}</h3>
            <div className="flex items-center justify-center py-6">
              <ProgressCircle value={overall} size={170} stroke={16} animKey={animKey} />
            </div>
          </Card>
          <Card>
            <h3 className="card-title">{lang === "ar" ? "المرحلة الأولى — الإعداد والتجهيز" : "Phase I — Preparation"}</h3>
            <div className="flex items-center justify-center py-6">
              <ProgressCircle value={phase1} size={170} stroke={16} animKey={animKey} />
            </div>
          </Card>
          <Card>
            <h3 className="card-title">{lang === "ar" ? "المرحلة الثانية" : "Phase II"}</h3>
            <div className="flex items-center justify-center py-6">
              <ProgressCircle value={phase2} size={170} stroke={16} animKey={animKey} />
            </div>
          </Card>

          {/* Bus Tracks Two Columns */}
          <Card className="md:col-span-3">
            <h3 className="card-title mb-4">{lang === "ar" ? "مسارات الباص" : "Bus Tracks"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-ada mb-2">{lang === "ar" ? "مرحلة تهيئة الباص" : "Bus Preparation"}</h4>
                <div className="space-y-4">
                  {busPreparation.map((t, i) => (
                    <TrackLine
                      key={`prep-${i}-${animKey}`}
                      label={t.label}
                      value={t.value}
                      status={t.status}
                      lang={lang}
                      onDetails={() => { setActiveTrack(t.label); setShowDetails(true); }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-ada mb-2">{lang === "ar" ? "مرحلة إعداد الخطط التشغيلية والتنفيذية" : "Operational & Executive Plans"}</h4>
                <div className="space-y-4">
                  {operationalPlans.map((t, i) => (
                    <TrackLine
                      key={`ops-${i}-${animKey}`}
                      label={t.label}
                      value={t.value}
                      status={t.status}
                      lang={lang}
                      onDetails={() => { setActiveTrack(t.label); setShowDetails(true); }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Control Panel */}
        <section className="xl:col-span-1">
          <Card>
            <h3 className="card-title mb-6">{lang === "ar" ? "لوحة التحكم (تفاعلية)" : "Control Panel"}</h3>
            <ControlSlider label={lang === "ar" ? "إنجاز مشروع أولاب" : "Overall Progress"} value={overall} setValue={setOverall} />
            <ControlSlider label={lang === "ar" ? "المرحلة الأولى — الإعداد والتجهيز" : "Phase I Progress"} value={phase1} setValue={setPhase1} />
            <ControlSlider label={lang === "ar" ? "المرحلة الثانية" : "Phase II Progress"} value={phase2} setValue={setPhase2} />
            <div className="h-px bg-white/10 my-6" />
            <ControlSlider label={lang === "ar" ? "موقع الباص باتجاه ميناء جدة" : "Bus Position to Jeddah"} value={routeProgress} setValue={setRouteProgress} />
          </Card>
        </section>

        {/* Bus Route */}
        <section className="xl:col-span-3">
          <Card>
            <h3 className="card-title mb-3">{lang === "ar" ? "خط الرحلة — الصين ← ميناء جدة" : "Route — China → Jeddah"}</h3>
            <div className="relative w-full">
              <div className="flex items-center justify-between text-sm text-white/80 mb-2">
                <span>{lang === "ar" ? "الصين" : "China"}</span>
                <span>{lang === "ar" ? "جدة" : "Jeddah"}</span>
              </div>
              <div className="relative h-12">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    key={`route-fill-${animKey}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${routeProgress}%` }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#7941E5] via-[#9324C6] to-[#F9326F]"
                  />
                </div>
                <motion.div
                  key={`bus-${animKey}`}
                  initial={{ x: 0 }}
                  animate={{ x: `${routeProgress}%` }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute -top-1"
                  style={{ left: lang === "ar" ? `${routeProgress}%` : "auto", right: lang === "en" ? `${100 - routeProgress}%` : "auto", transform: "translateX(-50%)" }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    className="flex items-center gap-2"
                  >
                    <div className="p-2 rounded-xl bg-white text-[#0C0C0C] shadow-lg">
                      <Bus className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-lg backdrop-blur">{lang === "ar" ? "باص أولاب" : "Oulab Bus"}</span>
                  </motion.div>
                </motion.div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                <span>{lang === "ar" ? "تاريخ الشراء" : "Purchase Date"}</span>
                <span>{routeProgress}%</span>
                <span>{lang === "ar" ? "تاريخ الوصول — 7 سبتمبر" : "Arrival Date — Sept 7"}</span>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-2xl p-5 md:p-6 bg-white/5 backdrop-blur border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] " +
        className
      }
    >
      {children}
    </div>
  );
}

function ControlSlider({ label, value, setValue }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-white/80">{label}</label>
        <span className="text-xs text-white/60">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="w-full accent-[#F9326F]"
      />
    </div>
  );
}

function TrackLine({ label, value, status, onDetails, lang }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-[#EF883E]" />
          <p className="text-sm">{label}</p>
        </div>
        <div className="text-xs text-white/70 flex items-center gap-3">
          <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{status}</span>
          {status === "In Progress" && (
            <span onClick={onDetails} className="underline cursor-pointer">
              {lang === "ar" ? "التفاصيل" : "Details"}
            </span>
          )}
          <span>{value}%</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          key={`${label}-${value}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#7941E5] via-[#9324C6] to-[#F9326F]"
        />
      </div>
    </div>
  );
}

function ProgressCircle({ value, size = 160, stroke = 14, animKey }) {
  const radius = useMemo(() => (size - stroke) / 2, [size, stroke]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const offset = useMemo(() => circumference - (value / 100) * circumference, [circumference, value]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" key={`circle-${animKey}-${value}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeLinecap="round"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7941E5" />
            <stop offset="50%" stopColor="#9324C6" />
            <stop offset="100%" stopColor="#F9326F" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl md:text-4xl font-ada">{value}%</div>
        <div className="text-[10px] uppercase tracking-widest text-white/60">Progress</div>
      </div>
    </div>
  );
}

function BrandStyles() {
  return (
    <style>{`
      .font-salford { font-family: sans-serif; }
      .font-ada { font-family: sans-serif; }
      .card-title { font-family: sans-serif; font-size: 1.1rem; color: white; }
    `}</style>
  );
}
