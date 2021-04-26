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
  isPlaying: boolean,
  isLooping: boolean,
  isShuffling: boolean,
  togglePlay: () => void,
  play: (episodeID: string) => void,
  setPlayingState: (state: boolean) => void,
  setPlayList: (list: Episode[]) => void,
  playNext: () => void,
  playPrevious: () => void,
  toggleLoop: () => void,
  toggleShuffling: () => void,
}

export const PlayerContext = createContext({} as PlayerContextProps);


export default function PlayerProvider({children}: PlayerProviderProps){
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episodeID: string){
    const episodeIndex = episodeList.findIndex(episode => episode.id == episodeID)
    setCurrentEpisodeIndex(episodeIndex);
    setIsPlaying(true)
  }

  function playNext(){
    let nextEpisodeIndex: number;
    
    if(isShuffling)
      nextEpisodeIndex = Math.floor(Math.random() * episodeList.length);
    else
      nextEpisodeIndex = currentEpisodeIndex+1;
    
    nextEpisodeIndex >= episodeList.length ? 
      setCurrentEpisodeIndex(0) :
      setCurrentEpisodeIndex(nextEpisodeIndex)
  }

  function playPrevious(){
    const nextEpisodeIndex = currentEpisodeIndex-1;

    nextEpisodeIndex < 0 ? 
      setCurrentEpisodeIndex(episodeList.length-1) : 
      setCurrentEpisodeIndex(currentEpisodeIndex-1);
  }

  function setPlayList(list: Episode[]){
    setEpisodeList(list)
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  function toggleShuffling(){
    setIsShuffling(!isShuffling);
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
      setPlayList,
      playNext,
      playPrevious,
      toggleLoop,
      isLooping,
      toggleShuffling,
      isShuffling
    }}>
    {children}  
    </PlayerContext.Provider>
  )
}