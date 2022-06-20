import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { getTags } from "../logic/tagsDatabase";

export async function getServerSideProps() {
  const tags = await getTags();
  return {
    props: {
      tags,
    },
  };
}

export default function Tags({ tags }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    fetch("/api/add-tag", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      router.replace(router.asPath);
      form.reset();
    });
  }
  return (
    <Layout>
      <h1>Tags</h1>
      <div>
        {tags.map((tag, index) => {
          return <div key={index}>{tag}</div>;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="tag" required />
        <button type="submit">Add tag</button>
      </form>
    </Layout>
  );
}
