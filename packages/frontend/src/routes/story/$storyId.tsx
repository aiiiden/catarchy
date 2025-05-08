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
  const { params, search } = useMatch({
    from: '/story/$storyId',
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'gradient'>('light');

  if (search.scene === null) {
    return <Idle />;
  }
  console.log(theme);
  return (
    <div
      className={cn([
        'absolute inset-0 transition-all duration-500 ease-in-out',
        theme === 'light' && 'bg-white',
        theme === 'dark' && 'bg-black',
        theme === 'gradient' && 'bg-gradient-to-b from-white to-black',
      ])}
      style={{
        backgroundImage:
          theme !== 'light' ? 'url(/images/cat-background.png)' : 'none',
      }}
    >
      {search.scene === 1 && (
        <Scene
          theme={theme}
          image={
            <img
              src="/images/story1_scene1.png"
              className="w-[138px] mx-auto"
              alt="scene1"
            />
          }
          paragraphs={[
            "I've always wanted to have a cat",
            'I was envious of cats basking in the sun, lazily grooming themselves.',
            'If I had worked hard enough, I might have had a cat.',
          ]}
          onNext={() =>
            navigate({
              to: '/story/$storyId',
              params: { storyId: params.storyId },
              search: {
                scene: 2,
              },
              replace: true,
            })
          }
        />
      )}
      {search.scene === 2 && (
        <Scene
          theme={theme}
          image={
            <img
              src="/images/story1_scene2.png"
              className="w-[133px] mx-auto"
              alt="scene2"
            />
          }
          paragraphs={[
            'But had my life been cursed?',
            'I was run over by a drunk-driving truck while walking down the street.',
          ]}
          onNext={() => {
            setTheme('dark');
            navigate({
              to: '/story/$storyId',
              params: { storyId: params.storyId },
              search: {
                scene: 3,
              },
              replace: true,
            });
          }}
        />
      )}
      {search.scene === 3 && (
        <Scene
          theme={theme}
          image={
            <img
              src="/images/story1_scene3.png"
              className="w-[138px] mx-auto"
              alt="scene3"
            />
          }
          paragraphs={[
            'Where... am I...?',
            "Ah... I'm dead...",
            'I must be in the afterlife!\nEverything around me is pitch black and silent.',
          ]}
          onNext={() => {
            setTheme('gradient');
            navigate({
              to: '/story/$storyId',
              params: { storyId: params.storyId },
              search: {
                scene: 4,
              },
              replace: true,
            });
          }}
        />
      )}
      {search.scene === 4 && (
        <Scene
          theme={theme}
          image={
            <img
              src="/images/story1_scene4.png"
              className="w-[138px] mx-auto"
              alt="scene4"
            />
          }
          paragraphs={['Huh...?', 'Where is this light coming from?']}
          onNext={() =>
            navigate({
              to: '/story/$storyId',
              params: { storyId: params.storyId },
              search: {
                scene: 5,
              },
              replace: true,
            })
          }
        />
      )}
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
  image,
  paragraphs,
  onNext,
  theme = 'light',
}: {
  image: React.ReactNode;
  paragraphs: string[];
  onNext?: () => void;
  theme?: 'light' | 'dark' | 'gradient';
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  return (
    <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
      <div className="mx-auto pb-6 mt-auto">{image}</div>
      <div className="flex-center text-center">
        <div className="space-y-4">
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
