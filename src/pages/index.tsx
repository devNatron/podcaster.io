import {GetStaticProps} from 'next';

import styles from '../styles/pages/home.module.scss'

import {api} from '../services/api'

import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from "date-fns";

import { CardPodcast } from "../components/CardPodcast";
import { AllEpisodesList } from "../components/AllEpisodesList";
import { convertDurationToTimeString } from '../Utils/convertDurationToTimeString';

export type EpisodeProps = {
    id: string,
    title: string,
    thumbnail: string,
    members: string;
    publishedAt: string;
    duration: number,
    durationAsString: string;
    url: string;
    description: string;
}

type HomeProps = {
  latestEpisodes: EpisodeProps[],
  allEpisodes: EpisodeProps[]
}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.ultimosLancamentos}>
        <h2>Ultimos lançamentos</h2>
        <div className={styles.ultimosLancamentosCards}>
          {props.latestEpisodes.map(episode => {
            return (
              <CardPodcast 
                key={episode.id}
                id={episode.id}
                title={episode.title}
                durationAsString={episode.durationAsString}
                publishedAt={episode.publishedAt}
                thumbnail={episode.thumbnail}
                members={episode.members}
              />
            )
          })}
        </div>
      </section>

      <section className={styles.todosEpisodios}>
        <h2>Todos os episódios</h2>
        <AllEpisodesList
          allEpisodes={props.allEpisodes}
        />
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
      description: episode.description,
    }
  })
  
  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}