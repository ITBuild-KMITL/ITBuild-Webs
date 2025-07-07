import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from "next";
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`

