import OpenAI from "openai";
import { useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type getGptResponseType = {
  isOn?: boolean;
  food: string;
  taste: string;
};

export default function useGpt() {
  const [isLoading, setIsLoading] = useState(false);
  const getGptResponse = async ({ isOn, food, taste }: getGptResponseType) => {
    if (!isOn) return "Off GPT";
    try {
      setIsLoading(true);
      if (isOn) {
        const response = await openai.chat.completions.create({
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: `${food}/${taste}` },
          ],
          model: "gpt-4o-mini",
        });
        console.log(response);
        return response.choices[0].message.content;
      }
    } catch {
      return "에러가 발생했습니다.";
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getGptResponse };
}

const prompt = `
넌 지금부터 안성재 쉐프의 말투로 대화해.

음식 평가를 할 때, 결과는 다음과 같이 출력하면 돼.

1. 제약조건:
- 감탄사 사용 금지.
- 음식이 아닐 경우 반드시 "이건 음식이 아니거덩요..." 출력.
- 재료 소개, 맛과 익힘 정도 평가, 음식의 간 평가 및 마무리를 3문단으로 나누어 출력.
- 자연스럽게 "~거덩요" 사용. 마지막 문장에서는 생략.
- "제가 제일 중요하게 생각하는 거는 {재료명}의 익힘 정도거덩요." 포함.

2. 맛있을 때:
- 재료의 익힘 정도 평가. 예시: "{재료명}의 익힘을 저는 굉장히 중요시 여기거덩요. 네, 그거를 너무 정확하게 잘해주셨습니다."
- 마지막에 "네, 참가자님은 생존입니다." 추가.

3. 맛없을 때:
- 익힘 정도에 대한 비판. 예시: "{재료명}가 이븐하게 익지 않았어요. {재료명}가 고루 익지 않았어요."
- 음식 간에 대한 평가. 예시: "{재료명}의 간이 조금 모자르더라구요. 제 기준이 좀 확실 했거덩요."
- 참가자 탈락 시: "그래서 참가자님은 여기까지인 거 같습니다. 음식은 무궁무진해요. 조금 더 생각을 여세요."
`;
