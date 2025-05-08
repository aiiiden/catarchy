import { Typing } from '@/components/animation/typing';
import { cn } from '@/lib/classname';
import { createFileRoute, useMatch, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/story/$storyId')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      scene: Number(search.scene) > 0 ? Number(search.scene) : null,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { params, search } = useMatch({ from: '/story/$storyId' });
  const scene = search.scene;

  if (scene == null) return <Idle />;

  const config = sceneConfigs[scene];
  if (!config) return null;

  // onNext 핸들러
  const handleNext = () => {
    // TODO: nextScene이 없으면 종료
    if (!config.nextScene) return;

    navigate({
      to: '/story/$storyId',
      params: { storyId: params.storyId },
      search: { scene: config.nextScene },
      replace: true,
    });
  };

  const theme = config.theme;

  return (
    <div
      className={cn(
        'absolute inset-0 transition-all duration-500 ease-in-out',
        theme === 'light' && 'bg-white',
        theme === 'dark' && 'bg-black',
        theme === 'gradient_md' &&
          `bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(0,0,0,1)_55%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]`,
        theme === 'gradient_lg' &&
          `bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(0,0,0,1)_95%,rgba(0,0,0,1)_100%),url('/images/cat_background.png')]`,
      )}
    >
      {theme !== 'light' && (
        <img
          src="/images/cat_background.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="cat-background"
        />
      )}

      <Scene
        key={scene}
        theme={theme}
        top={config.top}
        speaker={config.speaker}
        paragraphs={config.paragraphs}
        onNext={handleNext}
      />
    </div>
  );
}

const Idle = () => {
  const { params } = useMatch({
    from: '/story/$storyId',
  });
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate({
        to: '/story/$storyId',
        params: { storyId: params.storyId },
        search: {
          scene: 1,
        },
        replace: true,
      });
    }, 3000);
  }, [navigate, params.storyId]);

  return (
    <div className="space-y-[28px] center *:text-center">
      <p>Story #{params.storyId}</p>
      <p>Born again</p>
    </div>
  );
};

const Scene = ({
  top,
  paragraphs,
  onNext,
  speaker,
  theme = 'light',
}: {
  top: React.ReactNode;
  paragraphs: string[];
  onNext?: () => void;
  speaker?: string;
  theme?: 'light' | 'dark' | 'gradient_md' | 'gradient_lg';
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  return (
    <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
      <div className="mx-auto pb-6 mt-auto">{top}</div>
      <div className="flex-center text-center">
        <div className="space-y-4">
          {speaker && (
            <p className={cn(theme === 'light' ? 'text-black' : 'text-white')}>
              {'<<'} {speaker} {'>>'}
            </p>
          )}
          {paragraphs.slice(0, currentIdx + 1).map((p, i) => (
            <Typing
              key={i}
              speed={60}
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
              className={cn(theme === 'light' ? 'text-black' : 'text-white')}
            >
              {p}
            </Typing>
          ))}
        </div>
      </div>
      {readyToTab && (
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
            Tab to continue
          </p>
        </div>
      )}
    </div>
  );
};

type SceneConfig = {
  top: React.ReactNode;
  paragraphs: string[];
  nextScene?: number;
  speaker?: string;
  theme: 'light' | 'dark' | 'gradient_md' | 'gradient_lg';
};

const sceneConfigs: (SceneConfig | null)[] = [
  null, // index 0 unused
  {
    top: (
      <img
        src="/images/story1_scene1.png"
        className="w-[138px] mx-auto"
        alt="scene1"
      />
    ),
    paragraphs: [
      "I've always wanted to have a cat",
      'I was envious of cats basking in the sun, lazily grooming themselves.',
      'If I had worked hard enough, I might have had a cat.',
    ],
    nextScene: 2,
    theme: 'light',
  },
  {
    top: (
      <img
        src="/images/story1_scene2.png"
        className="w-[133px] mx-auto"
        alt="scene2"
      />
    ),
    paragraphs: [
      'But had my life been cursed?',
      'I was run over by a drunk-driving truck while walking down the street.',
    ],
    nextScene: 3,
    theme: 'light',
  },
  {
    top: (
      <img
        src="/images/story1_scene3.png"
        className="w-[138px] mx-auto"
        alt="scene3"
      />
    ),
    paragraphs: [
      'Where... am I...?',
      "Ah... I'm dead...",
      'I must be in the afterlife!\nEverything around me is pitch black and silent.',
    ],
    nextScene: 4,
    theme: 'dark',
  },
  {
    top: (
      <img
        src="/images/story1_scene4.png"
        className="w-[138px] mx-auto"
        alt="scene4"
      />
    ),
    paragraphs: ['Huh...?', 'Where is this light coming from?'],
    nextScene: 5,
    theme: 'gradient_md',
  },
  {
    top: (
      <div>
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
    ),
    paragraphs: ['Who are you?'],
    nextScene: 6,
    theme: 'gradient_md',
  },
  {
    top: (
      <div>
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
    ),
    paragraphs: [
      '"I am Bastet, Godof Cats. I shall help you be reborn as a cat."',
    ],
    speaker: 'Bastet',
    nextScene: 7,
    theme: 'gradient_md',
  },
  {
    top: (
      <div>
        <img
          src="/images/angel_cat.png"
          className="w-[72px] mx-auto pb-[93px] floating"
          alt="angel-cat"
        />
        <img
          src="/images/story1_scene4.png"
          className="w-[138px] mx-auto"
          alt="scene6"
        />
      </div>
    ),
    paragraphs: ['"Reborn... as a cat?', 'I... I\'m truly happy!"'],
    speaker: 'You',
    nextScene: 8,
    theme: 'gradient_md',
  },
  {
    top: (
      <div>
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
    ),
    paragraphs: [
      "\"Then, I shall check what kind of cat spirit you'll have when you're reborn",
      'Read the given situations and choose how you would respond."',
    ],
    speaker: 'Bastet',
    nextScene: 9,
    theme: 'gradient_md',
  },
  {
    top: (
      <div className="opacity-30">
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
    ),
    paragraphs: [],
    theme: 'gradient_lg',
  },
];
