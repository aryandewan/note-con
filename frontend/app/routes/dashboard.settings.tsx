import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DashboardHeader } from "~/components/dashboard/DashboardHeader";
import { Panel } from "~/components/dashboard/Panel";
import type { Route } from "./+types/dashboard.settings";
import { api } from "~/lib/api";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Settings — Rally" },
    { name: "description", content: "Your Rally account." },
  ];
}

type UserInfo = { id: string; username: string; email: string };

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5 first:pt-0 last:pb-0">
      <dt className="font-display text-[0.92rem] font-bold text-ink">{label}</dt>
      <dd className="text-[0.95rem] text-muted">{value}</dd>
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFailed(true);
      return;
    }
    fetch(api("/api/auth/info"), { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setUser)
      .catch(() => setFailed(true));
  }, []);

  const onSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      <DashboardHeader title="Settings" subtitle="Your account, at a glance." />

      <div className="grid max-w-2xl gap-5">
        <Panel title="Account">
          {user ? (
            <dl className="divide-y divide-line">
              <InfoRow label="Username" value={`@${user.username}`} />
              <InfoRow label="Email" value={user.email} />
            </dl>
          ) : (
            <p className="py-2 text-[0.95rem] text-muted">
              {failed
                ? "Couldn’t load your account — sign in again and retry."
                : "Loading your account…"}
            </p>
          )}
          <p className="mt-4 border-t border-line pt-4 text-[0.85rem] text-muted">
            Editing your username and email is coming soon.
          </p>
        </Panel>

        <Panel title="Session">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-[36ch] text-[0.95rem] text-muted">
              Sign out on this device. You can sign back in any time.
            </p>
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex cursor-pointer items-center rounded-full border-[1.5px] border-line-strong px-4 py-2 font-display text-[0.9rem] font-bold text-ink transition-colors hover:border-hot hover:text-hot"
            >
              Sign out
            </button>
          </div>
        </Panel>
      </div>
    </>
  );
}
