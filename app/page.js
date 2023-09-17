import Link from "next/link";

export const metadata = {
  title: "Libertas",
};

const Home = () => {
  return (
    <>
      <h1>Libertas</h1>
      <Link href={"/create-post"}>Create a post</Link>
    </>
  );
};

export default Home;
