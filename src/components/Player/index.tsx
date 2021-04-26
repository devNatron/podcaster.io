import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../Utils/convertDurationToTimeString';

export function Player(){
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay, 
    setPlayingState, 
    playNext, 
    playPrevious, 
    toggleLoop,
    isLooping,
    isShuffling, 
    toggleShuffling
  } = useContext(PlayerContext)
  
  const [progress, setProgress] = useState(0)
  const episode = episodeList[currentEpisodeIndex];

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount;
    setProgress(amount)
  }

  useEffect(() => {
    if(!audioRef.current)
    return
    
    if(isPlaying)
      audioRef.current.play()
    else
      audioRef.current.pause()
  }, [isPlaying])

  return(
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Icone de um botão player"/>
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <div>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />
          </div>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
        ):(
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{backgroundColor: '#04d361'}}
                railStyle={{backgroundColor: '#9f75ff'}}
                handleStyle={{borderColor: '#04d361', borderWidth: 4}}
              />
            ):(
              <div className={styles.emptySlider}/>
            )}
          </div>
          <span>{convertDurationToTimeString(episode ? episode.duration : 0)}</span>
        </div>

        <div className={styles.buttons}>
          <button 
            type="button" 
            disabled={!episode}
            onClick={toggleShuffling}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="Botão embaralhar"/>
          </button>
          <button 
            type="button" 
            disabled={!episode}
            onClick={() => playPrevious()}
          >
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          <button 
            type="button" 
            className={styles.playButton} 
            disabled={!episode}
            onClick={togglePlay}
          >
            <img src={isPlaying ? "/pause.svg" : "/play.svg"} alt="Tocar"/>
          </button>
          <button 
            type="button" 
            disabled={!episode}
            onClick={() => playNext()}
          >
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button 
            type="button" 
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>

      {episode && (<audio
        src={episode.url}
        ref={audioRef}
        loop={isLooping}
        onEnded={playNext}
        onPlay={() => setPlayingState(true)}
        onPause={() => setPlayingState(false)}
        autoPlay
        onLoadedMetadata={setupProgressListener}
      />)}
    </div>
  );
}