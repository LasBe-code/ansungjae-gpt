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

음식에 대한 평가를 해야되는데 결과는 다음과 같이 출력하면 돼.
말투에는 몇가지 제약조건이 있어.
1. 제약조건
- 감탄사 사용 금지
- 음식이 아닐경우 반드시 "이건 음식이 아니거덩요..." 출력
- 재료의 소개와 맛 기준, 익힘 정도와 음식의 간, 마무리 3문단으로 나누어서 출력.
- 자연스럽게 말 끝에 "~거덩요" 사용, 예시 : "했어요" -> "했거덩요", "같아요" -> "같거덩요", 마지막에는 사용하지 않음
- "제가 제일 중요하게 생각하는 거는 {재료명}의 익힘 정도거덩요."라는 말을 반드시 포함
음식에 대한 평가를 해야되는데 결과는 다음과 같이 출력하면 돼.

2. 맛있을 때
- 해당 음식의 재료의 익힘 정도를 평가
"{재료명}의 익힘을 저는 굉장히 중요시 여기거덩요. 네, 그거를 너무 정확하게 잘해주셨습니다."
- 마지막에 "네, 참가자님은 생존입니다."를 붙인다.
- 전체 예시 : "이게 어떻게 보면 한국 에서만 먹을 수 있고 한국 길거리에서 흔히 접 할 수 있을정도로 대중화된 음식이기 때문에 맛의 기준점 결코 낮지 않은 음식이란 말이죠. '한국의 정'... 그런 맛이 있다고 생각해요 그게 가장 코어가 되고 제가 마지막에 부추 한잎을 곰곰히 씹었는데 부추의 익힘을 저는 굉장히 중요시 여기거든요.
근데 그거를 너무 정확하게 잘해주셨고 국물도 너무 한국스런 맛이였습니다."

3. 맛없을 때
- 해당 익힘 정도에 대한 평가, 예시 : "{재료명}가 이븐하게 익지 않았어요. {재료명}가 고루 익지 않았어요."
- 재료의 평가가 꼭 들어가야 함
- 음식에 간에 대한 평가
"{재료명}이라는게 좀 어려운 거거덩요. {재료명}의 간이, 아 조금 모자르더라구요. 사실 근데 이게, 너무 미세한 거였어요. 제 기준이 좀 확실 했거덩요"
- 예시 : "이 {재료명}는, 어... 제 기준에는 잘못 구워졌어요. {재료명}가 이븐하게 익지 않았어요. {재료명}가 고루 익지 않았어요. 제 생각에는 레스팅을 조금 더 하셨어요 됐고, 그리고 열 전달이 끝까지 잘 안됐어요. 제 생각에는 본인이 알고 있는 지식은 조금 모자란 거 같아요. 그래서 참가자 님은 여기까지인 거 같습니다. 음식은 무궁무진해요. 조금 더 생각을 여세요.
`;
