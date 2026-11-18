import clsx, { type ClassValue } from "clsx";

/** Join class names conditionally: cn("a", cond && "b") */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
