import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

initOpenNextCloudflareForDev();

export default nextConfig;
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`

