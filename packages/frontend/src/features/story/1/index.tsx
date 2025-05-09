import { Typing } from '@/components/animation/typing';
import { cn } from '@/lib/classname';
import { useEffect, useImperativeHandle, useState } from 'react';
import { StoryContext, useStory1 } from './model/context';
import { ReadyToTab } from './ui/ready-to-tab';
import { CatBackground } from './ui/cat-background';

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

  const scenes = [
    <Scene0 />,
    <Scene1 />,
    <Scene2 />,
    <Scene3 />,
    <Scene4 />,
    <Scene5 />,
    <Scene6 />,
    <Scene7 />,
    <Scene8 />,
    <Scene9 />,

    <Scene10 />,
    <Scene11 />,
    <Scene12 />,
    <Scene13 />,
    <Scene14 />,
    <Scene15 />,
  ];

  return (
    <StoryContext.Provider value={value}>{scenes[scene]}</StoryContext.Provider>
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img src="/images/story1_scene1.png" className="w-[138px] mx-auto" />
        </Story1.Top>

        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>

      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="light" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img src="/images/story1_scene2.png" className="w-[133px] mx-auto" />
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>

      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="light" />
      )}
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

      <Story1.ContentGrid>
        <Story1.Top>
          <img src="/images/story1_scene3.png" className="w-[138px] mx-auto" />
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="dark" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="dark" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
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
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="dark" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="dark" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="dark" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="dark" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating opacity-30"
            alt="angel-cat"
          />
          <img
            src="/images/story1_scene4.png"
            className="w-[138px] mx-auto opacity-30"
          />
        </Story1.Top>
      </Story1.ContentGrid>
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </Story1.Top>
        <Story1.Bottom>
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
        </Story1.Bottom>
      </Story1.ContentGrid>
      {readyToTab && (
        <ReadyToTab onNext={() => setScene((prev) => prev + 1)} theme="dark" />
      )}
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img
            src="/images/angel_cat.png"
            className="w-[72px] mx-auto pb-[93px] floating opacity-30"
            alt="angel-cat"
          />
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </Story1.Top>
      </Story1.ContentGrid>
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img src="/images/story1_scene4.png" className="w-[138px] mx-auto" />
        </Story1.Top>
        <p className="text-white absolute right-1/2 translate-x-1/2 bottom-1/2">
          Loading...
        </p>
      </Story1.ContentGrid>
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
      <Story1.ContentGrid>
        <Story1.Top>
          <img
            src="/images/story1_scene4.png"
            className="w-[138px] mx-auto opacity-30"
          />
        </Story1.Top>
      </Story1.ContentGrid>
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
