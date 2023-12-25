"use client";

import { DateSlider } from "@/components/date-slider";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import Image from "next/image"
import { Separator } from "@/components/ui/separator";
import { getPlay, embedBase, validateGuessedDate, formatDateToMonthYear, getDiffDate, convertGuessedNumberToDate, getScoreRound, thumbnailBase } from "@/lib/utils";
import { Video } from "@/types";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Play() {
    const [sliderVal, setSliderVal] = React.useState(0)
    const [randomVideos, setRandomVideos] = React.useState<Video[]>([])
    const [round, setRound] = React.useState(0)
    const [isGuessed, setIsGuessed] = React.useState(false)
    const [scores, setScores] = React.useState<number[]>([])
    const hardMode = true;

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
            <h1 className="z-10 text-5xl text-transparent bg-white cursor-default text-edge-outline animate-title font-display  max-md:text-7xl max-md:mb-8 whitespace-nowrap bg-clip-text ">
                tarikle
            </h1>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            {
                randomVideos.length != 0 ? (
                    <div className="z-10 ml-10 mr-10 mt-8 animate-fade-in grid justify-center">
                        {
                            round < 5 ? (
                                <>
                                    {
                                        <div className="sm:w-[80vw] sm:h-[46vw] lg:w-[60vw] lg:h-[35vw] xl:w-[40vw] xl:h-[23vw] 2xl:w-[40vw] 2xl:h-[23vw]">
                                            <AspectRatio ratio={16 / 9} className="bg-muted">
                                                {!hardMode ? (
                                                    <iframe className="w-full h-full" src={embedBase(randomVideos[round].videoId)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                                ) : (
                                                    <Image
                                                        src={thumbnailBase(randomVideos[round].videoId)}
                                                        alt={randomVideos[round].title}
                                                        fill
                                                        className="rounded-md object-cover"
                                                    />
                                                )}
                                            </AspectRatio>
                                        </div>
                                    }
                                    <h2 className="mt-8 mb-8 max-md:mb-10 text-xl text-white text-center cursor-default text-edge-outline animate-title font-display">
                                        {randomVideos[round].title}
                                    </h2>
                                    {
                                        !isGuessed ? (
                                            <>
                                                <center className="flex text-white text-lg font-display max-sm:w-[30vw] max-sm:h-[12vw] sm:w-[24vw] sm:h-[8vw] lg:w-[12vw] lg:h-[4vw] xl:w-[12vw] xl:h-[4vw] 2xl:w-[12vw] 2xl:h-[4vw] bg-red-500 mb-5 rounded-lg place-self-center">
                                                    <div className="text-center m-auto">
                                                        {formatDateToMonthYear(convertGuessedNumberToDate(sliderVal))}
                                                    </div>
                                                </center>
                                                <DateSlider className="mb-10" value={[sliderVal]} onValueChange={(val: number[]) => setSliderVal(val[0])} />
                                                <Button
                                                    size="lg"
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        setIsGuessed(true)
                                                        setScores([...scores, getScoreRound(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal))])
                                                    }}
                                                >
                                                    GUESS
                                                </Button></>
                                        ) : <>
                                            <div className="flex justify-around">
                                                <center className="flex max-sm:mr-2 text-white text-lg font-display max-sm:w-[30vw] max-sm:h-[12vw] sm:w-[24vw] sm:h-[8vw] lg:w-[12vw] lg:h-[4vw] xl:w-[12vw] xl:h-[4vw] 2xl:w-[12vw] 2xl:h-[4vw] bg-red-500 mb-5 rounded-lg place-self-center">
                                                    <div className="text-center m-auto">
                                                        {getScoreRound(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal))}/1000
                                                    </div>
                                                </center>
                                                <Separator orientation="vertical" />
                                                <center className="flex flex-col max-sm:ml-2 text-white text-lg font-display mb-5 rounded-lg place-self-center">
                                                    <div className="text-center m-auto">
                                                        You are {validateGuessedDate(randomVideos[round].publishedAt, formatDateToMonthYear(convertGuessedNumberToDate(sliderVal)))
                                                            ? "PERFECT"
                                                            : getDiffDate(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal))} months off
                                                    </div>
                                                    <div className="text-center m-auto text-cyan-400">
                                                        Your guess = {formatDateToMonthYear(convertGuessedNumberToDate(sliderVal))}
                                                    </div>
                                                    <div className="text-center m-auto mb-4 text-emerald-600">
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
                                            </div>

                                        </>
                                    }
                                </>
                            ) : (
                                <>
                                    <div>Round End, score : {scores.reduce((a, v) => a = a + v, 0)}</div>
                                </>
                            )
                        }
                    </div>
                ) : <div>wait</div>
            }
        </div>
    );

}
