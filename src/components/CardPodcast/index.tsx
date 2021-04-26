import Image from 'next/image'
import { EpisodeProps } from '../../pages'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'

export function CardPodcast({id, title, durationAsString, members, publishedAt, thumbnail, duration, url, index}:Partial<EpisodeProps>&{index: number}){
  const {play} = useContext(PlayerContext)
  
  return(
    <div className={styles.cardWrapper}>
      <Image className={styles.thumbnail}
        width={192}
        height={192}
        src={thumbnail}
        alt={title}
        objectFit="cover"
      />
      <div className={styles.cardInfoWrapper}>
        <strong className={styles.title}>
          <Link href={`/episodes/${id}`}>
            <a>{title}</a>
          </Link>
        </strong>
        <p className={styles.fullTitle}>{title}</p>
        <div className={styles.cardInfo}>
          <div className={styles.episodeDetailsWrapper}>
            <p className={styles.members}>{members}</p>
            <div className={styles.episodeDetails}>
              <p>{publishedAt}</p>
              <span className={styles.ponto}></span>
              <p>{durationAsString}</p>
            </div>
          </div>
          <button 
            type='button' 
            className={styles.playButton}
            onClick={() => play(id)}
          >
            <img src="/play-green.svg" alt="Botão tocar"/>
          </button>
        </div>
      </div>
    </div>
  )
}