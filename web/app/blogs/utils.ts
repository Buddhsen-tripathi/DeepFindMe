import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getAllBlogPosts() {
    const postsDirectory = path.join(process.cwd(), "app/blogs/posts");
    const filenames = fs.readdirSync(postsDirectory);

    return filenames
        .filter((filename) => filename.endsWith(".mdx"))
        .map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug: filename.replace(/\.mdx?$/, ""),
                title: data.title,
                date: data.date,
                excerpt: data.excerpt,
            };
        });
}
