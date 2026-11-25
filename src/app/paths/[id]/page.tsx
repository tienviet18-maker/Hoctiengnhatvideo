import { notFound } from "next/navigation";
import PathClient from "./PathClient";
import { PATHS } from "../../../lib/paths";

export function generateStaticParams() {
  return PATHS.map((p) => ({ id: p.id }));
}

export default async function PathPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!PATHS.some((p) => p.id === id)) notFound();
  return <PathClient pathId={id} />;
}
