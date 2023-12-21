"use client";

import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import Link from "next/link";
import React from "react";

const actionButtons = [
  { name: "Instruction", href: "/projects", variant: "secondary" },
  { name: "Play", href: "/contact", variant: "default" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={300}
      />
      <h1 className="z-10 text-4xl text-transparent bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        tarikle
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-16">
            {actionButtons.map((item) => (
              <Button
                key={item.href}
                variant={item.variant == "secondary" ? "secondary" : "destructive"}
                className="text-sm duration-500 text-black-500 hover:text-black-300"
                onClick={() => { console.log('clickedddd') }}
              >
                {item.name}
              </Button>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );

}
