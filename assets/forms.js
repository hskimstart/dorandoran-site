// 신청서 공통 동작: 칸 확인 → Supabase에 넣기 → 완료 화면.
// 각 칸은 data-col(저장할 칸 이름), data-kind(text·phone·array·bool·yesno), data-required로 표시한다.
(function () {
  const S = window.SITE;
  const man = n => (n % 10000 === 0 ? n / 10000 + "만" : n.toLocaleString("ko-KR"));
  const vals = {
    price: man(S.price), minPeople: S.minPeople, seats: S.seats, sharePct: S.sharePct,
    minGuarantee: man(S.minGuarantee), meetup: S.meetup.label, email: S.email, privacyEffective: S.privacyEffective
  };
  document.querySelectorAll("[data-cfg]").forEach(el => { if (vals[el.dataset.cfg] !== undefined) el.textContent = vals[el.dataset.cfg]; });
  document.querySelectorAll("[data-mail]").forEach(el => { el.textContent = S.email; });

  const form = document.querySelector("form[data-table]");
  if (!form) return;
  const btn = form.querySelector("button[type=submit]");
  const btnLabel = btn.textContent;
  const msg = form.querySelector(".form-error");
  const PHONE = /^[0-9+() -]{9,20}$/;

  function setErr(box, text) {
    box.classList.add("bad");
    const e = document.createElement("p");
    e.className = "err"; e.textContent = text;
    box.append(e);
  }

  function collect() {
    const data = {}, errors = [];
    form.querySelectorAll("[data-col]").forEach(box => {
      const col = box.dataset.col, kind = box.dataset.kind || "text", need = box.hasAttribute("data-required");
      const why = box.dataset.msg;
      let v;
      if (kind === "array") {
        v = [...box.querySelectorAll("input:checked")].map(i => i.value);
        if (need && !v.length) errors.push([box, why || "하나 이상 골라 주세요."]);
      } else if (kind === "bool") {
        v = box.querySelector("input").checked;
        if (need && !v) errors.push([box, why || "동의해 주셔야 보낼 수 있어요."]);
      } else if (kind === "yesno") {
        const i = box.querySelector("input:checked");
        v = i ? i.value === "yes" : null;
        if (need && v === null) errors.push([box, why || "골라 주세요."]);
      } else {
        const i = box.querySelector("input, select, textarea");
        v = i.value.trim();
        if (!v) { v = null; if (need) errors.push([box, why || "적어 주세요."]); }
        else if (kind === "phone" && !PHONE.test(v)) errors.push([box, "휴대폰 번호를 010-1234-5678처럼 적어 주세요."]);
      }
      data[col] = v;
    });
    return { data, errors };
  }

  function showDone() {
    form.hidden = true;
    document.getElementById("done").hidden = false;
    scrollTo({ top: 0, behavior: "smooth" });
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    form.querySelectorAll(".bad").forEach(x => x.classList.remove("bad"));
    form.querySelectorAll(".err").forEach(x => x.remove());
    msg.textContent = "";
    const { data, errors } = collect();
    if (errors.length) {
      errors.forEach(([b, t]) => setErr(b, t));
      errors[0][0].scrollIntoView({ behavior: "smooth", block: "center" });
      errors[0][0].querySelector("input, select, textarea")?.focus({ preventScroll: true });
      msg.textContent = "빠진 곳이 있어요. 빨간 글씨를 확인해 주세요.";
      return;
    }
    if (form.querySelector(".hp input")?.value) { showDone(); return; } // 자동 입력 프로그램은 조용히 무시
    data.consent_version = S.consentVersion;
    if (form.hasAttribute("data-meetup")) data.meetup = S.meetup.id;

    btn.disabled = true; btn.textContent = "보내는 중…";
    try {
      const r = await fetch(`${S.supabase.url}/rest/v1/${form.dataset.table}`, {
        method: "POST",
        headers: { apikey: S.supabase.key, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify(data)
      });
      if (!r.ok) throw new Error(String(r.status));
      showDone();
    } catch (err) {
      msg.textContent = `보내지 못했어요. 인터넷 연결을 확인하고 다시 눌러 주세요. 계속 안 되면 ${S.email}로 알려 주세요.`;
      btn.disabled = false; btn.textContent = btnLabel;
    }
  });
})();
