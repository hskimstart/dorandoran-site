// 뮤지션 페이지(artist.html), 뮤지션 모음(artists.html), QR 카드(qr.html)를 assets/artists.js 자료로 그린다.
// 글은 모두 textContent로 넣는다(자료에 HTML이 섞여도 실행되지 않게).
(function () {
  const S = window.SITE, LIST = window.ARTISTS || [];
  const $ = s => document.querySelector(s);
  const el = (tag, props = {}, kids = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === "text") n.textContent = v;
      else if (k === "class") n.className = v;
      else n.setAttribute(k, v);
    }
    for (const c of [].concat(kids)) if (c) n.append(c);
    return n;
  };
  const safeUrl = (u, prefixes) => typeof u === "string" && prefixes.some(p => u.startsWith(p)) ? u : "";
  const YT = /^[\w-]{11}$/;
  const pageFor = a => `artist.html?id=${encodeURIComponent(a.id)}`;
  const displayName = a => (a.example ? "(예시) " : "") + a.name;

  const find = () => LIST.find(a => a.id === new URLSearchParams(location.search).get("id"));

  // ---------- 뮤지션 페이지 ----------
  const root = $("#artist");
  if (root) {
    const a = find();
    if (!a) {
      root.append(el("div", { class: "head" }, [
        el("h1", { text: "뮤지션을 찾지 못했어요" }),
        el("p", { text: "주소가 바뀌었을 수 있어요. 뮤지션 모음에서 찾아보세요." }),
        el("a", { class: "btn line", href: "artists.html", text: "뮤지션 모음 보기" })
      ]));
      return;
    }
    document.title = `${a.name} · 도란도란`;

    const hero = el("section", { class: "a-hero" }, [
      el("div", {}, [
        a.example ? el("span", { class: "badge-ex", text: "예시 페이지예요. 첫 무대가 끝나면 실제 뮤지션 페이지로 바뀌어요." }) : null,
        el("p", { class: "day", text: `낮엔 ${a.dayJob || "각자의 일"}, 밤엔 뮤지션` }),
        el("h1", { text: a.name }),
        el("div", { class: "tags" }, [...(a.parts || []), a.city, a.stage && `${a.stage} · ${a.stageDate || ""}`].filter(Boolean).map(t => el("span", { text: t }))),
        el("p", { class: "intro", text: a.intro || "" })
      ]),
      a.quote ? el("blockquote", { class: "quote" }, [a.quote, el("small", { text: `${a.name}님이 남긴 말` })]) : null
    ]);
    root.append(hero);

    // 공연 영상
    const vids = (a.videos || []).filter(v => YT.test(v.youtubeId));
    root.append(el("section", { class: "a-sec" }, [
      el("h2", { text: "도란도란 무대 영상" }),
      vids.length
        ? el("div", { class: "videos" }, vids.map(v => el("div", { class: "video" }, [
            el("div", { class: "frame" }, el("iframe", {
              src: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`, title: v.title || `${a.name} 공연 영상`,
              loading: "lazy", allow: "encrypted-media; picture-in-picture", allowfullscreen: ""
            })),
            el("span", { text: v.title || "" })
          ])))
        : el("div", { class: "video-empty" }, [el("b", { text: "공연 영상은 모임이 끝나면 올라와요" }), el("span", { text: "그날의 노래를 이 자리에 남겨 둘게요." })])
    ]));

    // 그날 부른 곡
    if ((a.setlist || []).length) {
      root.append(el("section", { class: "a-sec" }, [
        el("h2", { text: "그날 부른 곡" }),
        el("ol", { class: "setlist" }, a.setlist.map(s => el("li", { text: s })))
      ]));
    }

    // 직접 후원
    const toss = safeUrl(a.support?.toss, ["https://toss.me/"]);
    const kakao = safeUrl(a.support?.kakao, ["https://qr.kakaopay.com/"]);
    const sup = el("section", { class: "a-sec" }, el("div", { class: "support", id: "support" }, [
      el("h2", { text: `${a.name}님에게 직접 후원하기` }),
      el("p", { class: "sub", text: "노래가 마음에 남았다면, 그 마음을 뮤지션에게 바로 전해 주세요." }),
      el("div", { class: "btns" }, [
        el("a", { class: "btn toss" + (toss ? "" : " off"), href: toss || "#support", target: "_blank", rel: "noopener", text: "토스로 후원하기" }),
        el("a", { class: "btn kakao" + (kakao ? "" : " off"), href: kakao || "#support", target: "_blank", rel: "noopener", text: "카카오페이로 후원하기" })
      ]),
      el("ul", {}, (S.supportNotes || []).map(t => el("li", { text: t }))),
      !toss && !kakao ? el("p", { class: "sub", text: a.example ? "예시 페이지라 후원 버튼이 작동하지 않아요." : "후원 링크를 준비하고 있어요." }) : null
    ]));
    root.append(sup);

    // 채널
    const L = a.links || {};
    const chan = [
      safeUrl(L.youtube, ["https://"]) && ["유튜브", L.youtube],
      safeUrl(L.instagram, ["https://"]) && ["인스타그램", L.instagram],
      safeUrl(L.soundcloud, ["https://"]) && ["사운드클라우드", L.soundcloud]
    ].filter(Boolean);
    if (chan.length) {
      root.append(el("section", { class: "a-sec" }, [
        el("h2", { text: `${a.name}님을 더 들어 보세요` }),
        el("div", { class: "links" }, chan.map(([t, u]) => el("a", { class: "btn line", href: u, target: "_blank", rel: "noopener", text: t })))
      ]));
    }

    // 섭외 문의
    if (a.booking) {
      const subject = encodeURIComponent(`[도란도란 섭외 문의] ${a.name}`);
      root.append(el("section", { class: "a-sec" }, el("div", { class: "booking" }, [
        el("h2", { text: `공연·축가·행사에 ${a.name}님을 부르고 싶다면` }),
        el("p", { class: "sub", text: "날짜, 장소, 행사 내용을 적어 보내 주세요. 도란도란이 뮤지션에게 전하고, 뮤지션이 원하면 직접 연락드려요." }),
        el("div", { class: "mail" }, [
          el("span", { class: "addr", text: S.email }),
          el("a", { class: "btn solid", href: `mailto:${S.email}?subject=${subject}`, text: "메일로 섭외 문의" })
        ])
      ])));
    }

    root.append(el("section", { class: "a-sec" }, el("div", { class: "links" }, [
      el("a", { class: "btn line", href: "artists.html", text: "다른 뮤지션 보기" }),
      el("a", { class: "btn line", href: "join.html", text: "다음 모임 신청하기" })
    ])));
    return;
  }

  // ---------- 뮤지션 모음 ----------
  const grid = $("#artists");
  if (grid) {
    const real = LIST.filter(a => !a.example);
    if (!real.length) $("#emptyNote").hidden = false;
    LIST.forEach(a => grid.append(el("a", { class: "acard", href: pageFor(a) }, [
      a.example ? el("span", { class: "badge-ex", text: "예시" }) : null,
      el("span", { class: "day", text: `낮엔 ${a.dayJob || "각자의 일"}` }),
      el("b", { text: displayName(a) }),
      el("p", { text: a.intro || "" }),
      el("div", { class: "meta" }, [...(a.parts || []), a.stage].filter(Boolean).map(t => el("span", { text: `#${t}` })))
    ])));
    return;
  }

  // ---------- QR 카드 ----------
  const card = $("#qrCard");
  if (card) {
    const a = find() || LIST[0];
    const url = new URL(pageFor(a), location.href).href;
    $("#qrDay").textContent = `낮엔 ${a.dayJob || "각자의 일"}, 밤엔 뮤지션`;
    $("#qrName").textContent = displayName(a);
    $("#qrUrl").textContent = url.replace(/^https?:\/\//, "");
    if (window.QRCode) new QRCode($("#qr"), { text: url, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.M });
    else $("#qr").textContent = url;
    $("#print")?.addEventListener("click", () => print());
  }
})();
