import type { Metadata } from "next";
import PathsClient from "./PathsClient";

export const metadata: Metadata = { title: "Lộ trình học" };

export default function PathsPage() {
  return <PathsClient />;
}
