import React from "react";
import { Search, Bookmark, BookOpen, HeartHandshake } from "lucide-react";

interface StepItem {
  step: string;
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
}

const steps: StepItem[] = [
  {
    step: "01",
    icon: Search,
    title: "Explore the Catalog",
    description:
      "Browse our curated shelves by genre or search for specific authors and real-time copy availability.",
    iconColor: "text-stone-700",
  },
  {
    step: "02",
    icon: Bookmark,
    title: "1-Click Borrow Request",
    description:
      "Select your return date in the Borrow modal. Available copies automatically update via atomic $inc.",
    iconColor: "text-[#C26D24]",
  },
  {
    step: "03",
    icon: BookOpen,
    title: "Enjoy Your Volume",
    description:
      "Track all your checked-out titles and scheduled return dates neatly inside your My Borrows dashboard.",
    iconColor: "text-stone-700",
  },
  {
    step: "04",
    icon: HeartHandshake,
    title: "Easy Return & Share",
    description:
      "Return your book with one click when finished so the copy immediately becomes available for another reader.",
    iconColor: "text-[#C26D24]",
  },
];

const BorrowingWorks = () => {
  return (
    <section className="w-full bg-[#F2EFE9] py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight text-[#1a3a2a] sm:text-4xl md:text-5xl">
            How Borrowing Works
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            We stripped away complex library bureaucracy so you can focus on
            reading and sharing great literature.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
          {steps.map(({ step, icon: Icon, title, description, iconColor }) => (
            <div
              key={step}
              className="group flex flex-col justify-between rounded-3xl border border-stone-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* Card Top: Icon & Step Number */}
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-stone-200/80 bg-stone-50/60 transition-colors duration-200 group-hover:border-stone-300">
                    <Icon className={`size-5 ${iconColor}`} />
                  </div>
                  <span className="font-heading text-2xl font-bold text-stone-300 select-none">
                    {step}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-heading mt-6 text-lg font-bold text-stone-900 leading-snug">
                  {title}
                </h3>

                {/* Card Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-stone-500 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BorrowingWorks;
