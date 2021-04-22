import { EpisodeProps } from '../../pages'
import styles from './styles.module.scss'

export function PodcastItem({title, durationAsString, members, publishedAt, thumbnail, truncatedTitle}:Partial<EpisodeProps>){
  return(
    <li className={styles.ItemWrapper}>
      <div className={styles.PodCastTitle}>
        <img src="/cardImgExample.svg" alt=""/>
        <strong className={styles.title}>{truncatedTitle}</strong>
        <p className={styles.fullTitle}>{title}</p>
      </div>
      <p className={styles.members}>{members}</p>
      <p>{publishedAt}</p>
      <p>{durationAsString}</p>
      <button type='button' className={styles.playButton}>
        <img src="/play-green.svg" alt="Botão tocar"/>
      </button>
    </li>
  )
}