import { createContext, useState } from "react";

type Episode = {
  title: string,
  members: string,
  thumbnail: string,
  duration: number,
  url: string,
}

type PlayerProviderProps = {
  children: React.ReactNode
}

type PlayerContextProps = {
  episodeList: Array<Episode>,
  currentEpisodeIndex: number, 
  play: (episode: Episode) => void,
  isPlaying: boolean,
  togglePlay: () => void,
  setPlayingState: (state: boolean) => void,
}

export const PlayerContext = createContext({} as PlayerContextProps);


export default function PlayerProvider({children}: PlayerProviderProps){
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  return(
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      play,
      isPlaying,
      togglePlay,
      setPlayingState,
    }}>
    {children}  
    </PlayerContext.Provider>
  )
}