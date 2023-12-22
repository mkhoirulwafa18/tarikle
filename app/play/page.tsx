"use client";

import { DateSlider } from "@/components/date-slider";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { getPlay, getGuessedDate } from "@/lib/utils";
import React from "react";

export default function Play() {
    const [sliderVal, setSliderVal] = React.useState(0)

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={300}
            />
            <h1 className="z-10 text-xl text-transparent bg-white cursor-default text-edge-outline animate-title font-display sm:text-2xl md:text-4xl whitespace-nowrap bg-clip-text ">
                tarikle
            </h1>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <div className="ml-10 mr-10 animate-fade-in grid justify-center">
                <iframe className="w-[40vw] h-[23vw] my-8" src="https://www.youtube.com/embed/kHh7LMzlKRI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <h2 className="my-8 text-xl text-white text-center cursor-default text-edge-outline animate-title font-display">Youtube title videos here</h2>
                <center className="text-white text-lg font-display relative inline-block w-[12vw] h-[4vw] bg-red-500 mb-5 rounded-lg place-self-center">
                    <div className="text-center h-full">{getGuessedDate(sliderVal)}</div>
                </center>
                <DateSlider className="mb-10" value={[sliderVal]} onValueChange={(val) => setSliderVal(val[0])} />
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => {
                        // router.push('/play')
                        getPlay();
                    }}
                >
                    GUESS
                </Button>
            </div>
        </div>
    );

}
