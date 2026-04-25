import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string) {
  return name.split(" ")[0];
}

export function getTimeAgo(date: any) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  const units: [string, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [name, sec] of units) {
    const val = Math.floor(s / sec);

    if (val) return `${val} ${name}${val > 1 ? "s" : ""} ago`;
  }
}
