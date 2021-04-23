import { Header } from '../components/Header'
import '../styles/globals.scss'
import styles from '../styles/app.module.scss'
import { Player } from '../components/Player'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header/>
        <Component {...pageProps} />
      </main>
      <Player className={styles.player}/>
    </div>
  )
}

export default MyApp
