import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Cta } from "~/components/sections/Cta";
import { Faq } from "~/components/sections/Faq";
import { Games } from "~/components/sections/Games";
import { Hero } from "~/components/sections/Hero";
import { HowItWorks } from "~/components/sections/HowItWorks";
import { Schedule } from "~/components/sections/Schedule";
import { Stats } from "~/components/sections/Stats";
import { Ticker } from "~/components/sections/Ticker";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Rally — Find your squad. Tonight." },
    {
      name: "description",
      content:
        "Rally is where multiplayer gamers find a full squad fast. Browse open squads filling up live, claim a slot, or schedule a session others join until you’re ready to play.",
    },
    { name: "theme-color", content: "#0c2740" },
  ];
}

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="absolute left-3 top-3 z-500 translate-y-[-150%] rounded-md bg-ink px-4 py-2.5 text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <HowItWorks />
        <Games />
        <Schedule />
        <Stats />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
