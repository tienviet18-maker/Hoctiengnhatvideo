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
  "id": "office-N3",
  "group": "office",
  "level": "N3",
  "count": 456
 },
 {
  "id": "office-N2",
  "group": "office",
  "level": "N2",
  "count": 235
 },
 {
  "id": "office-N1",
  "group": "office",
  "level": "N1",
  "count": 414
 },
 {
  "id": "keigo",
  "group": "keigo",
  "level": null,
  "count": 135
 },
 {
  "id": "grammar-N3",
  "group": "grammar",
  "level": "N3",
  "count": 120
 }
];
