import Image from "next/image";
import Container from "../components/ui/container";
import Gpt from "@/components/gpt";

export default function Home() {
  return (
    <main className="bg-neutral-200 w-full min-h-dvh flex justify-center font-noto text-neutral-800">
      <div className="max-w-screen-sm md:max-w-screen-md flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="relative grid grid-cols-3 w-full h-[80px] md:h-[120px] rounded-2xl overflow-hidden shadow-lg">
            {[...new Array(3)].map((_, idx) => (
              <div key={`topimage-${idx}`} className="relative">
                <Image
                  className="object-cover"
                  src={"/sungjae1.webp"}
                  alt="title image"
                  fill
                  unoptimized
                  priority
                />
              </div>
            ))}
          </div>
          <Container className="flex-col justify-center gap-2 w-full p-4">
            <h1 className="whitespace-nowrap text-lg md:text-2xl font-extrabold text-center">
              🍖 안성재의 요리 평가 GPT 🥦
            </h1>
            <h2 className="font-bold text-neutral-500 text-sm md:text-md text-center">
              어떤 음식을 준비하셨나요?
            </h2>
          </Container>
        </div>
        <Gpt />
      </div>
    </main>
  );
}
