export function getRandomPrompt(): string {
    const subjects = ["고양이", "로봇", "사막", "달", "도시", "바다"];
    const styles = ["수채화 스타일", "픽셀 아트", "흑백 잉크", "3D 렌더링"];
    const extras = ["투명한 질감", "미래적인 분위기", "레트로 느낌", "화려한 색감"];
  
    const r = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
    return `${r(subjects)} + ${r(styles)} + ${r(extras)}`;
  }
