import { motion, useScroll, useTransform } from "framer-motion";

export default function GoldenRunes() {
  const { scrollY } = useScroll();

  // Small parallax effect
  const y1 = useTransform(scrollY, [0, 800], [0, -40]);
  const y2 = useTransform(scrollY, [0, 800], [0, 60]);

  const runes = Array.from({ length: 22 });

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {runes.map((_, i) => (
        <motion.div
          key={i}
          style={{
            y: i % 2 === 0 ? y1 : y2,
            left: `${(i * 137) % 100}%`,
            top: `${(i * 47) % 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.15],
            rotate: [0, 10, -10, 0],
            scale: [0.8, 1.2, 1],
          }}
          transition={{
            duration: 6 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-yellow-400/40 text-4xl"
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}
