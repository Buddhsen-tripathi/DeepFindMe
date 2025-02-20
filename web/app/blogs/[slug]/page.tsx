import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkfrontmatter from "remark-frontmatter";

interface BlogPostData {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

// Fetch the list of slugs (paths to blog posts)
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "app/blogs/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const slugs = filenames
    .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
    .map((filename) => ({
      slug: filename.replace(/\.mdx?$/, ""),
    }));

  return slugs;
}

// Function to fetch the blog post content
async function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "app/blogs/posts", `${slug}.mdx`);

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);

    return {
      content,
      data: data as BlogPostData,
    };
  } catch (error) {
    console.error("Error reading file:", filePath);
    return {
      content: "",
      data: { title: "Post Not Found", date: "", excerpt: "", slug },
    };
  }
}

export type paramsType = Promise<{ slug: string }>;

// Blog Post component that renders the content
export default async function BlogPost({ params }: { params: paramsType }) {
  // Fetch the blog content and data
  const { content, data } = await getBlogPost((await params).slug);

  return (
    <div className="container flex-grow mx-auto px-20 py-16 ">
      <meta name="title" content={`${data.title} - DeepFind.Me`} />
      <meta name="description" content={`${data.excerpt}`} />
      <meta property="og:url" content={`https://DeepFind.Me/blogs/${data.slug}`} />
      <title>{`${data.title} - DeepFind.Me`}</title>

      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-cyan-400">{data.title}</h1>
        <p className="text-lg text-gray-300">{data.date}</p>
      </header>

      {/* Render the MDX content */}
      <div className="prose prose-invert max-w-none mt-8">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight],
              remarkPlugins: [remarkGfm, remarkfrontmatter],
            },
          }}
        />
      </div>
    </div>
  );
}
