import { useCallback, useState } from "react";

type Testimonial = {
  role: string;
  context: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    role: "Pengembang AI",
    context: "Tim pengembangan model klasifikasi teks",
    quote:
      "Alur pengujian keamanan yang terstruktur membuat evaluasi model jauh lebih sederhana. Saya bisa menjalankan serangkaian skenario pengujian dan langsung melihat hasilnya dalam satu laporan yang konsisten.",
  },
  {
    role: "Penyedia Layanan AI",
    context: "Operator platform layanan berbasis AI",
    quote:
      "Mengelola bukti tata kelola dan kepatuhan untuk beberapa layanan sekaligus biasanya tersebar di banyak dokumen. Di sini status assessment dan bukti untuk setiap layanan tersimpan pada satu tempat yang sama.",
  },
  {
    role: "Auditor Keamanan",
    context: "Review temuan pengujian keamanan AI",
    quote:
      "Temuan pengujian tersaji dengan status perbaikan yang jelas per use case, sehingga saya dapat menelusuri progres remediasi tanpa harus meminta laporan tambahan dari tim pengembang.",
  },
  {
    role: "Analis Kebijakan",
    context: "Kajian adopsi AI lintas sektor",
    quote:
      "Ringkasan adopsi dan risiko AI lintas sektor serta wilayah membantu saya memahami gambaran umum sebelum menyusun rekomendasi kebijakan yang lebih spesifik.",
  },
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const previous = useCallback(() => setIndex((current) => (current - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((current) => (current + 1) % total), [total]);

  return (
    <section aria-labelledby="testimonial-heading" className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">Testimoni</p>
          <h2 id="testimonial-heading" className="text-3xl font-semibold leading-tight sm:text-4xl">
            Bagaimana GRAZU-AI Mendukung Ekosistem AI
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Ilustrasi penerapan platform bagi penyedia layanan AI, pengembang, dan pemangku kebijakan.
          </p>
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Testimoni peran pengguna"
          className="relative mt-12"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") previous();
            if (event.key === "ArrowRight") next();
          }}
          tabIndex={-1}
        >
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_3fr_1fr] lg:items-center">
            {/* Previous preview (desktop only) */}
            <button
              type="button"
              onClick={previous}
              aria-label="Testimoni sebelumnya"
              className="hidden min-w-0 cursor-pointer border-l-2 border-transparent pl-5 text-left opacity-40 transition-opacity hover:opacity-70 focus-visible:opacity-70 lg:block"
            >
              <p className="line-clamp-3 text-sm leading-6">
                “{testimonials[(index - 1 + total) % total].quote}”
              </p>
              <p className="mt-3 text-xs font-semibold">{testimonials[(index - 1 + total) % total].role}</p>
            </button>

            {/* Active slide */}
            <figure
              aria-live="polite"
              className="min-w-0 border-l-2 border-primary pl-5 sm:pl-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                {testimonials[index].role}
              </p>
              <blockquote className="mt-5 text-lg font-medium leading-8 sm:text-xl sm:leading-9">
                “{testimonials[index].quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{testimonials[index].role}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{testimonials[index].context}</span>
              </figcaption>
            </figure>

            {/* Next preview (desktop only) */}
            <button
              type="button"
              onClick={next}
              aria-label="Testimoni berikutnya"
              className="hidden min-w-0 cursor-pointer border-l-2 border-transparent pl-5 text-left opacity-40 transition-opacity hover:opacity-70 focus-visible:opacity-70 lg:block"
            >
              <p className="line-clamp-3 text-sm leading-6">
                “{testimonials[(index + 1) % total].quote}”
              </p>
              <p className="mt-3 text-xs font-semibold">{testimonials[(index + 1) % total].role}</p>
            </button>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={previous}
              aria-label="Testimoni sebelumnya"
              className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <span aria-hidden="true">←</span>
            </button>
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Pilih testimoni">
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.role}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`Testimoni ${dotIndex + 1}: ${testimonial.role}`}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-2 rounded-full transition-all ${
                    dotIndex === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Testimoni berikutnya"
              className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs font-medium text-muted-foreground">
            Ilustrasi skenario pengguna — Bukan testimoni pelanggan nyata.
          </p>
        </div>
      </div>
    </section>
  );
}
