"use client";

import { useEffect } from "react";
import { GA_EVENTS } from "@/src/lib/analytics";

export default function RoomViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    GA_EVENTS.roomView(slug);
  }, [slug]);

  return null;
}
