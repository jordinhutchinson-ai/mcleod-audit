import { useState } from "react";

const LOGO_B64 = "data:image/png;base64,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";
const SAFETY_B64 = "data:image/png;base64,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";

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
