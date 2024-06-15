import Author from "@/components/blogComponents/Author";
import TitleText from "@/components/pageComponents/TitleText";
import blogs from "@/utils/content/blogs.json";
import { Stack } from "@mui/material";
import Link from "next/link";

const Blog = () => {
  return (
    <div style={{ padding: "4rem 0" }}>
      <div style={{ padding: "0 1.5rem" }}>
        <TitleText title="Blog" text="All the things happening on Libertas" />

        {!!blogs && (
          <section>
            {blogs.map((blog) => (
              <Link key={blog.id} href={blog.link}>
                <Stack>
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>
                  <p>{blog.author.name}</p>
                  <Author
                    name={blog.author.name}
                    link={blog.author.social.twitter.profile}
                    twitterHandle={blog.author.social.twitter.handle}
                  />
                </Stack>
              </Link>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Blog;
