import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Logo } from "~/components/ui/icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="top"
      className={`sticky top-0 z-[100] border-b backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 ${
        scrolled ? "border-line bg-bg/80 shadow-card" : "border-transparent bg-bg/80"
      }`}
    >
      <Container className="flex h-[3.875rem] items-center md:h-[4.5rem]">
        <Link
          to="/"
          aria-label="Rally home"
          className="inline-flex items-center gap-2.5 font-display text-2xl font-black tracking-[-0.03em] text-ink"
        >
          <Logo className="size-[1.9rem]" />
          Rally
        </Link>
        <div className="ml-auto flex items-center gap-2 sm:gap-3.5">
          <Link
            to="/signin"
            className="rounded-full px-3 py-2 font-display text-[0.95rem] font-bold text-ink transition-colors hover:text-primary"
          >
            Sign in
          </Link>
          <Button href="/signup">Sign up</Button>
        </div>
      </Container>
    </header>
  );
}
