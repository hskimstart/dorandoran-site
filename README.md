# 도란도란 홈페이지

스무 명이 둘러앉아 한 사람의 노래를 듣는 저녁. 생업이 있는 뮤지션의 작은 무대, 도란도란의 공개 홈페이지예요.

| 파일 | 내용 |
|---|---|
| `index.html` | 첫 화면(모임 소개·뮤지션 약속·카페 제안) |
| `musician.html` | 뮤지션 지원서 |
| `join.html` | 관객 사전 신청 |
| `privacy.html` | 개인정보 처리방침 |
| `artists.html` | 도란도란 무대에 선 뮤지션 모음 |
| `artist.html?id=…` | 뮤지션 페이지(공연 영상·그날 부른 곡·직접 후원·섭외 문의) |
| `qr.html?id=…` | 현장 테이블에 놓는 인쇄용 QR 카드(뮤지션 페이지로 연결) |
| `assets/artists.js` | 뮤지션 자료. **새 뮤지션은 여기에 추가**(본인 동의 받은 내용만, 후원 링크는 뮤지션 본인 것만) |
| `assets/config.js` | 바뀌는 값(참가비, 모임 일정, 연락처, 저장소 주소) — **여기 한 곳에서만 고쳐요** |
| `assets/forms.css`, `assets/forms.js` | 신청서 공통 모양과 동작 |
| `.github/workflows/keepalive.yml` | 신청서 저장소가 멈추지 않게 매일 한 번 깨우기 |

- 신청 내용은 Supabase(`dorandoran` 프로젝트, 서울)에 저장돼요. 홈페이지 방문자는 **넣기만** 할 수 있고 읽을 수는 없어요. `config.js`의 키는 공개용(publishable)이라 여기 있어도 돼요.
- 저장 규칙(표·권한)은 비공개 저장소 `hskimstart/dorandoran`의 `supabase/migrations/`에 있어요.
- 동의 문구를 바꾸면 `config.js`의 `consentVersion`을 올려요.
