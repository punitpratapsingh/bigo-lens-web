import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function PublicationsPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <main ref={ref} style={{ transform: "translateY(0)" }} className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Publications</h1>
      <p className="text-muted-foreground">A curated list of publications and resources.</p>

      <section className="mt-8">
        {publications.map((p, i) => (
          <article key={i} className="mb-6">
            <a href={p.link} className="text-lg font-semibold text-primary" target="_blank" rel="noreferrer">
              {p.title}
            </a>
            <div className="text-sm text-muted-foreground">{p.authors} — {p.source} ({p.year})</div>
          </article>
        ))}
      </section>
    </main>
  );
}

interface Publication {
  title: string;
  authors?: string;
  source?: string;
  year?: number;
  link?: string;
}

const publications: Publication[] = [
  {
    title: "Sample Publication: Improving Product Discovery with Vision Models",
    authors: "Doe, J.; Smith, A.",
    source: "Journal of E-commerce Research",
    year: 2024,
    link: "#",
  },
];
