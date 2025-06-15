"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Banner {
  id: number;
  titulo: string;
  subtitulo?: string;
  ctaTexto?: string;
  ctaUrl?: string;
  multimedia: { url: string }[];
}

export default function PromotionalBanner({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const total = banners.length;

  // Autoplay: cada 5s avanza al siguiente
  useEffect(() => {
    if (total === 0) return;
    const interval = setInterval(() => {
      setCurrent((i) => (i === total - 1 ? 0 : i + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  if (total === 0) return null;

  // Cambia de slide al anterior
  const prev = () => setCurrent((i) => (i === 0 ? total - 1 : i - 1));
  // Cambia de slide al siguiente
  const next = () => setCurrent((i) => (i === total - 1 ? 0 : i + 1));

  const banner = banners[current];
  const img = banner?.multimedia?.[0];
  if (!img) return null;

  const imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${img.url}`;

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg">
      <Image
        src={imgUrl}
        alt={banner.titulo}
        fill
        style={{ objectFit: "cover" }}
      />

      <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
        <h1 className="text-3xl font-bold">{banner.titulo}</h1>
        {banner.subtitulo && <p className="mt-1">{banner.subtitulo}</p>}
        {banner.ctaUrl && (
          <a
            href={banner.ctaUrl}
            className="mt-4 inline-block border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors"
          >
            {banner.ctaTexto || "Ver más"}
          </a>
        )}
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}
