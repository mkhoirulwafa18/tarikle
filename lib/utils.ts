import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export function getMaxSlider(): number {
  const now = new Date
  const tarikFirstYtDate = new Date(2014, 9)
  return (now.getFullYear() - tarikFirstYtDate.getFullYear()) * 12 + now.getMonth() - tarikFirstYtDate.getMonth();
}

export function getGuessedDate(val: number) {
  const tarikFirstYtDate = new Date(2014, 9)
  return new Date(tarikFirstYtDate.getFullYear() + Math.floor(val / 12), tarikFirstYtDate.getMonth() + val % 12).toLocaleDateString("default", {
    month: "long",
    year: "numeric"
  })
}
