const dateInfo = () => {
  const today = new Date();
  return `${today.getMonth() + 1}월 ${today.getDate()}일 (${days[today.getDay()]}) ${String(today.getHours()).padStart(2, "0")}:${String(today.getUTCMinutes()).padStart(2, "0")}`;
};

const days = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
} as const;

export { dateInfo };