import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Posts({ posts }) {
  console.log("posts: ", posts);
  return (
    <>
      <LayoutComponent metaTitle="Posts">
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
