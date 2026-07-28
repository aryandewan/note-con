import { Link, useNavigate } from "react-router";
import { AuthLayout, Divider, Field, SocialRow } from "../components/auth/AuthLayout";
import type { Route } from "./+types/signin";
import { api } from "~/lib/api";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Sign in — Rally" },
    { name: "description", content: "Sign in to Rally and jump back into a live squad." },
  ];
}

export default function SignIn() {
  const navigate = useNavigate();

  const onSubmit = async(formData: FormData) => {
      try {
         const res = await fetch(api("/api/auth/login"), {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
            body: JSON.stringify({
              username: formData.get("username"),
              password: formData.get("password"),
            }),
         });

         if (!res.ok) {
          throw new Error(`Req failed ${res.status}`)
         }

         const data = await res.json()
         console.log(data)
         localStorage.setItem("token", data.token)
         navigate("/dashboard");
       } catch (e) {
         console.log({ message: `This is an error: ${e}` });
       }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to jump back into a live lobby."
      footer={
        <>
          New to Rally?{" "}
          <Link to="/signup" className="font-bold text-primary-ink hover:text-primary">
            Create an account
          </Link>
        </>
      }
    >
      <SocialRow />
      <div className="my-6">
        <Divider>or sign in with email</Divider>
      </div>

      <form action={onSubmit} className="flex flex-col gap-4">
        <Field
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="kestrel"
        />
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-display text-[0.92rem] font-bold text-ink">Password</span>
            <Link
              to="/signin"
              className="text-[0.85rem] font-semibold text-primary-ink hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            required
            className="w-full rounded-pebble border border-line-strong bg-bg px-4 py-3 text-[1rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary-tint2"
          />
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-full bg-primary px-6 py-[0.95rem] font-display text-[1.05rem] font-bold text-cloud shadow-card transition-colors duration-200 hover:bg-primary-hover"
        >
          Log in
        </button>
      </form>
    </AuthLayout>
  );
}
