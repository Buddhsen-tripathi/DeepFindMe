import { getAllBlogPosts } from "../blogs/utils";

export async function GET(): Promise<Response> {
  const baseUrl = "https://deepfind.me";

  const posts = getAllBlogPosts();

  const parseDate = (dateStr: string | undefined): string => {
    if (!dateStr) return new Date().toISOString(); 
    const [dd, mm, yyyy] = dateStr.split("-").map(Number);
    const formattedDate = new Date(Date.UTC(yyyy, mm - 1, dd)).toISOString();
    return isNaN(new Date(formattedDate).getTime()) ? new Date().toISOString() : formattedDate;
  };

  const staticPages = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/tools", priority: "0.9", changefreq: "weekly" },
    { path: "/blogs", priority: "0.9", changefreq: "daily" },
    { path: "/signup", priority: "0.5", changefreq: "monthly" },
    { path: "/login", priority: "0.5", changefreq: "monthly" },
    { path: "/contact", priority: "0.5", changefreq: "monthly" },
    { path: "/privacy-policy", priority: "0.6", changefreq: "monthly" },
    { path: "/terms-of-service", priority: "0.6", changefreq: "yearly" },
  ].map(({ path, priority, changefreq }) => ({
    url: `${baseUrl}${path}`.toLowerCase(),
    lastModified: new Date().toISOString(),
    priority,
    changefreq,
  }));

  const toolCategories = [
    {
      category: "/tools/social-media",
      tools: ["/tools/social-media/username-search", "/tools/social-media/profile-analyzer"]
    },
    {
      category: "/tools/geo-location",
      tools: ["/tools/geo-location/ip-geolocation-lookup", "/tools/geo-location/satelite-street-view-search"]
    },
    {
      category: "/tools/email-and-domain",
      tools: ["/tools/email-and-domain/email-validator", "/tools/email-and-domain/domain-whois-lookup","/tools/email-and-domain/reverse-email-search"]
    },
    {
      category: "/tools/file-analysis",
      tools: ["/tools/file-analysis/metadata-extractor", "/tools/file-analysis/file-hash-checker"]
    },
    {
      category: "/tools/people-finder",
      tools: ["/tools/people-finder/face-recognition-search", "/tools/people-finder/deep-search"]
    },
    {
      category: "/tools/network-and-cyber",
      tools: ["/tools/network-and-cyber/dns-lookup", "/tools/network-and-cyber/port-scanner","/tools/network-and-cyber/subdomain-finder"]
    },
    {
      category: "/tools/dark-web-exploration",
      tools: ["/tools/dark-web-exploration/dark-web-link", "/tools/dark-web-exploration/data-breach-scanner"]
    }
  ];

  const toolPages = toolCategories.flatMap(({ category, tools }) => [
    { url: `${baseUrl}${category}`, lastModified: new Date().toISOString(), priority: "0.8", changefreq: "weekly" },
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool}`,
      lastModified: new Date().toISOString(),
      priority: "0.7",
      changefreq: "monthly"
    }))
  ]);

  // Add blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`.toLowerCase(),
    lastModified: parseDate(post.date),
    priority: "0.8",
    changefreq: "weekly",
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticPages, ...toolPages, ...blogPosts]
      .map(
        (page) => `
      <url>
        <loc>${page.url}</loc>
        <lastmod>${page.lastModified}</lastmod>
        <priority>${page.priority}</priority>
        <changefreq>${page.changefreq}</changefreq>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}