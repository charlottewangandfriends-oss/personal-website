import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/files/writing/dear-tomorrow-dear-past.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value:
              'attachment; filename="Dear-Tomorrow-Dear-Past-Charlotte-Wang.pdf"',
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
