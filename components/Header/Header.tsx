import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className=" flex justify-between w-full p-4 shadow-lg shadow-pink mb-4">
      <Link href="/" className=" flex justify-between items-center gap-4">
        <Image src="/logo.png" alt="strAPI logo" width={70} height={70} />
        <h1 className=" text-4xl hover:text-sky-300">
          Str
          <span className=" text-amber-600 font-normal ">API</span>
        </h1>
      </Link>
      <nav className=" flex justify-between items-center gap-10 pr-4">
        <Link
          className=" cursor-pointer hover:text-sky-300 hover:scale-110 hover:underline decoration-amber-600 transition-all"
          href="/about"
        >
          About
        </Link>
        <Link
          className="cursor-pointer hover:text-sky-300 hover:scale-110 hover:underline decoration-amber-600 transition-all"
          href="/dashboard"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
