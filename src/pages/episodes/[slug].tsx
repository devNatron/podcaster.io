import {useRouter} from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '../../services/api'
import { parseISO } from 'date-fns'
import { convertDurationToTimeString } from '../../Utils/convertDurationToTimeString'
import { ptBR } from 'date-fns/locale'
import format from 'date-fns/format'

import styles from '../../styles/pages/episode.module.scss'
import Image from 'next/image'
import { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import Link from 'next/link'
import Head from 'next/head'

type Episode = {
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

type EpisodeProps = {
  episode: Episode
}

export default function Episodes({episode}: EpisodeProps){
  const {play} = useContext(PlayerContext)
  return(
    <div className={styles.episodeContainer}>
      <Head>
        <title>{episode.title} | Podcaster.io</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type={'button'}>
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image
          src={episode.thumbnail}
          width={700}
          height={160}
          alt={episode.title}
          objectFit='cover'
        >
        </Image>
        <button 
          type={'button'}
          onClick={() => play(episode.id)}
        >
          <img src="/play.svg" alt="Tocar"/>
        </button>
      </div>

      <section className={styles.episodeInfo}>
        <h1>{episode.title}</h1>
        <div className={styles.episodeDetails}>
          <span>{episode.members}</span>
          <span className={styles.ponto}></span>
          <span>{episode.publishedAt}</span>
          <span className={styles.ponto}></span>
          <span>{episode.duration}</span>
        </div>
        <hr/>
        <div className={styles.episodeDescription}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </section>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    }
  })

  const paths = data.map(episode => {
    return {
      params:{
        slug: episode.id,
      }
    }
  })

  return{
    paths: paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {slug} = ctx.params;

  const {data} = await api.get(`/episodes/${slug}`)

  const episode = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR}),
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      description: data.description,
      url: data.file.url,
  }
  
  return{
    props: {
      episode
    },
    revalidate: 60 * 60 * 24, //24 horas 
  }
}