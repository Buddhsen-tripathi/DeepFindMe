import Link from "next/link";
import { getAllBlogPosts } from "./utils";

export default async function Blogs() {
  const blogPosts = await getAllBlogPosts();
  return (
    <div className="flex-grow bg-gray-900 text-white">
      <title>Blogs - DeepFind.Me</title>

      <main className="pt-4">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-cyan-400 mb-6">Latest Blogs & Articles</h1>
            <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto mb-12">
              Stay updated with the latest insights on OSINT, cybersecurity, and investigations.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link href={`/blogs/${post.slug}`} key={post.slug}>
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col">
                    <div className="flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold text-yellow-400">{post.title}</h2>
                      <time className="text-sm text-gray-400">{post.date}</time>
                      <p className="text-gray-300 mt-2 flex-grow">{post.excerpt}</p>
                    </div>
                    <div className="mt-4 text-cyan-400 font-semibold">Read More →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}