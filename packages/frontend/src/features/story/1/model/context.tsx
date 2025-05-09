import { createContext, useContext } from 'react';

interface StoryContextValue {
  state: 'play' | 'pause';
  setState: React.Dispatch<React.SetStateAction<'play' | 'pause'>>;
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}

export const StoryContext = createContext<StoryContextValue | null>(null);

export const useStory1 = () => {
  const value = useContext(StoryContext);
  if (!value) {
    throw new Error('useStory1 must be used within a Story1 provider');
  }
  return value;
};
