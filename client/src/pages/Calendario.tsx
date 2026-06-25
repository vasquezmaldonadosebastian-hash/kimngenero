/*
 * Calendario — KimnGenero
 * Design: Hero con gradiente azul/morado + iframe de Google Calendar
 */

import React from "react";

export default function Calendario() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A0A2E 0%, #03122E 40%, #0176DE 100%)",
          minHeight: "35vh",
        }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663447566391/LYhypHEVUXKoDvuf57dpiK/hero-observatorio-mwRwNRovbtzvjPr26s6PvP.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="container relative z-10 py-10 sm:py-12 lg:py-16">
          <div className="max-w-4xl">
            {/* Breadcrumb style */}
            <div className="text-white/80 text-xs mb-6">
              Inicio &gt; <span className="font-semibold text-white">Calendario de actualizaciones</span>
            </div>

            {/* Title */}
            <h1
              className="mb-5 text-3xl font-extrabold leading-tight text-white lg:text-4xl"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Calendario de actualizaciones
            </h1>

            {/* Description */}
            <p className="max-w-3xl text-sm leading-relaxed text-white/90 lg:text-base">
              El calendario de actualización de indicadores de género es una herramienta estratégica de comunicación que permite a la Universidad Católica de Temuco informar oportunamente a personas e instituciones interesadas sobre las fechas y procesos de actualización de estos indicadores. Facilita la planificación, el seguimiento y la toma de decisiones con enfoque de género, promoviendo la transparencia, la coordinación interinstitucional y el acceso equitativo a información clave a nivel nacional.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CALENDAR CONTENT ─── */}
      <section className="flex w-full flex-col items-center px-4 py-8 sm:py-12">
        <div className="mb-6 w-full max-w-7xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          <iframe 
              src="https://calendar.google.com/calendar/embed?src=c_7aa6cfd290f787a674e8f2bed624e22ee309900e32135a3c9c3678eafa5e9a63%40group.calendar.google.com&ctz=America%2FSantiago" 
              style={{ border: "0" }} 
              width="100%" 
              height="720" 
              frameBorder="0" 
              scrolling="yes"
              title="Calendario de actualizaciones"
              className="h-[72vh] min-h-[620px] w-full"
            ></iframe>
        </div>

        {/* Add Calendar Button */}
        <div className="flex w-full max-w-7xl justify-center">
          <a 
            href="https://calendar.google.com/calendar/u/0?cid=c_7aa6cfd290f787a674e8f2bed624e22ee309900e32135a3c9c3678eafa5e9a63%40group.calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0176DE] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0165c0] sm:w-auto"
          >
            Añadir Calendario
          </a>
        </div>
      </section>
    </div>
  );
}
