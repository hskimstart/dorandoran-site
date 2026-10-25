// 도란도란 무대에 선 뮤지션들. 새 뮤지션은 아래 목록에 하나씩 추가한다(앞쪽이 최근).
// - id: 주소에 쓰는 영문 이름(예: "kim-doran" → artist.html?id=kim-doran)
// - videos: 유튜브 영상 ID(주소의 v= 뒤 11글자)와 제목
// - support: 뮤지션 본인의 송금 링크(토스 https://toss.me/아이디, 카카오페이 https://qr.kakaopay.com/코드). 도란도란 계좌는 절대 넣지 않는다.
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
    support: { toss: "", kakao: "" },
    booking: true
  }
];
