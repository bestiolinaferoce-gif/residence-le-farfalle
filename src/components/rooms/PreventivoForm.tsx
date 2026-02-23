"use client";

import React, { useState } from "react";
import { rooms } from "@/src/data/rooms/rooms";
import Button from "@/src/components/ui/Button";

interface PreventivoFormProps {
  locale: string;
  roomId: number;
  roomName: string;
}

export default function PreventivoForm({ locale, roomId, roomName }: PreventivoFormProps) {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <p className="text-green-600 font-semibold">Richiesta inviata!</p>
        <p className="text-sm text-neutral-600 mt-2">
          Ti contatteremo entro 24 ore.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4"
          onClick={() => setIsSubmitted(false)}
        >
          Nuova richiesta
        </Button>
      </div>
    );
  }

  const room = rooms.find((r) => r.id === roomId);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="roomId" value={roomId} />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">Check-in</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">Check-out</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={formData.checkIn}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Ospiti</label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
        >
          {room && Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "ospite" : "ospiti"}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Nome *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Telefono *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Note (opzionale)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
      >
        Richiedi preventivo
      </Button>
    </form>
  );
}
