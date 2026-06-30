import { motion, useReducedMotion } from "motion/react";
import type { FormEvent } from "react";
import { Form, Link, useNavigate } from "react-router";
import { AuthLayout, Divider, Field, SocialRow } from "~/components/auth/AuthLayout";
import type { Route } from "./+types/signup";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Create your account — Rally" },
    { name: "description", content: "Join Rally and find a full squad in minutes." },
  ];
}

export default function SignUp() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  function onSubmit(formData: FormData) {
    navigate("/dashboard");
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up in seconds — your next squad is already filling up."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/signin" className="font-bold text-primary-ink hover:text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <SocialRow />
      <div className="my-6">
        <Divider>or sign up with email</Divider>
      </div>

      <form action={onSubmit} className="flex flex-col gap-4">
        <Field label="Username" name="username" autoComplete="username" placeholder="kestrel" />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
        <motion.button
          type="submit"
          whileTap={reduce ? undefined : { scale: 0.98 }}
          whileHover={reduce ? undefined : { y: -1 }}
          className="mt-1 w-full rounded-full bg-primary px-6 py-[0.95rem] font-display text-[1.05rem] font-bold text-cloud shadow-card transition-colors duration-200 hover:bg-primary-hover hover:shadow-pop"
        >
          Create account
        </motion.button>
      </form>

      <p className="mt-5 text-center text-[0.85rem] leading-relaxed text-muted">
        By creating an account you agree to Rally’s{" "}
        <span className="font-semibold text-ink">Terms</span> and{" "}
        <span className="font-semibold text-ink">Privacy Policy</span>.
      </p>
    </AuthLayout>
  );
}
