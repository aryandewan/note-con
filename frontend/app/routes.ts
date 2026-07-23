import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signup", "routes/signup.tsx"),
  route("signin", "routes/signin.tsx"),
  route("dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard.lobby.tsx"),
    route("squads", "routes/dashboard.squads.tsx"),
    route("schedule", "routes/dashboard.schedule.tsx"),
    route("games", "routes/dashboard.games.tsx"),
    route("settings", "routes/dashboard.settings.tsx"),
  ]),
] satisfies RouteConfig;
