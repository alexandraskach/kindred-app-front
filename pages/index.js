import { useState } from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";

export async function getServerSideProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  return {
    props: { pokemons: data },
  };
}

export default function Home({ pokemons }) {
  return (
    <Layout>
      {pokemons.results.map((pokemon) => {
        return (
          <div key={pokemon.url}>
            <Link href={`/pokemon/${pokemon.name}`}>
              <a>{pokemon.name}</a>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
}
