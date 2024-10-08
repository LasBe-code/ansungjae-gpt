import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full px-4 py-4 bg-neutral-300">
      <div className="flex flex-1 flex-col items-center gap-4">
        <p className="w-fit px-4 py-2 border border-neutral-600 rounded-full font-extrabold text-2xl text-center text-neutral-500">
          안성재의 요리 평가 GPT
        </p>
        <div className="flex gap-4">
          {linkList.map((data) => (
            <Link
              key={`footer-image-${data.src}`}
              className="hover:opacity-50"
              href={data.href}
              target="_blank"
            >
              <Image src={data.src} alt="blog image" width={25} height={25} />
            </Link>
          ))}
        </div>
        <span className="flex gap-1 text-sm text-center text-neutral-500">
          <Image src={"/mail.svg"} alt="mail image" width={16} height={16} />
          devlasbe@gmail.com
        </span>
        <p className="font-bold text-sm text-center text-neutral-500">
          ⓒ 2024 LasBe all rights reserved
        </p>
      </div>
    </footer>
  );
}

const linkList = [
  {
    href: "https://lasbe.tistory.com",
    src: "/blog.svg",
  },
  {
    href: "https://github.com/LasBe-code",
    src: "/github.svg",
  },
  {
    href: "https://www.instagram.com/lasbe_/",
    src: "/instagram.svg",
  },
];
