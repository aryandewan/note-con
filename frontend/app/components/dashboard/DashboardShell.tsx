import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext, useState } from "react";
import { HostSessionModal } from "~/components/dashboard/HostSessionModal";
import { SidebarBody } from "~/components/dashboard/Sidebar";
import { TopBar } from "~/components/dashboard/TopBar";
import { Close } from "~/components/ui/icons";
import { easeExpo } from "~/lib/motion";

/** Lets anything rendered inside DashboardShell open the "Host a session" modal. */
const HostSessionContext = createContext<() => void>(() => {});
export function useHostSession() {
  return useContext(HostSessionContext);
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [hostOpen, setHostOpen] = useState(false);
  const reduce = useReducedMotion();
  const close = () => setOpen(false);
  const openHost = () => setHostOpen(true);

  return (
    <div className="min-h-svh bg-bg">
      {/* Fixed desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-surface lg:flex">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              onClick={close}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[82%] flex-col border-r border-line bg-surface"
              initial={reduce ? { opacity: 0 } : { x: "-100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "-100%" }}
              transition={{ duration: reduce ? 0 : 0.28, ease: easeExpo }}
              role="dialog"
              aria-label="Navigation"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close navigation"
                className="absolute right-3 top-4 grid size-9 place-items-center rounded-pebble text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <Close size={20} />
              </button>
              <SidebarBody onNavigate={close} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="lg:pl-60">
        <TopBar onMenu={() => setOpen(true)} onHost={openHost} />
        <main>
          <HostSessionContext.Provider value={openHost}>{children}</HostSessionContext.Provider>
        </main>
      </div>

      <HostSessionModal open={hostOpen} onClose={() => setHostOpen(false)} />
    </div>
  );
}
