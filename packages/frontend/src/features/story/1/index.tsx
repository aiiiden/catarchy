import { Typing } from '@/components/animation/typing';
import { cn } from '@/lib/classname';
import { useEffect, useImperativeHandle, useState } from 'react';
import { StoryContext, useStory1 } from './model/context';
import { ReadyToTab } from './ui/ready-to-tab';
import { CatBackground } from './ui/cat-background';
import SpriteImage from '@/components/ui/sprite-image';
import { useMount } from '@/lib/hook/use-mount';

export interface Story1Handle {
  resume(): void;
}

export const Story1 = ({
  ref,
  className,
}: {
  ref: React.RefObject<Story1Handle | null>;
  className?: string;
  onDone?: () => void;
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

  const scenes = [
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_55%,rgba(255,255,255,1)_100%)]',
      scene: <Scene0 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_55%,rgba(255,255,255,1)_100%)]',
      scene: <Scene1 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_55%,rgba(255,255,255,1)_100%)]',
      scene: <Scene2 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene3 />,
    },
    {
      // bgClassName:
      //   'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene4 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene5 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene6 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene7 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene8 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_95%,rgba(0,0,0,1)_100%)]',
      scene: <Scene9 />,
    },

    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene10 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene11 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%)]',
      scene: <Scene12 />,
    },
    {
      bgClassName:
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(0,0,0,1)_5%,rgba(0,0,0,1)_100%)]',
      scene: <Scene13 />,
    },
    {
      bgClassName: 'bg-black transition-none',
      scene: <Scene14 />,
    },
    {
      bgClassName: 'bg-gray-900',
      scene: <Scene15 />,
    },
  ];

  return (
    <StoryContext.Provider value={value}>
      <div
        className={cn(
          'absolute inset-0 transition-all duration-500 ease-in-out',
          scenes[scene].bgClassName,
          className,
        )}
      >
        {scenes[scene].scene}
      </div>
    </StoryContext.Provider>
  );
};

Story1.ContentGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
      {children}
    </div>
  );
};

Story1.Top = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto pb-6 mt-auto">{children}</div>;
};

Story1.Bottom = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-center text-center">{children}</div>;
};

const Scene0 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => {
      setScene(1);
    }, 3000);
  }, [setScene]);

  return (
    <div className="space-y-[28px] center *:text-center">
      <p>Story #1</p>
      <p>Born again</p>
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
    <>
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage id="story/1/1" />
        </Story1.Top>

        <Story1.Bottom>
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>

      {readyToTab && <ReadyToTab onNext={() => setScene(2)} theme="light" />}
    </>
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
    <>
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage id="story/1/2" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>

      {readyToTab && <ReadyToTab onNext={() => setScene(3)} theme="light" />}
    </>
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
    <>
      <CatBackground />

      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && <ReadyToTab onNext={() => setScene(4)} theme="dark" />}
    </>
  );
};

const Scene4 = () => {
  const { mounted } = useMount();
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = ['Huh...?', 'Where is this light coming from?'];

  return (
    <>
      <CatBackground />
      <div
        className={cn([
          'absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,#000000_55%,#000000_100%)]',
          'opacity-0',
          mounted && 'opacity-100 transition-opacity duration-500 ease-in-out',
        ])}
      />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && <ReadyToTab onNext={() => setScene(5)} theme="dark" />}
    </>
  );
};

const Scene5 = () => {
  const { mounted } = useMount(() => {});
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = ['Who are you?'];

  return (
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage
            id="character/bastet"
            className={cn([
              'floating block mx-auto mb-24 opacity-0',
              'transition-opacity duration-500 ease-in-out',
              mounted && 'opacity-100',
            ])}
          />
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && <ReadyToTab onNext={() => setScene(6)} theme="dark" />}
    </>
  );
};

const Scene6 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = [
    '"I am Bastet, God of Cats. I shall help you be reborn as a cat."',
  ];

  return (
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage
            id="character/bastet"
            className="floating block mx-auto mb-24"
          />
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} Bastet {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((paragraph, index) => (
              <Typing
                key={index}
                speed={20}
                startDelay={index === 0 ? 500 : 0}
                onEnd={() => {
                  if (index < paragraphs.length - 1) {
                    setTimeout(() => {
                      setCurrentIdx(index + 1);
                    }, 1000);
                  } else if (index === paragraphs.length - 1) {
                    setTimeout(() => {
                      setReadyToTab(true);
                    }, 500);
                  }
                }}
                className="text-white"
              >
                {paragraph}
              </Typing>
            ))}
          </div>
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && <ReadyToTab onNext={() => setScene(7)} theme="dark" />}
    </>
  );
};

const Scene7 = () => {
  const { setScene } = useStory1();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  const paragraphs = ['"Reborn... as a cat?', 'I... I\'m truly happy!"'];

  return (
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage
            id="character/bastet"
            className="floating block mx-auto mb-24"
          />
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} You {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && <ReadyToTab onNext={() => setScene(8)} theme="dark" />}
    </>
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
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage
            id="character/bastet"
            className="floating block mx-auto mb-24"
          />
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} Bastet {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && <ReadyToTab onNext={() => setScene(9)} theme="dark" />}
    </>
  );
};

const Scene9 = () => {
  const { setState } = useStory1();

  useEffect(() => {
    setTimeout(() => setState('pause'), 1000);
  }, [setState]);

  return (
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage
            id="character/bastet"
            className="floating block mx-auto mb-24"
          />
          <SpriteImage id="story/1/3" />
        </Story1.Top>
      </Story1.ContentGrid>
    </>
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
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage
            id="character/bastet"
            className="floating block mx-auto mb-24"
          />
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <Story1.Bottom>
          <div className="space-y-4">
            <p className="text-white">
              {'<<'} Bastet {'>>'}
            </p>

            {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
              <Typing
                key={i}
                speed={20}
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && <ReadyToTab onNext={() => setScene(11)} theme="dark" />}
    </>
  );
};

const Scene11 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(12), 1000);
  }, [setScene]);

  return (
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage
            id="character/bastet"
            className="floating block mx-auto mb-24"
          />
          <SpriteImage id="story/1/3" />
        </Story1.Top>
      </Story1.ContentGrid>
    </>
  );
};

const Scene12 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(13), 1000);
  }, [setScene]);

  return (
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage id="story/1/3" />
        </Story1.Top>
        <p className="text-white absolute right-1/2 translate-x-1/2 bottom-1/2">
          Loading...
        </p>
      </Story1.ContentGrid>
    </>
  );
};

const Scene13 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(14), 1000);
  }, [setScene]);

  return (
    <>
      <CatBackground />
      <Story1.ContentGrid>
        <Story1.Top>
          <SpriteImage id="story/1/3" className="opacity-30" />
        </Story1.Top>
      </Story1.ContentGrid>
    </>
  );
};

const Scene14 = () => {
  const { setScene } = useStory1();

  useEffect(() => {
    setTimeout(() => setScene(15), 500);
  }, [setScene]);

  return <CatBackground />;
};

const Scene15 = () => {
  const { setState } = useStory1();

  useEffect(() => {
    setTimeout(() => setState('pause'), 1000);
  }, [setState]);

  return <CatBackground />;
};
