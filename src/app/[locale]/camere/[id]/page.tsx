import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales } from "@/src/lib/i18n";
import { rooms } from "@/src/data/rooms/rooms";
import RoomDetail from "@/src/components/rooms/RoomDetail";

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of locales) {
    for (const room of rooms) {
      params.push({ locale, id: String(room.id) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const room = rooms.find((r) => r.id === Number(id));
  if (!room) return { title: "Camera non trovata" };
  return {
    title: `${room.name.it} - Residence Le Farfalle`,
    description: `Camera ${room.size} m², ${room.capacity} posti, bagno privato. Da €${room.priceFrom}/notte. Nel centro di Isola di Capo Rizzuto.`,
  };
}

interface RoomPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { locale, id } = await params;
  const room = rooms.find((r) => r.id === Number(id));
  if (!room) notFound();
  return (
    <div className="min-h-screen pt-20">
      <RoomDetail room={room} locale={locale || "it"} />
    </div>
  );
}
