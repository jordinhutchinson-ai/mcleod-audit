import { useState } from "react";

const LOGO_B64 = "/mcleod-logo.png";
const SAFETY_B64 = "/safety-first.png";

const MECHANICS = ["Oppies", "Hunter", "Alfred", "Mark", "Dondon"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const SECTIONS = [
  { key: "ta", title: "Task Analysis (TA)", accent: "blue", desc: "Assess whether the mechanic completed and used a Task Analysis before starting the job.", items: [
    { id: "ta1", label: "TA was completed before work commenced" },
    { id: "ta2", label: "All relevant hazards were identified on the TA" },
    { id: "ta3", label: "Controls were appropriate and specific to the task" },
    { id: "ta4", label: "TA was signed off before starting" },
    { id: "ta5", label: "TA was accessible at the worksite during the job" },
    { id: "ta6", label: "Isolations have been considered and implemented on the job." },
  ]},
  { key: "JC", title: "Job Card / Service Inspection Checklist", accent: "grey", desc: "Verify the mechanic used the correct job card and checklist for the job.", items: [
    { id: "jc1", label: "Job card / service checklist was used for this job" },
    { id: "jc2", label: "All relevant sections were completed" },
    { id: "jc3", label: "Information recorded was accurate and legible" },
    { id: "jc4", label: "Job card was signed upon completion" },
  ]},
  { key: "sw", title: "Safe Work Practices", accent: "blue", desc: "Observe whether the mechanic carried out the work safely in line with their TA and McLeod SOPs.", items: [
    { id: "sw1", label: "Correct PPE was worn throughout the task" },
    { id: "sw2", label: "Hazard controls from the TA were applied during the job" },
    { id: "sw3", label: "Isolation / tag-out procedures followed where applicable" },
    { id: "sw4", label: "Work area was kept tidy and hazard-free throughout" },
    { id: "sw5", label: "Work was carried out in line with the relevant SOP" },
  ]},
  { key: "ms", title: "Mechanical Skill Assessment", accent: "grey", desc: "Assess the quality and competency of the mechanical work performed.", items: [
    { id: "ms1", label: "Correct tools and equipment were selected and used" },
    { id: "ms2", label: "Work quality met McLeod's expected standard" },
    { id: "ms3", label: "Torque specs / technical data referenced where required" },
    { id: "ms4", label: "Post-work check / test completed before handing back" },
  ]},
];

const RATINGS = [
  { v: "sat",   l: "Satisfactory",      col: "#155A2E", bg: "#E6F4EC" },
  { v: "imp",   l: "Needs Improvement", col: "#7A4900", bg: "#FEF3DC" },
  { v: "unsat", l: "Unsatisfactory",    col: "#7A1010", bg: "#FDEAEA" },
  { v: "na",    l: "N/A",               col: "#5A6470", bg: "#EEF0F2" },
];

const BLUE   = "#2B5BA8";
const BLUE_D = "#1A3F7A";
const BLUE_L = "#E8EFF8";
const GREY   = "#4A5568";
const WHITE  = "#FFFFFF";
const GREEN  = "#155A2E";

const S = {
  app:     { fontFamily: "Arial, 'Helvetica Neue', sans-serif", background: "#F2F4F7", minHeight: "100vh" },
  hdr:     { background: BLUE_D, borderBottom: "4px solid " + BLUE },
  hdrInner:{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px" },
  logoImg: { height: "52px", objectFit: "contain" },
  safetyImg:{ height: "44px", objectFit: "contain", borderRadius: "3px" },
  titleBar:{ background: BLUE, padding: "8px 16px" },
  titleTxt:{ color: WHITE, fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", margin: 0 },
  titleSub:{ color: "rgba(255,255,255,.7)", fontSize: "10px", margin: "1px 0 0", letterSpacing: ".03em" },
  body:    { padding: "14px 14px 28px", maxWidth: "440px", margin: "0 auto" },
  card:    (accent) => ({ background: WHITE, borderRadius: "5px", padding: "16px", marginBottom: "12px", borderLeft: "4px solid " + (accent === "blue" ? BLUE : "#C0C8D4"), boxShadow: "0 1px 3px rgba(0,0,0,.07)" }),
  secT:    { fontSize: "10px", fontWeight: 800, color: BLUE_D, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "10px", paddingBottom: "8px", borderBottom: "1px solid #DDE3EC" },
  lbl:     { fontSize: "11px", fontWeight: 700, color: BLUE_D, marginBottom: "4px", display: "block", textTransform: "uppercase", letterSpacing: ".04em" },
  inp:     { width: "100%", padding: "9px 11px", borderRadius: "4px", border: "1.5px solid #C0C8D4", fontSize: "13px", color: "#1A2640", background: WHITE, boxSizing: "border-box" },
  ta:      { width: "100%", padding: "9px 11px", borderRadius: "4px", border: "1.5px solid #C0C8D4", fontSize: "13px", color: "#1A2640", background: WHITE, minHeight: "70px", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" },
  sel:     { width: "100%", padding: "9px 11px", borderRadius: "4px", border: "1.5px solid #C0C8D4", fontSize: "13px", color: "#1A2640", background: WHITE, appearance: "none", fontFamily: "inherit", boxSizing: "border-box" },
  field:   { marginBottom: "12px" },
  grid2:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" },
  item:    { padding: "10px 0", borderBottom: "1px solid #EDF0F5" },
  iLbl:    { fontSize: "12px", color: "#1A2640", fontWeight: 500, marginBottom: "6px", lineHeight: 1.35 },
  pills:   { display: "flex", gap: "5px", flexWrap: "wrap" },
  pill:    (r, sel) => ({ padding: "4px 10px", borderRadius: "3px", fontSize: "10px", fontWeight: 700, border: "1.5px solid " + (sel ? r.col : "#C0C8D4"), background: sel ? r.bg : WHITE, color: sel ? r.col : "#7A8699", cursor: "pointer", textTransform: "uppercase", letterSpacing: ".04em" }),
  desc:    { fontSize: "10px", color: "#5A6470", marginBottom: "10px", lineHeight: 1.45, fontStyle: "italic", paddingLeft: "8px", borderLeft: "2px solid " + BLUE },
  pWrap:   { background: "#DDE3EC", height: "4px", borderRadius: "2px", marginBottom: "14px" },
  pFill:   (p) => ({ height: "100%", width: p + "%", background: BLUE, borderRadius: "2px", transition: "width .3s" }),
  btn:     (v, dis) => ({ width: "100%", padding: "13px 16px", background: v === "outline" ? WHITE : BLUE, color: v === "outline" ? BLUE : WHITE, border: "2px solid " + BLUE, borderRadius: "4px", fontSize: "13px", fontWeight: 700, cursor: dis ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: ".06em", opacity: dis ? 0.4 : 1 }),
  scoreCard:{ background: BLUE_D, borderRadius: "5px", padding: "18px", marginBottom: "12px", borderBottom: "4px solid " + BLUE },
  stepInd: { display: "flex", gap: "5px", justifyContent: "center", marginBottom: "14px" },
  sDot:    (s) => ({ width: "28px", height: "4px", borderRadius: "2px", background: s === "active" ? BLUE : s === "done" ? GREEN : "#C0C8D4" }),
  infoBar: { background: BLUE_L, borderLeft: "3px solid " + BLUE, padding: "8px 12px", marginBottom: "12px", borderRadius: "0 4px 4px 0" },
  tag:     (sc) => ({ display: "inline-flex", padding: "2px 7px", borderRadius: "2px", fontSize: "9px", fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase", background: sc >= 80 ? "#E6F4EC" : sc >= 60 ? "#FEF3DC" : "#FDEAEA", color: sc >= 80 ? GREEN : sc >= 60 ? "#7A4900" : "#7A1010" }),
  cIn:     { width: "100%", marginTop: "5px", padding: "6px 8px", borderRadius: "3px", border: "1px solid #DDE3EC", fontSize: "11px", color: "#1A2640", background: "#F7F9FC", fontFamily: "inherit", boxSizing: "border-box" },
};

export default function MechanicAudit() {
  const now = new Date();
  const [step, setStep] = useState("info");
  const [info, setInfo] = useState({ mechanic: "", month: MONTHS[now.getMonth()], year: now.getFullYear(), asset: "", job: "", location: "" });
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [notes, setNotes] = useState("");

  const allItems = SECTIONS.flatMap(s => s.items);
  const rated = allItems.filter(i => ratings[i.id]).length;
  const progress = Math.round(rated / allItems.length * 100);
  const infoOk = info.mechanic && info.asset && info.job;
  const STEPS = ["info", "audit", "review", "done"];

  const calcScore = () => {
    const r = allItems.filter(i => ratings[i.id] && ratings[i.id] !== "na");
    if (!r.length) return null;
    return Math.round(r.filter(i => ratings[i.id] === "sat").length / r.length * 100);
  };

  const buildEmail = () => {
    const score = calcScore();
    const date = new Date().toLocaleDateString("en-NZ", { day: "2-digit", month: "long", year: "numeric" });
    let b = "MCLEOD — MONTHLY MECHANIC COMPETENCY AUDIT\n" + "=".repeat(48) + "\n\n";
    b += "Date: " + date + "\nMechanic: " + info.mechanic + "\nMonth: " + info.month + " " + info.year + "\nJob: " + info.job + "\nAsset: " + info.asset + "\n";
    if (info.location) b += "Location: " + info.location + "\n";
    b += "Auditor: Brady (Leading Hand)\nOverall Score: " + (score !== null ? score + "%" : "N/A") + "\n";
    SECTIONS.forEach(sec => {
      b += "\n" + sec.title.toUpperCase() + "\n" + "-".repeat(36) + "\n";
      sec.items.forEach(item => {
        const r = RATINGS.find(x => x.v === ratings[item.id]);
        const c = comments[item.id];
        b += "• " + item.label + "\n  " + (r ? r.l : "Not rated") + "\n";
        if (c) b += "  Note: " + c + "\n";
      });
    });
    if (notes) b += "\nNotes\n" + "-".repeat(36) + "\n" + notes + "\n";
    b += "\n" + "=".repeat(48) + "\nMcLeod Mechanic Audit System\n";
    return b;
  };

  const submit = () => {
    const score = calcScore();
    const subject = encodeURIComponent("Mechanic Audit — " + info.mechanic + " — " + info.month + " " + info.year + (score !== null ? " (" + score + "%)" : ""));
    window.open("mailto:jordin.hutchinson@McLeod.nz?subject=" + subject + "&body=" + encodeURIComponent(buildEmail()), "_blank");
    setStep("done");
  };

  const reset = () => {
    setStep("info"); setRatings({}); setComments({}); setNotes("");
    setInfo({ mechanic: "", month: MONTHS[now.getMonth()], year: now.getFullYear(), asset: "", job: "", location: "" });
  };

  const score = calcScore();

  return (
    <div style={S.app}>
      <div style={S.hdr}>
        <div style={S.hdrInner}>
          <img src={LOGO_B64} alt="McLeod" style={S.logoImg} />
          <img src={SAFETY_B64} alt="Safety first. McLeod first." style={S.safetyImg} />
        </div>
      </div>
      <div style={S.titleBar}>
        <p style={S.titleTxt}>Monthly Mechanic Competency Audit</p>
        <p style={S.titleSub}>Leading Hand — Brady</p>
      </div>

      <div style={S.body}>
        <div style={S.stepInd}>
          {STEPS.map((s, i) => {
            const si = STEPS.indexOf(step);
            return <div key={s} style={S.sDot(i < si ? "done" : i === si ? "active" : "idle")} />;
          })}
        </div>

        {step === "info" && (
          <>
            <div style={S.card("blue")}>
              <div style={S.secT}>Audit Details</div>
              <div style={S.field}><label style={S.lbl}>Mechanic *</label>
                <select style={S.sel} value={info.mechanic} onChange={e => setInfo(v => ({ ...v, mechanic: e.target.value }))}>
                  <option value="">Select mechanic…</option>
                  {MECHANICS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div style={S.grid2}>
                <div><label style={S.lbl}>Month *</label>
                  <select style={S.sel} value={info.month} onChange={e => setInfo(v => ({ ...v, month: e.target.value }))}>
                    {MONTHS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div><label style={S.lbl}>Year *</label>
                  <select style={S.sel} value={info.year} onChange={e => setInfo(v => ({ ...v, year: e.target.value }))}>
                    {[2025,2026,2027].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div style={S.field}><label style={S.lbl}>Asset ID *</label><input style={S.inp} placeholder="e.g. HL-84, CF-6, C-40…" value={info.asset} onChange={e => setInfo(v => ({ ...v, asset: e.target.value }))} /></div>
              <div style={S.field}><label style={S.lbl}>Job Description *</label><textarea style={S.ta} placeholder="Briefly describe the task…" value={info.job} onChange={e => setInfo(v => ({ ...v, job: e.target.value }))} /></div>
              <div><label style={S.lbl}>Location</label><input style={S.inp} placeholder="e.g. Tauranga Workshop…" value={info.location} onChange={e => setInfo(v => ({ ...v, location: e.target.value }))} /></div>
            </div>
            <button style={S.btn("fill", !infoOk)} disabled={!infoOk} onClick={() => setStep("audit")}>Begin Audit</button>
          </>
        )}

        {step === "audit" && (
          <>
            <div style={S.infoBar}>
              <div style={{ fontSize: "11px", fontWeight: 800, color: BLUE_D, textTransform: "uppercase", letterSpacing: ".04em" }}>{info.mechanic} — {info.asset}</div>
              <div style={{ fontSize: "11px", color: GREY, marginTop: "1px" }}>{info.month} {info.year}{info.location ? " · " + info.location : ""}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "10px", color: GREY, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700 }}>Progress</span>
              <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE_D }}>{rated} / {allItems.length} rated</span>
            </div>
            <div style={S.pWrap}><div style={S.pFill(progress)} /></div>
            {SECTIONS.map(sec => (
              <div key={sec.key} style={S.card(sec.accent)}>
                <div style={S.secT}>{sec.title}</div>
                <div style={S.desc}>{sec.desc}</div>
                {sec.items.map((item, idx) => (
                  <div key={item.id} style={{ ...S.item, borderBottom: idx < sec.items.length - 1 ? "1px solid #EDF0F5" : "none" }}>
                    <div style={S.iLbl}>{item.label}</div>
                    <div style={S.pills}>
                      {RATINGS.map(r => (
                        <div key={r.v} style={S.pill(r, ratings[item.id] === r.v)} onClick={() => setRatings(p => ({ ...p, [item.id]: r.v }))}>
                          {r.l}
                        </div>
                      ))}
                    </div>
                    {ratings[item.id] && ratings[item.id] !== "sat" && ratings[item.id] !== "na" && (
                      <input style={S.cIn} placeholder="Comment or corrective action…" value={comments[item.id] || ""} onChange={e => setComments(c => ({ ...c, [item.id]: e.target.value }))} />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div style={S.card("grey")}>
              <div style={S.secT}>Overall Notes</div>
              <textarea style={S.ta} placeholder="Additional observations, commendations, or follow-up actions…" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <button style={S.btn("fill", false)} onClick={() => setStep("review")}>Review &amp; Submit</button>
          </>
        )}

        {step === "review" && (
          <>
            <div style={S.scoreCard}>
              <div style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: "4px" }}>Overall Score</div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: score !== null ? (score >= 80 ? "#5DC98A" : score >= 60 ? "#F0B940" : "#E07070") : WHITE, lineHeight: 1 }}>{score !== null ? score + "%" : "—"}</div>
              <div style={{ color: "rgba(255,255,255,.5)", fontSize: "10px", marginTop: "5px" }}>{info.mechanic} · {info.asset} · {info.month} {info.year}</div>
            </div>
            {SECTIONS.map(sec => {
              const r = sec.items.filter(i => ratings[i.id] && ratings[i.id] !== "na");
              const ss = r.length ? Math.round(r.filter(i => ratings[i.id] === "sat").length / r.length * 100) : null;
              return (
                <div key={sec.key} style={S.card(sec.accent)}>
                  <div style={{ ...S.secT, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{sec.title}</span>
                    {ss !== null && <span style={S.tag(ss)}>{ss}%</span>}
                  </div>
                  {sec.items.map(item => {
                    const r = RATINGS.find(x => x.v === ratings[item.id]);
                    const c = comments[item.id];
                    return (
                      <div key={item.id} style={{ display: "flex", gap: "8px", padding: "7px 0", borderBottom: "1px solid #EDF0F5", fontSize: "11px", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, color: "#1A2640", lineHeight: 1.35 }}>
                          {item.label}
                          {c && <div style={{ color: GREY, fontStyle: "italic", marginTop: "2px" }}>{c}</div>}
                        </div>
                        {r && <span style={{ ...S.pill(r, true), flexShrink: 0 }}>{r.l}</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ ...S.btn("outline", false), flex: "0 0 auto", width: "auto" }} onClick={() => setStep("audit")}>Back</button>
              <button style={{ ...S.btn("fill", false), flex: 1 }} onClick={submit}>Submit + Email Report</button>
            </div>
          </>
        )}

        {step === "done" && (
          <>
            <div style={{ ...S.card("blue"), textAlign: "center", borderLeftWidth: "4px", borderLeftColor: GREEN }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#E6F4EC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <svg width="22" height="22" viewBox="0 0 22 22"><polyline points="4,11 9,16 18,6" stroke={GREEN} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: BLUE_D, marginBottom: "5px", textTransform: "uppercase", letterSpacing: ".04em" }}>Audit Submitted</div>
              <div style={{ fontSize: "11px", color: GREEN, fontWeight: 600 }}>{info.mechanic}'s {info.month} {info.year} audit sent to Jordin.{score !== null ? " Score: " + score + "%." : ""}</div>
            </div>
            <div style={{ ...S.card("grey"), textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: GREY, marginBottom: "10px", textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 700 }}>Start Another Audit</p>
              <button style={S.btn("fill", false)} onClick={reset}>New Audit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
