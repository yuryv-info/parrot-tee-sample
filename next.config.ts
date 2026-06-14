import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder. Without it, an unrelated
  // package-lock.json higher up in the filesystem makes Turbopack guess the
  // wrong root. A fork has no such neighbor, so this is just belt-and-braces.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
