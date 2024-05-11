import type { IClient } from '@/models/ClientModel'

export default function getId(arr: IClient[]): number {
  // const copy = isSorted ? [...arr].sort((a, b) => a.id - b.id) : arr;
  const copy: IClient[] = [...arr].sort((a, b) => a.id - b.id)
  let max: number = 0

  for (let i = max; i < copy.length; i += 1) {
    if (i + 1 !== copy[i].id) {
      max += 1
    }
  }

  return max
}
