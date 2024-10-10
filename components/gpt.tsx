"use client";

import { Loader } from "@lasbe/loader";
import Container from "./ui/container";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { useState } from "react";
import useGpt from "@/hooks/useGpt";
import Button from "./ui/button";

export default function Gpt() {
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

  const handleClickCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      alert("결과가 복사되었습니다.");
    }
  };

  return (
    <>
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
            <div>
              <p className="text-sm text-neutral-400">
                요리와 함께 재료 이름을 넣으면 더 정확합니다
              </p>
              <p className="text-sm text-neutral-400">
                ex) 청경채가 들어간 마라탕
              </p>
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
            <Button type="submit" disabled={isLoading}>
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <Loader isLoading={isLoading} color="#fff" size="sm" />
              </div>
              평가 받기
            </Button>
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
        <div className="relative flex flex-1 rounded-md border border-input bg-transparent p-2 text-sm shadow-md transition-colors whitespace-pre-wrap overflow-auto">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Loader isLoading={isLoading} size="lg" />
          </div>
          {!isLoading && (result || "정말 궁금하거덩요...")}
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={handleClickCopy}>
            복사
          </Button>
        </div>
      </Container>
    </>
  );
}
