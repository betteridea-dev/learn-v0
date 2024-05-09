import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-row justify-between items-center p-8">
        <div className="flex flex-row items-center gap-2 text-lg">
          <Image src="/logo.svg" height={16} width={16} alt="Logo" /> LearnAO
        </div>

        <div className="flex flex-row gap-4 text-[#2C2C2C] text-lg">
          <Link href="/login">ide</Link>
          <span>•</span>
          <Link href="/login">blogs</Link>
        </div>

        <div className="text-[#2C2C2C] text-lg">contact us</div>
      </div>
    </nav>
  );
}
