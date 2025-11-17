import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function compareObjectValues<T extends object>(
  objA: T,
  objB: T,
  keys?: (keyof T)[],
): boolean {
  if (keys) {
    return keys.every((key) => objA[key] === objB[key])
  }

  const objKeys = Object.keys(objA) as (keyof T)[]

  return objKeys.every((key) => objA[key] === objB[key])
}
