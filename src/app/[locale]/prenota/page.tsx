"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Users, Mail, Phone, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { rooms } from "@/src/data/rooms/rooms";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  roomId: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function PrenotaPage() {
  // Client component: usa useParams invece di params prop
  const params = useParams();
  const currentLocale = (params?.locale as string) || "it";
  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: "",
    checkOut: "",
    roomId: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" || name === "roomId" ? Number(value) || value : value,
    }));
    // Rimuovi errore quando l&apos;utente inizia a digitare
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof BookingFormData];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.checkIn) newErrors.checkIn = "Data check-in richiesta";
    if (!formData.checkOut) newErrors.checkOut = "Data check-out richiesta";
    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      newErrors.checkOut = "La data check-out deve essere successiva al check-in";
    }
    if (!formData.roomId) newErrors.roomId = "Seleziona una camera";
    if (formData.guests < 1) newErrors.guests = "Numero ospiti non valido";
    if (!formData.name.trim()) newErrors.name = "Nome richiesto";
    if (!formData.email.trim()) {
      newErrors.email = "Email richiesta";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email non valida";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefono richiesto";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simula invio form (da sostituire con chiamata API reale)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedRoom = rooms.find((r) => r.id === Number(formData.roomId));

  // Calcola numero notti
  const nights =
    formData.checkIn && formData.checkOut
      ? Math.ceil(
          (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // Calcola prezzo totale (placeholder)
  const pricePerNight = selectedRoom ? selectedRoom.priceFrom : 0;
  const totalPrice = nights * pricePerNight;

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20">
        <Container>
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold mb-4 text-neutral-900">
              Richiesta Inviata con Successo!
            </h1>
            <p className="text-lg text-neutral-600 mb-4">
              Grazie per aver scelto Residence Le Farfalle. Abbiamo ricevuto la tua richiesta di prenotazione.
            </p>
            <p className="text-base text-neutral-600 mb-8">
              Ti contatteremo entro 24 ore via email o WhatsApp per confermare la disponibilità e i dettagli del tuo soggiorno. Se hai urgenza, puoi contattarci direttamente al numero WhatsApp indicato nella pagina Contatti.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  checkIn: "",
                  checkOut: "",
                  roomId: "",
                  guests: 2,
                  name: "",
                  email: "",
                  phone: "",
                  notes: "",
                });
              }}
            >
              Nuova Prenotazione
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-display-sm md:text-display-md mb-6 text-neutral-900">
              Prenota la Tua Vacanza
            </h1>
            <p className="text-xl text-neutral-600">
              Compila il form per richiedere la disponibilità. Ti confermeremo entro 24 ore via email o WhatsApp.
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              Nessun pagamento anticipato richiesto. Prenotazione semplice e sicura.
            </p>
          </div>
        </Container>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date Selection */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="checkIn"
                        className="block text-sm font-medium mb-2 text-neutral-700"
                      >
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Check-in
                      </label>
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.checkIn ? "border-red-500" : "border-neutral-300"
                        }`}
                      />
                      {errors.checkIn && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.checkIn}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="checkOut"
                        className="block text-sm font-medium mb-2 text-neutral-700"
                      >
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Check-out
                      </label>
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        min={formData.checkIn || new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.checkOut ? "border-red-500" : "border-neutral-300"
                        }`}
                      />
                      {errors.checkOut && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.checkOut}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div>
                    <label
                      htmlFor="roomId"
                      className="block text-sm font-medium mb-2 text-neutral-700"
                    >
                      Camera
                    </label>
                    <select
                      id="roomId"
                      name="roomId"
                      value={formData.roomId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.roomId ? "border-red-500" : "border-neutral-300"
                      }`}
                    >
                      <option value="">Seleziona una camera</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name[currentLocale as keyof typeof room.name] || room.name.it} - fino a{" "}
                          {room.capacity} persone
                        </option>
                      ))}
                    </select>
                    {errors.roomId && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.roomId}
                      </p>
                    )}
                  </div>

                  {/* Guests */}
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium mb-2 text-neutral-700"
                    >
                      <Users className="h-4 w-4 inline mr-2" />
                      Numero Ospiti
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      max={selectedRoom?.capacity || 4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.guests ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.guests && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.guests}
                      </p>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-neutral-700"
                      >
                        <User className="h-4 w-4 inline mr-2" />
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.name ? "border-red-500" : "border-neutral-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-neutral-700"
                      >
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-neutral-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 text-neutral-700"
                    >
                      <Phone className="h-4 w-4 inline mr-2" />
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.phone ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium mb-2 text-neutral-700"
                    >
                      Note Aggiuntive (opzionale)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Richieste speciali, allergie, orari check-in..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                    Invia Richiesta Prenotazione
                  </Button>
                </form>
              </Card>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="font-display text-2xl font-bold mb-6 text-neutral-900">
                  Riepilogo
                </h3>
                {selectedRoom && nights > 0 ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-neutral-600">Camera</p>
                      <p className="font-semibold text-neutral-900">
                        {selectedRoom.name[currentLocale as keyof typeof selectedRoom.name] ||
                          selectedRoom.name.it}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Periodo</p>
                      <p className="font-semibold text-neutral-900">
                        {nights} {nights === 1 ? "notte" : "notti"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {formData.checkIn} - {formData.checkOut}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Ospiti</p>
                      <p className="font-semibold text-neutral-900">{formData.guests}</p>
                    </div>
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-neutral-600">Prezzo per notte</span>
                        <span className="font-semibold">€{pricePerNight}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-primary-600">
                        <span>Totale</span>
                        <span>€{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-neutral-500 text-sm">
                    Compila il form per vedere il riepilogo della prenotazione
                  </p>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
