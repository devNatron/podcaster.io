import { Header } from '../components/Header'
import '../styles/globals.scss'
import styles from '../styles/app.module.scss'
import { Player } from '../components/Player'
import PlayerProvider from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player className={styles.player}/>
      </div>
    </PlayerProvider>
  )
}

export default MyApp
