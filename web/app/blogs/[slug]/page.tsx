import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

interface BlogPostData {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
}

// Fetch the blog post content
async function getBlogPost(slug: string) {
    const filePath = path.join(process.cwd(), 'app/blogs/posts', `${slug}.mdx`);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { content, data } = matter(fileContents);

        return {
            content,
            data: data as BlogPostData,
        };
    } catch (error) {
        console.error('Error reading file:', filePath);
        return {
            content: '',
            data: { title: 'Post Not Found', date: '', excerpt: '', slug },
        };
    }
}

export type paramsType = Promise<{ slug: string }>;

export default async function BlogPost({ params }: { params: { slug: string } }) {
    // Fetch blog post data
    const { content, data } = await getBlogPost(params.slug);

    return (
        <div className="flex flex-col items-center justify-center w-full px-6">
            <div className="w-full max-w-[1300px] space-y-8 py-8">
                <Link href="/blogs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blogs
                </Link>

                <h1 className="text-3xl font-bold text-cyan-400">{data.title}</h1>
                <p className="text-muted-foreground ">{data.date}</p>

                {/* Render MDX content */}
                <MDXRemote
                    source={content}
                    options={{
                        mdxOptions: {
                            rehypePlugins: [rehypeHighlight],
                            remarkPlugins: [remarkGfm, remarkFrontmatter],
                        },
                    }}
                />
            </div>
        </div>
    );
}
