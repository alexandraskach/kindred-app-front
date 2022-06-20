import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + context.params.pokemonId
  );
  if (res.ok === false) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const pokemon = await res.json();

  return {
    props: { pokemon },
  };
}

export default function Post({ pokemon }) {
  console.log(pokemon);

  return (
    <Layout>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} />
    </Layout>
  );
}
