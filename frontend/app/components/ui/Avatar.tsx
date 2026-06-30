import { avatarFor } from "~/lib/avatar";

const SIZES = {
  sm: "size-7 text-[0.62rem]",
  md: "size-8 text-[0.72rem]",
} as const;

export function Avatar({
  name,
  you = false,
  size = "md",
}: {
  name: string;
  you?: boolean;
  size?: keyof typeof SIZES;
}) {
  const { background, initials } = avatarFor(name, you);
  return (
    <span
      title={name}
      style={{ background, fontSize: you ? "0.52rem" : undefined }}
      className={`grid shrink-0 place-items-center rounded-full border-2 border-surface font-display font-extrabold uppercase text-cloud ${SIZES[size]}`}
    >
      {initials}
    </span>
  );
}
