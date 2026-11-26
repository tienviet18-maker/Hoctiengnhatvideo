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
  "id": "office-N5",
  "group": "office",
  "level": "N5",
  "count": 50
 },
 {
  "id": "office-N4",
  "group": "office",
  "level": "N4",
  "count": 138
 },
 {
  "id": "keigo",
  "group": "keigo",
  "level": null,
  "count": 135
 }
];
