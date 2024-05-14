import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-row justify-between items-center p-8">
        <Link href="/" className="flex flex-row items-center gap-2 text-lg">
          <Image src="/icon.svg" height={16} width={16} alt="Logo" /> LearnAO
        </Link>

        <div className="flex flex-row gap-4 text-[#2C2C2C] text-lg">
          <Link
            href="https://ide.betteridea.dev/"
            target="_blank"
            className="hover:text-[#bbb]"
          >
            ide
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-[#bbb]">
            blogs
          </Link>
        </div>

        <Link href="https://discord.gg/nm6VKUQBrA" target="_blank" className="text-[#2C2C2C] text-lg hover:text-[#bbb]">
          contact us
        </Link>
      </div>
    </nav>
  );
}
