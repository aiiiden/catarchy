import { Typing } from '@/components/animation/typing';
import { cn } from '@/lib/classname';
import {
  createContext,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

interface StoryContextValue {
  state: 'play' | 'pause';
  setState: React.Dispatch<React.SetStateAction<'play' | 'pause'>>;
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}

const StoryContext = createContext<StoryContextValue | null>(null);

const useStory1 = () => {
  const value = useContext(StoryContext);
  if (!value) {
    throw new Error('useStory1 must be used within a Story1 provider');
  }
  return value;
};

export interface Story1Handle {
  resume(): void;
}

export const Story1 = ({
  ref,
}: {
  ref: React.RefObject<Story1Handle | null>;
}) => {
  const [state, setState] = useState<'play' | 'pause'>('play');
  const [scene, setScene] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      resume: () => {
        setScene((prev) => prev + 1);
        setState('play');
      },
    }),
    [setState],
  );

  const value = {
    state,
    setState,
    scene,
    setScene,
  };

  if (state === 'pause') return null;

  return (
    <StoryContext.Provider value={value}>
      {scene === 0 && <Scene0 />}
      {scene === 1 && <Scene1 />}
      {scene === 2 && <Scene2 />}
      {scene === 3 && <Scene3 />}
      {scene === 4 && <Scene4 />}
      {scene === 5 && <Scene5 />}
      {scene === 6 && <Scene6 />}
      {scene === 7 && <Scene7 />}
      {scene === 8 && <Scene8 />}
      {scene === 9 && <Scene9 />}

      {scene === 10 && <Scene10 />}
      {scene === 11 && <Scene11 />}
      {scene === 12 && <Scene12 />}
      {scene === 13 && <Scene13 />}
      {scene === 14 && <Scene14 />}
      {scene === 15 && <Scene15 />}
    </StoryContext.Provider>
  );
};

const Scene0 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => {
      setScene(1);
    }, 3000);
  }, [setScene]);

  return (
    <div className="absolute inset-0 bg-white">
      <div className="space-y-[28px] center *:text-center">
        <p>Story #1</p>
        <p>Born again</p>
      </div>
    </div>
  );
};

const Scene1 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = [
    "I've always wanted to have a cat",
    'I was envious of cats basking in the sun, lazily grooming themselves.',
    'If I had worked hard enough, I might have had a cat.',
  ];

  return (
    <div className="absolute inset-0 transition-all duration-500 ease-in-out bg-white">
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img src="/images/story1_scene1.png" className="w-[138px] mx-auto" />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="light"
          />
        )}
      </div>
    </div>
  );
};

const Scene2 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = [
    'But had my life been cursed?',
    'I was run over by a drunk-driving truck while walking down the street.',
  ];

  return (
    <div className="absolute inset-0 transition-all duration-500 ease-in-out bg-white">
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/story1_scene2.png"
            className="w-[133px] mx-auto"
            alt="scene2"
          />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="light"
          />
        )}
      </div>
    </div>
  );
};

const Scene3 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = [
    'Where... am I...?',
    "Ah... I'm dead...",
    'I must be in the afterlife!\nEverything around me is pitch black and silent.',
  ];

  return (
    <div className="absolute inset-0 transition-all duration-500 ease-in-out bg-black">
      <CatBackground />

      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img src="/images/story1_scene3.png" className="w-[138px] mx-auto" />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};

const Scene4 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = ['Huh...?', 'Where is this light coming from?'];

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};

const Scene5 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = ['Who are you?'];

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img
            src="/images/story1_scene4.png"
            className="w-[138px] mx-auto"
            alt="scene5"
          />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};

const Scene6 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = [
    '"I am Bastet, Godof Cats. I shall help you be reborn as a cat."',
  ];

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} Bastet {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};

const Scene7 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = ['"Reborn... as a cat?', 'I... I\'m truly happy!"'];

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} You {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};

const Scene8 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = [
    "\"Then, I shall check what kind of cat spirit you'll have when you're reborn",
    'Read the given situations and choose how you would respond."',
  ];

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} Bastet {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};

const Scene9 = () => {
  const { setState } = useStory1();

  useEffect(() => {
    setTimeout(() => setState('pause'), 1000);
  }, [setState]);

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_95%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto opacity-30">
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
      </div>
    </div>
  );
};

const Scene10 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = [
    '"I have come to understand what kind of human you are.',
    'Now, I shall let you ne reborn with the car spirit that suits you"',
  ];

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
        <div className="flex-center text-center">
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} Bastet {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={10}
                startDelay={i === 0 ? 500 : 0}
                onEnd={() => {
                  if (i < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(i + 1);
                    }, 1000);
                  } else if (i === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {p}
              </Typing>
            ))}
          </div>
        </div>
        {readyToTab && (
          <ReadyToTab
            onNext={() => setScene((prev) => prev + 1)}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};

const Scene11 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(12), 500);
  }, [setScene]);

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating opacity-30"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
      </div>
    </div>
  );
};

const Scene12 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(13), 1000);
  }, [setScene]);

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </div>
        <div>
          <p className="text-white absolute right-1/2 translate-x-1/2 bottom-1/2">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

const Scene13 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(14), 500);
  }, [setScene]);

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_5%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
      <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
        <div className="mx-auto pb-6 mt-auto">
          <img
            src="/images/story1_scene4.png"
            className="w-[138px] mx-auto opacity-30"
          />
        </div>
      </div>
    </div>
  );
};

const Scene14 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(15), 500);
  }, [setScene]);

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_5%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]",
      ])}
    >
      <CatBackground />
    </div>
  );
};

const Scene15 = () => {
  const { setState } = useStory1();

  useEffect(() => {
    setTimeout(() => setState('pause'), 1000);
  }, [setState]);

  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        'bg-gray-800',
      ])}
    >
      <CatBackground />
    </div>
  );
};

const ReadyToTab = ({
  onNext,
  theme,
}: {
  onNext: () => void;
  theme: 'light' | 'dark';
}) => {
  return (
    <div
      className="inset-0 absolute bg-transparent"
      onClick={onNext}
      style={{
        animation: 'blink 1s infinite',
      }}
    >
      <p
        className={cn(
          'absolute bottom-6 right-1/2 translate-x-1/2',
          theme === 'light' ? 'text-black' : 'text-white',
        )}
      >
        {'<<'} Tab to continue {'>>'}
      </p>
    </div>
  );
};

const CatBackground = () => {
  return (
    <img
      src="/images/cat_background.png"
      className="absolute inset-0"
      alt="cat-background"
    />
  );
};
