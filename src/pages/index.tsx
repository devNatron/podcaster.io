import {GetStaticProps} from 'next';

import styles from '../styles/home.module.scss'

import {api} from '../services/api'

import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from "date-fns";

import { CardPodcast } from "../components/CardPodcast";
import { PodcastItem } from "../components/PodcastItem";
import { convertDurationToTimeString } from '../Utils/convertDurationToTimeString';

export type EpisodeProps = {
    id: string,
    title: string,
    truncatedTitle: string,
    thumbnail: string,
    members: string;
    publishedAt: string;
    duration: number,
    durationAsString: string;
    description: string;
    url: string;
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
                title={episode.title}
                description={episode.description}
                durationAsString={episode.durationAsString}
                publishedAt={episode.publishedAt}
                thumbnail={episode.thumbnail}
                members={episode.members}
                truncatedTitle={episode.truncatedTitle}
              />
            )
          })}
        </div>
      </section>

      <section className={styles.todosEpisodios}>
        <h2>Todos os episódios</h2>
        <div >
        {props.allEpisodes.map(episode => {
            return (
              <PodcastItem 
                key={episode.id}
                title={episode.title}
                durationAsString={episode.durationAsString}
                publishedAt={episode.publishedAt}
                thumbnail={episode.thumbnail}
                members={episode.members}
                truncatedTitle={episode.truncatedTitle}
              />
            )
          })}
        </div>
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
      truncatedTitle: `${episode.title.slice(0, 30)}...`,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })
  
  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}