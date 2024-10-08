"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import useGpt from "@/hooks/useGpt";

export default function Home() {
  const [result, setResult] = useState("");
  const { isLoading, getGptResponse } = useGpt();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const food = formData.get("food") as string;
    const taste = formData.get("taste") as string;
    if (!food || !taste) return;
    getGptResponse({ isOn: true, food, taste }).then((response) => {
      if (response) setResult(response);
    });
  };
  return (
    <main className="bg-neutral-200 w-full h-dvh flex justify-center font-noto text-neutral-800">
      <div className="max-w-screen-sm md:max-w-screen-md flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="relative grid grid-cols-3 w-full h-[80px] md:h-[120px] rounded-2xl overflow-hidden">
            {[...new Array(3)].map((_, idx) => (
              <div key={`topimage-${idx}`} className="relative">
                <Image
                  className="object-none"
                  src={"/sungjae1.webp"}
                  alt="title image"
                  fill
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

        <Container className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <Separator
                  className="w-1 bg-neutral-900 mt-0.5"
                  orientation="vertical"
                />
                <Label htmlFor="food">평가하고 싶은 음식</Label>
              </div>
              <Input type="text" name="food" placeholder="음식 이름" required />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <Separator
                  className="w-1 bg-neutral-900 mt-0.5"
                  orientation="vertical"
                />
                <Label>음식의 맛</Label>
              </div>
              <RadioGroup defaultValue="맛있음" name="taste" required>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="맛있음" id="r1" />
                  <Label htmlFor="r1" className="text-sm">
                    맛있음
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="맛없음" id="r2" />
                  <Label htmlFor="r2" className="text-sm">
                    맛없음
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 rounded-md bg-neutral-700 hover:bg-neutral-900 disabled:bg-slate-500 font-bold text-sm text-neutral-100"
                disabled={isLoading}
              >
                평가 받기
              </button>
            </div>
          </form>
        </Container>
        <Container className="flex-1 flex-col gap-4 p-6">
          <div className="flex gap-2 items-center">
            <Separator
              className="w-1 bg-neutral-900 mt-0.5"
              orientation="vertical"
            />
            <Label>결과</Label>
          </div>
          <div className="flex flex-1 rounded-md border border-input bg-transparent p-2 text-sm shadow-md transition-colors whitespace-pre-wrap">
            {result || "정말 궁금하거덩요..."}
          </div>
        </Container>
      </div>
    </main>
  );
}
