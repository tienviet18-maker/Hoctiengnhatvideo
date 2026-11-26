// Sinh tự động bởi scripts/decks/build-decks.mjs — đừng sửa tay.
import type { JlptLevel } from "./content-schema";

export type DeckGroup = "office" | "keigo" | "grammar";
export interface DeckInfo {
  id: string;
  group: DeckGroup;
  level: JlptLevel | null;
  count: number;
}

export const DECKS: DeckInfo[] = [
 {
  "id": "keigo",
  "group": "keigo",
  "level": null,
  "count": 135
 }
];
