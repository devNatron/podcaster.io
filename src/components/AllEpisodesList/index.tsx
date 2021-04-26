import Image from 'next/image'
import { EpisodeProps } from '../../pages'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'

type AllEpisodesListProps = {
  allEpisodes: EpisodeProps[]
}

export function AllEpisodesList({allEpisodes}:AllEpisodesListProps){
  const {play} = useContext(PlayerContext)
  return(
    <div className={styles.tableContainer}>
      <table cellSpacing={0}>
        <colgroup>
          <col width="60px" />
          <col width="300px" />
          <col width="200px" />
          <col width="100px" />
          <col width="100px" />
          <col width="60px" />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {allEpisodes.map(episode => {
              return(
                <tr key={episode.id}>
                  <td>
                    <Image className={styles.thumbnail}
                      width={192}
                      height={192}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td className={styles.title}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td className={styles.members}>{episode.members}</td>
                  <td>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button 
                      type='button' 
                      className={styles.playButton}
                      onClick={() => play(episode.id)}
                    >
                      <img src="/play-green.svg" alt="Botão tocar"/>
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}