import Image from 'next/image'
import { EpisodeProps } from '../../pages'
import styles from './styles.module.scss'

export function CardPodcast({title, durationAsString, members, publishedAt, thumbnail, truncatedTitle}:Partial<EpisodeProps>){
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
        <strong className={styles.title}>{truncatedTitle}</strong>
        <p className={styles.fullTitle}>{title}</p>
        <div className={styles.cardInfo}>
          <div>
            <p>{members}</p>
            <div className={styles.statusInfo}>
              <p>{publishedAt}</p>
              <span className={styles.ponto}></span>
              <p>{durationAsString}</p>
            </div>
          </div>
          <button type='button' className={styles.playButton}>
            <img src="/play-green.svg" alt="Botão tocar"/>
          </button>
        </div>
      </div>
    </div>
  )
}