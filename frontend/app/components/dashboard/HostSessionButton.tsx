import { Bolt } from "~/components/ui/icons";
import { useHostSession } from "./DashboardShell";

/** Primary "Host a session" button — opens the host modal via context. */
export function HostSessionButton() {
  const openHost = useHostSession();
  return (
    <button
      type="button"
      onClick={openHost}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-[0.98rem] font-bold text-cloud shadow-card transition-colors hover:bg-primary-hover hover:shadow-pop"
    >
      <Bolt size={18} /> Host a session
    </button>
  );
}
