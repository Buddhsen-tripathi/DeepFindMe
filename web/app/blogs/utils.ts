import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
}

function convertDateFormat(dateStr: string): string {
  const [dd, mm, yyyy] = dateStr.split("-").map(Number);
  return `${yyyy}-${mm.toString().padStart(2, "0")}-${dd.toString().padStart(2, "0")}`;
}

export function getAllBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'app/blogs/posts')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug: filename.replace(/\.mdx?$/, ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
      }
    })
    .sort((a, b) => {
      // Convert dates for sorting
      const dateA = new Date(convertDateFormat(a.date)).getTime();
      const dateB = new Date(convertDateFormat(b.date)).getTime();
      return dateB - dateA;
    });
}