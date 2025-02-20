import Link from "next/link";
import { getAllBlogPosts } from "./utils";

export default async function Blogs() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="container py-8 space-y-8">
      <meta name="title" content="Blogs - DeepFind.Me" />
      <meta name="description" content="Read the latest articles and tutorials on technology, programming, and more." />
      <meta property="og:url" content="https://deepfind.me/blogs" />
      <title>Blogs - DeepFind.Me</title>

      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-center text-cyan-400">Welcome to Our Blog!</h1>
        <p className="text-lg text-center text-gray-300">Latest articles on OSINT</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="space-y-4 h-full flex flex-col">
              <div>
                <h2 className="text-xl font-semibold text-yellow-400">{post.title}</h2>
                <time className="text-sm text-gray-400">{post.date}</time>
              </div>
              <p className="text-gray-300 flex-grow">{post.excerpt}</p>
              <Link href={`/blogs/${post.slug}`} className="text-cyan-400 hover:underline self-start">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
