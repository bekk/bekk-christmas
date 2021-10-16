module.exports = {
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "res.cloudinary.com",
    ],
  },
  headers: async () => [
    {
      source: "/fonts/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, immutable, max-age=31536000" },
      ],
    },
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
  ],
};
