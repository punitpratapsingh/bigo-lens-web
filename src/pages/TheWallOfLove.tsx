import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

/* -------------------------
   Data Types
------------------------- */

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  review: string;
  photo?: string;
  logo?: string;
  rating?: number;
};

/* -------------------------
   Testimonial Content
------------------------- */

const TESTIMONIALS: Testimonial[] = [
  // 🔥const TESTIMONIALS: Testimonial[] = [
  {
    id: "shaun-brown",
    name: "Shaun Brown",
    role: "Founder & CEO",
    company: "Orbit Metrics",
    email: "shaun@orbitmetrics.io",
    photo: "/assets/testimonials/shaun-brown.jpg",
    logo: "/assets/logos/orbit-metrics.svg",
    rating: 5,
    review:
      "Working with the team has been incredible. They took our complex, undocumented codebase and turned it into a clean, production-ready system with CI/CD, testing, and docs. Communication was seamless and I fully trust the team for future projects.",
  },
  {
    id: "michael-guimarin",
    name: "Michael Guimarin",
    role: "Founder & CEO",
    company: "Wordout",
    email: "michael@wordout.co",
    photo: "/assets/testimonials/michael-guimarin.jpg",
    logo: "/assets/logos/wordout.svg",
    rating: 5,
    review:
      "They helped us move from concept to a SaaS MVP in six weeks and iterated rapidly after. Project management and responsiveness during critical moments were exceptional.",
  },
  {
    id: "eanna-mac",
    name: "Eanna Mac Gearailt",
    role: "Founder",
    company: "GrowthLab",
    email: "eanna@growthlab.ie",
    photo: "/assets/testimonials/eanna.jpg",
    logo: "/assets/logos/growthlab.svg",
    rating: 5,
    review:
      "Understanding the idea instantly and delivering a solution before our first call — communication and professionalism stood out. Highly recommended.",
  },
  {
    id: "jared-ae",
    name: "Jared AE",
    role: "Director",
    company: "Winchester College",
    email: "jared@winchester.edu",
    photo: "/assets/testimonials/jared.jpg",
    logo: "/assets/logos/winchester.svg",
    rating: 5,
    review:
      "They set up an efficient cold emailing automation system, guided us patiently, and were transparent and reliable throughout. Highly recommended.",
  },
  {
    id: "reid-chong",
    name: "Reid Chong",
    role: "Co-Founder",
    company: "Dex",
    email: "reid@dex.io",
    photo: "/assets/testimonials/reid.jpg",
    logo: "/assets/logos/dex.svg",
    rating: 5,
    review:
      "Built a solid MVP that helped us go to market quickly. Communication across time zones was fast and collaborative — a reliable world-class tech partner.",
  },
  {
    id: "alex-pryor",
    name: "Alexander Pryor",
    role: "Co-Founder",
    company: "PSA 10 Investment Group",
    email: "alex@psa10.com",
    photo: "/assets/testimonials/alex-pryor.jpg",
    logo: "/assets/logos/psa10.svg",
    rating: 5,
    review:
      "They shipped a handwriting model and data pipeline quickly, enabling targeted prospecting and significant revenue from a modest spend.",
  },
  {
    id: "thomas-manwaring",
    name: "Thomas Manwaring",
    role: "Founder & CEO",
    company: "Hypemail",
    email: "thomas@hypemail.io",
    photo: "/assets/testimonials/thomas.jpg",
    logo: "/assets/logos/hypemail.svg",
    rating: 5,
    review:
      "They turned my SaaS idea into a clean, user-friendly product that exceeded expectations. Fast, reliable, and deadline-driven without sacrificing quality.",
  },
  {
    id: "greg-warner",
    name: "Greg Warner",
    role: "Founder",
    company: "Revvy",
    email: "greg@revvy.com",
    photo: "/assets/testimonials/greg.jpg",
    logo: "/assets/logos/revvy.svg",
    rating: 5,
    review:
      "Took concept to working SaaS in eight weeks. Smooth process, exceptional attention to detail and speed — I trust them with my product journey.",
  },
  {
    id: "brad-milne",
    name: "Brad Milne",
    role: "Co-Founder",
    company: "SupplierHQ",
    email: "brad@supplierhq.com",
    photo: "/assets/testimonials/brad.jpg",
    logo: "/assets/logos/supplierhq.svg",
    rating: 5,
    review:
      "Exceeded expectations building our MVP, providing round-the-clock support during launch and helping us resolve issues rapidly. A true game-changer.",
  },
  {
    id: "ryan-samii",
    name: "Ryan Samii",
    role: "Founder & CEO",
    company: "Standard Draft",
    email: "ryan@standarddraft.com",
    photo: "/assets/testimonials/ryan.jpg",
    logo: "/assets/logos/standard-draft.svg",
    rating: 5,
    review:
      "They worked with us through the entire process and built a product that met our needs. Their patience and willingness to educate was invaluable.",
  },
  {
    id: "eric-bort",
    name: "Eric Bort",
    role: "Founder & CEO",
    company: "ClearlyTrained",
    email: "eric@clearlytrained.com",
    photo: "/assets/testimonials/eric.jpg",
    logo: "/assets/logos/clearlytrained.svg",
    rating: 5,
    review:
      "Their discovery phase was thorough and creative. They asked the right questions and turned concepts into concrete proofs-of-concept we could validate with clients.",
  },
  {
    id: "jake-valentine",
    name: "Jake Valentine",
    role: "Founder",
    company: "DealFlow",
    email: "jake@dealflow.io",
    photo: "/assets/testimonials/jake.jpg",
    logo: "/assets/logos/dealflow.svg",
    rating: 5,
    review:
      "Saved us time and money by delivering a workflow automation that eliminated 100hrs/month of manual work. Transparent and committed to success.",
  },
  {
    id: "dean-sloves",
    name: "Dean Sloves",
    role: "Founder & CEO",
    company: "PayBatch",
    email: "dean@paybatch.com",
    photo: "/assets/testimonials/dean.jpg",
    logo: "/assets/logos/paybatch.svg",
    rating: 5,
    review:
      "Proactive communication and practical solutions helped us ship our MVP in eight weeks. The team was exceptional to collaborate with.",
  },
  {
    id: "yash-chavan",
    name: "Yash Chavan",
    role: "Founder & CEO",
    company: "Saral",
    email: "yash@saral.in",
    photo: "/assets/testimonials/yash.jpg",
    logo: "/assets/logos/saral.svg",
    rating: 5,
    review:
      "They unblocked critical infrastructure issues quickly and saved us trial-and-error costs. The guidance was priceless for a bootstrapped startup.",
  },
  {
    id: "tj-grottfried",
    name: "TJ Grottfried",
    role: "Founder & CEO",
    company: "Veerview",
    email: "tj@veerview.com",
    photo: "/assets/testimonials/tj.jpg",
    logo: "/assets/logos/veerview.svg",
    rating: 5,
    review:
      "Great availability during our working hours and clear, consistent delivery. A dependable long-term partner for outsourced development.",
  },
  {
    id: "evan-dempsey",
    name: "Evan Dempsey",
    role: "CEO",
    company: "Recommendify",
    email: "evan@recommendify.com",
    photo: "/assets/testimonials/evan.jpg",
    logo: "/assets/logos/recommendify.svg",
    rating: 5,
    review:
      "Rohan is an invaluable source of advice on emerging tech trends and building efficient remote teams in a cost-effective way.",
  },
  {
    id: "michael-stewart",
    name: "Michael Stewart",
    role: "Owner",
    company: "US Commercial Photography",
    email: "michael@uscphoto.com",
    photo: "/assets/testimonials/michael-stewart.jpg",
    logo: "/assets/logos/uscphoto.svg",
    rating: 5,
    review:
      "Rohan does excellent consulting — organized, responsive, and accountable. He delivered pragmatic technical and marketing guidance for our business.",
  },
  {
    id: "brooke-daye",
    name: "Brooke D. Daye",
    role: "Founder & CEO",
    company: "FIT24",
    email: "brooke@fit24.io",
    photo: "/assets/testimonials/brooke.jpg",
    logo: "/assets/logos/fit24.svg",
    rating: 5,
    review:
      "The team is fire — fast execution and creative solutions. They get things done and are a pleasure to work with.",
  },
  {
    id: "kristian-ivanov",
    name: "Kristian Ivanov",
    role: "CTO",
    company: "Influetize",
    email: "kristian@influetize.com",
    photo: "/assets/testimonials/kristian.jpg",
    logo: "/assets/logos/influetize.svg",
    rating: 5,
    review:
      "As an engineer, I can vouch for their technical competence — they deliver fast and execute well without the usual surprises.",
  },
  {
    id: "brittany-mcdaniel",
    name: "Brittany McDaniel",
    role: "CEO",
    company: "Text An Offer",
    email: "brittany@textanoffer.com",
    photo: "/assets/testimonials/brittany.jpg",
    logo: "/assets/logos/textanoffer.svg",
    rating: 5,
    review:
      "Patient, insightful guidance on SaaS and product strategy — highly recommended for founders seeking clarity and execution.",
  }
];


/* -------------------------
   Stars Component
------------------------- */

const StarRow: React.FC<{ rating?: number }> = ({ rating = 5 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <div className="inline-flex items-center gap-1 text-yellow-400" aria-hidden>
      {stars.map((on, i) => (
        <Star
          key={i}
          className={`w-4 h-4 drop-shadow-sm ${
            on ? "opacity-100" : "opacity-30"
          }`}
        />
      ))}
    </div>
  );
};

/* -------------------------
   Main Component
------------------------- */

export default function TheWallOfLove(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = useMemo(() => TESTIMONIALS, []);
  const autoplayRef = useRef<number | null>(null);
  const total = testimonials.length;

  // Autoplay for mobile
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const id = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % total);
    }, 5000);

    autoplayRef.current = id;

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [total]);

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <div className="min-h-screen bg-[#04050a] text-slate-200 relative overflow-hidden">

      {/* Subtle Gold Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,200,0,0.08),transparent_70%)]"></div>

      <Navigation />

      {/* HEADER */}
      <header className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
            The Wall of Love
          </h1>

          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Loved by founders. Trusted by teams. Real stories from people who built with us.
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 pb-20">

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Showing</span>

            <div className="inline-flex bg-[#0c0f1a] border border-[#1c2235] text-slate-300 rounded-lg p-1 shadow-inner">
              <div className="px-3 py-1 text-sm font-semibold text-white">{activeIndex + 1}</div>
              <div className="px-3 py-1 text-sm text-slate-500">/ {total}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={prev}
              className="px-3 py-2 bg-[#111729] text-white border border-[#232c45] hover:bg-[#192241]"
            >
              Prev
            </Button>

            <Button
              onClick={next}
              className="px-3 py-2 bg-[#111729] text-white border border-[#232c45] hover:bg-[#192241]"
            >
              Next
            </Button>
          </div>
        </div>

        {/* DESKTOP GRID */}
        <section>
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl p-6 border border-[#1d2236] bg-[#0b0f1a] shadow-[0_0_15px_rgba(255,215,0,0.06)] hover:shadow-[0_0_25px_rgba(255,215,0,0.15)] transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#141a2e]">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 font-semibold">
                        {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold text-white">{t.name}</div>
                        <div className="text-sm text-slate-400">{t.role} — {t.company}</div>
                        <div className="text-xs text-slate-500 mt-1">{t.email}</div>
                      </div>

                      {t.logo && (
                        <img
                          src={t.logo}
                          alt={t.company}
                          className="w-16 h-10 object-contain opacity-80"
                        />
                      )}
                    </div>

                    <p className="mt-4 text-slate-300 text-sm leading-relaxed">{t.review}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <StarRow rating={t.rating} />
                      <span className="text-xs text-slate-500">Verified client</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* TABLET GRID */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl p-5 bg-[#0b0f1a] border border-[#1d2236]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#141a2e]">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 font-semibold">
                        {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role} — {t.company}</div>

                    <p className="mt-3 text-slate-300 text-sm">{t.review}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* MOBILE CAROUSEL */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <AnimatePresence initial={false}>
                {testimonials.slice(activeIndex, activeIndex + 1).map((t) => (
                  <motion.article
                    key={t.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45 }}
                    className="rounded-2xl p-6 bg-[#0b0f1a] border border-[#1d2236]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-[#141a2e]">
                        {t.photo ? (
                          <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 font-semibold">
                            {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-lg font-semibold text-white">{t.name}</div>
                            <div className="text-sm text-slate-400">{t.role} — {t.company}</div>
                          </div>

                          {t.logo && (
                            <img
                              src={t.logo}
                              alt={`${t.company} logo`}
                              className="w-14 h-10 object-contain opacity-80"
                            />
                          )}
                        </div>

                        <p className="mt-4 text-slate-300 text-sm leading-relaxed">{t.review}</p>

                        <div className="mt-4 flex items-center justify-between">
                          <StarRow rating={t.rating} />
                          <span className="text-xs text-slate-500">Verified client</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* MOBILE CONTROLS */}
            <div className="flex items-center justify-between mt-4 gap-3">
              <Button
                onClick={prev}
                className="flex-1 bg-[#111729] text-white border border-[#232c45] hover:bg-[#192241]"
              >
                Prev
              </Button>

              <Button
                onClick={next}
                className="flex-1 bg-[#111729] text-white border border-[#232c45] hover:bg-[#192241]"
              >
                Next
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 max-w-2xl mx-auto">
            Want to be featured on our Wall of Love? Let’s build something iconic together.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="/contact">
              <Button className="px-6 py-3 bg-[#ffd700] text-black font-semibold hover:bg-[#ffdd33]">
                Talk to Us
              </Button>
            </a>

            <a href="/case-studies">
              <Button
                variant="outline"
                className="px-6 py-3 border-[#ffd700] text-[#ffd700] hover:bg-[#1a1a2a]"
              >
                View Case Studies
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}




