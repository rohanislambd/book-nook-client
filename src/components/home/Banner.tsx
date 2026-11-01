"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, PlusCircle } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

/* ─── Slide data ────────────────────────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    badge: "Community Curated Library",
    title: "Discover Stories That Linger Long After the Last Page",
    description:
      "BookNook connects neighbourhood readers through a shared digital shelf. Browse handpicked classics, contribute volumes from your own collection, and borrow effortlessly.",
    stat: "2,400+ Active Community Volumes",
    spotlightLabel: "FEATURED CLASSIC",
    spotlightStatus: "4 COPIES FREE",
    spotlightBook: "One Hundred Years of Solitude",
    spotlightAuthor: "by Gabriel García Márquez",
    bg: null,
  },
  {
    id: 2,
    badge: "Science & Discovery Wing",
    title: "Illuminate the Universe Through Verified Non-Fiction",
    description:
      "From astrophysics and molecular genetics to human-centred design, explore thought-provoking titles vetted by educators and curious minds.",
    stat: "Instant 7-to-14 Day Digital Borrowing",
    spotlightLabel: "WING SPOTLIGHT",
    spotlightStatus: "7 COPIES FREE",
    spotlightBook: "The Gene: An Intimate History",
    spotlightAuthor: "by Siddhartha Mukherjee",
    bg: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&q=80",
  },
  {
    id: 3,
    badge: "Simple Circular Reading",
    title: "Add a Book. Borrow a Book. Return a Book.",
    description:
      "Our frictionless circulation system tracks live available copies in real time, ensuring fair access for every reader in our growing literary sanctuary.",
    stat: "Zero Late Fees • 100% Reader Driven",
    spotlightLabel: "RECENTLY ADDED",
    spotlightStatus: "2 COPIES FREE",
    spotlightBook: "The Design of Everyday Things",
    spotlightAuthor: "by Don Norman",
    bg: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80",
  },
];

const AUTOPLAY_DELAY = 5500;

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function Banner() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
    setProgress(0);
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
    setProgress(0);
  }, []);

  const total = slides.length;

  /* Top progress bar animation */
  useEffect(() => {
    if (isPaused) return;
    const interval = 50;
    const step = (interval / AUTOPLAY_DELAY) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + step));
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  return (
    <div className="bg-[#FAF8F5] container mx-auto px-4 py-6 sm:px-8 sm:py-8">
      <div
        className="relative overflow-hidden rounded-2xl shadow-xl"
        onMouseEnter={() => {
          setIsPaused(true);
          swiperRef.current?.autoplay?.stop();
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          swiperRef.current?.autoplay?.start();
        }}
      >
        {/* Top orange progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
          <div
            className="h-full bg-[#e09a40] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
          onSwiper={(sw) => (swiperRef.current = sw)}
          onSlideChange={(sw) => {
            setActiveIndex(sw.realIndex);
            setProgress(0);
          }}
          className="w-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={slide.id}>
              {/* ── Slide shell: fixed height on every breakpoint so all slides are identical ── */}
              <div
                className="relative flex h-[600px] w-full items-center px-6 sm:px-10 md:px-12  lg:px-16 "
                style={{ backgroundColor: "#132d1e" }}
              >
                {/* Background image & dark forest overlay */}
                {slide.bg && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.bg})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#132d1e]/95 via-[#132d1e]/85 to-[#132d1e]/75" />
                  </>
                )}

                {/* ── Left content ── */}
                <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center">
                  {/* Badge */}
                  <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#c8923a]/40 bg-[#c8923a]/15 px-3.5 py-1">
                    <Sparkles className="h-3 w-3 shrink-0 text-[#e09a40]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#e09a40]">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Serif Heading */}
                  <h1 className="mb-3 font-heading  text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/75 sm:max-w-md sm:text-base lg:mb-8">
                    {slide.description}
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 rounded-full bg-[#d97f2a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c5711f] sm:px-6 sm:py-3"
                    >
                      Browse Books
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link href="/add-book">
                       <button className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:px-6 sm:py-3">
                      <PlusCircle className="h-4 w-4 text-[#e09a40]" />
                      Contribute a Book
                    </button>
                    </Link>
                  </div>
                </div>

                {/* ── Mobile-only compact info strip (below lg) ── */}
                <div className="absolute bottom-4 left-6 right-6 z-10 lg:hidden">
                  <div
                    className="flex items-center justify-between rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md"
                    style={{
                      backgroundColor: "rgba(28, 61, 40, 0.92)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Left: slide counter + stat */}
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#e09a40]">
                        Slide {String(idx + 1).padStart(2, "0")} /{" "}
                        {String(total).padStart(2, "0")}
                      </p>
                      <p className="mt-0.5 truncate text-xs font-bold leading-snug text-white">
                        {slide.stat}
                      </p>
                    </div>

                    {/* Right: dots + prev/next */}
                    <div className="flex shrink-0 items-center gap-3">
                      {/* Dots */}
                      <div className="flex items-center gap-1.5">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              swiperRef.current?.slideToLoop(i);
                              setProgress(0);
                            }}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: activeIndex === i ? "18px" : "6px",
                              backgroundColor:
                                activeIndex === i
                                  ? "#e09a40"
                                  : "rgba(255,255,255,0.3)",
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                      </div>
                      {/* Prev / Next */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handlePrev}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right info card (lg+ only) ── */}
                <div className="relative z-10 ml-6 hidden shrink-0 self-center lg:block xl:ml-10">
                  <div
                    className="flex w-72 flex-col rounded-2xl p-5 shadow-2xl backdrop-blur-md xl:w-80 xl:p-6"
                    style={{
                      backgroundColor: "rgba(28, 61, 40, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Slide counter + Live status dot */}
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#e09a40]">
                        Slide {String(idx + 1).padStart(2, "0")} /{" "}
                        {String(total).padStart(2, "0")}
                      </p>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    </div>

                    {/* Stat line */}
                    <p className="mb-4 text-base font-bold leading-snug text-white">
                      {slide.stat}
                    </p>

                    {/* Inner Wing Spotlight Box */}
                    <div className="mb-5 rounded-xl border border-white/10 bg-[#132d1e]/60 p-3.5">
                      <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-white/50">
                          {slide.spotlightLabel}
                        </span>
                        <span className="text-[#e09a40]">
                          {slide.spotlightStatus}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-white">
                        {slide.spotlightBook}
                      </p>
                      <p className="text-[11px] text-white/60">
                        {slide.spotlightAuthor}
                      </p>
                    </div>

                    {/* Dot pagination + nav */}
                    <div className="flex items-center justify-between">
                      {/* Dots */}
                      <div className="flex items-center gap-1.5">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              swiperRef.current?.slideToLoop(i);
                              setProgress(0);
                            }}
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: activeIndex === i ? "24px" : "8px",
                              backgroundColor:
                                activeIndex === i
                                  ? "#e09a40"
                                  : "rgba(255,255,255,0.25)",
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                      </div>

                      {/* Prev / Next */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



      </div>
    </div>
  );
}