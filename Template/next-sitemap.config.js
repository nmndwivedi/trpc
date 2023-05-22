/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://mywebsite.ai"

module.exports = {
  siteUrl,
  generateRobotsTxt: true, // (optional)
  exclude: [
    "/dashboard",
    "/prompt-engineering",
    "/prompt-engineering/*",
    "/success",
    "/fail",
    "/sentry_sample_error",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/dashboard",
          "/prompt-engineering",
          "/prompt-engineering/*",
          "/success",
          "/fail",
          "/sentry_sample_error",
        ],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`
    ]
  },
  // ...other options
};
