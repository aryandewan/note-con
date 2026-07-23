import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Container } from "~/components/ui/Container";
import { Reveal } from "~/components/ui/Reveal";
import { FAQS, type Faq as FaqType } from "~/data/faqs";
import { easeExpo } from "~/lib/motion";

function FaqItem({ item, defaultOpen }: { item: FaqType; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const reduce = useReducedMotion();
  const id = useId();
  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-[1.4rem] text-left font-display text-[1.2rem] font-bold text-ink"
      >
        {item.q}
        <span
          className={`grid size-[1.6rem] shrink-0 place-items-center rounded-full font-display text-base leading-none font-bold transition-[transform,background-color] duration-300 ${
            open ? "rotate-45 bg-primary text-cloud" : "bg-surface-2 text-primary-ink"
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: easeExpo }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] pb-[1.4rem] pr-1 text-[1.05rem] text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-[clamp(4rem,9vw,7.5rem)]">
      <Container className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-[clamp(2rem,5vw,4rem)]">
        <Reveal className="max-w-[40ch]">
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">Questions, sorted.</h2>
          <p className="mt-4 text-[1.125rem] text-muted text-pretty">
            Everything you’d ask before opening your first squad.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="border-t border-line">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} item={f} defaultOpen={i === 0} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
