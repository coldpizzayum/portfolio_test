import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges class strings the way this project actually needs: clsx handles
 *  conditional/falsy values, twMerge then resolves conflicting Tailwind
 *  utilities (e.g. two different `p-*` classes) by keeping the last one
 *  instead of leaving both in the string and letting CSS source order
 *  decide. Use this anywhere a component accepts an external `className`
 *  that should be able to override the component's own default classes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
