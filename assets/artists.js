// 도란도란 무대에 선 뮤지션들. 새 뮤지션은 아래 목록에 하나씩 추가한다(앞쪽이 최근).
// - id: 주소에 쓰는 영문 이름(예: "kim-doran" → artist.html?id=kim-doran)
// - videos: 유튜브 영상 ID(주소의 v= 뒤 11글자)와 제목
// - support: 뮤지션 본인의 받는 방법만(도란도란 계좌는 절대 넣지 않는다). 뮤지션의 게시 동의를 받고, 운영자가 1천 원을 보내 받는 사람 이름을 확인한 뒤 checked에 날짜를 적는다.
//     kakao: 카카오페이 송금코드 링크(카카오톡 → 더보기 → 송금 → QR 아이콘 → 나의 송금코드 → 링크 복사, https://qr.kakaopay.com/로 시작)
//     tossQr: 토스 "사진으로 송금" QR 그림 파일 경로(예: assets/artists/kim-doran-toss.png). 토스 링크(toss.me)는 2024년에 서비스가 끝나 쓸 수 없다.
//     account: 계좌로 받기를 뮤지션이 원할 때만 { bank, number, holder } — 계좌가 공개되므로 후원 전용 계좌를 권한다.
//     payeeName: 송금 화면에 뜨는 받는 사람 이름(관객이 확인하도록 보여 줌)
// - 본인 동의를 받은 내용만 올린다(출연 계약서의 "홍보 범위"와 영상 특약).
// - example: true 는 예시. 실제 뮤지션이 생기면 지운다.
window.ARTISTS = [
  {
    id: "example",
    example: true,
    name: "김도란",
    dayJob: "간호사",
    parts: ["보컬", "통기타"],
    city: "대구",
    stage: "도란도란 대구 #1",
    stageDate: "2026년 12월 (예정)",
    intro: "밤 근무가 끝나면 기타를 잡아요. 병원 휴게실에서 조용히 부르던 노래를 처음으로 스무 명 앞에서 불러요.",
    quote: "노래는 제가 저한테 하는 위로였어요. 이제 누군가에게도 위로가 되면 좋겠어요.",
    setlist: ["걱정말아요 그대 (커버)", "한숨 (커버)", "야간 근무 (자작곡)", "사연 신청곡 두 곡"],
    videos: [],
    links: { youtube: "", instagram: "", soundcloud: "" },
    support: { kakao: "", tossQr: "", account: null, payeeName: "", checked: "" },
    booking: true
  }
];
