import { Header } from "../components/Header";

export default function Home() {
  return (
    <div></div>
  )
}

export async function getStaticProps(){
  const response = await fetch('https://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}