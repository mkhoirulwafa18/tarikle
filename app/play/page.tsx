"use client";

import { DateSlider } from "@/components/date-slider";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { getPlay, embedBase, validateGuessedDate, formatDateToMonthYear, getDiffDate, convertGuessedNumberToDate } from "@/lib/utils";
import { Video } from "@/types";
import React from "react";

export default function Play() {
    const [sliderVal, setSliderVal] = React.useState(0)
    const [randomVideos, setRandomVideos] = React.useState<Video[]>([])
    const [round, setRound] = React.useState(0)
    const [isGuessed, setIsGuessed] = React.useState(false)

    const getVideos = async () => {
        const videos = await getPlay();
        setRandomVideos(videos);
    }

    React.useEffect(() => {
        getVideos()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <Particles
                className="absolute inset-0 -z-0 animate-fade-in"
                quantity={300}
            />
            <h1 className="z-10 text-2xl text-transparent bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-6xl whitespace-nowrap bg-clip-text ">
                tarikle
            </h1>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            {
                randomVideos.length != 0 ? (
                    <div className="z-10 ml-10 mr-10 animate-fade-in grid justify-center">
                        {
                            round < 5 ? (
                                <>
                                    <iframe className="w-[40vw] h-[23vw] my-8" src={embedBase(randomVideos[round].videoId)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    <h2 className="mb-8 text-xl text-white text-center cursor-default text-edge-outline animate-title font-display">
                                        {randomVideos[round].title}
                                    </h2>
                                </>
                            ) : <><div>Round End</div></>
                        }
                        {
                            !isGuessed ? (
                                <>
                                    <center className="flex text-white text-lg font-display w-[12vw] h-[4vw] bg-red-500 mb-5 rounded-lg place-self-center">
                                        <div className="text-center m-auto">
                                            {formatDateToMonthYear(convertGuessedNumberToDate(sliderVal))}
                                        </div>
                                    </center>
                                    <DateSlider className="mb-10" value={[sliderVal]} onValueChange={(val: number[]) => setSliderVal(val[0])} />
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        onClick={async () => {
                                            // router.push('/play')
                                            setIsGuessed(true)
                                        }}
                                    >
                                        GUESS
                                    </Button></>
                            ) : <>
                                <center className="flex flex-col text-white text-lg font-display mb-5 rounded-lg place-self-center">
                                    <div className="text-center m-auto">
                                        Your guess = {formatDateToMonthYear(convertGuessedNumberToDate(sliderVal))}
                                    </div>
                                    <div className="text-center m-auto">
                                        You are {validateGuessedDate(randomVideos[round].publishedAt, formatDateToMonthYear(convertGuessedNumberToDate(sliderVal)))
                                            ? "CORRECT"
                                            : getDiffDate(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal))} months off
                                    </div>
                                    <div className="text-center m-auto">
                                        Actual date = {formatDateToMonthYear(new Date(randomVideos[round].publishedAt))}
                                    </div>
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        onClick={async () => {
                                            // router.push('/play')
                                            setIsGuessed(false)
                                            setSliderVal(0)
                                            setRound((round) => round < 5 ? round + 1 : 100)
                                        }}
                                    >
                                        NEXT
                                    </Button>
                                </center>
                            </>
                        }
                    </div>
                ) : <div>wait</div>
            }
        </div>
    );

}
