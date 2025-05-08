import { Typing } from '@/components/animation/typing';
import { createFileRoute, useMatch, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/story/$storyId')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      scene: Number(search.scene) > 0 ? Number(search.scene) : 1,
    };
  },
});

function RouteComponent() {
  const { search } = useMatch({
    from: '/story/$storyId',
  });

  return (
    <div className="absolute inset-0">
      {search.scene === 1 && <Scene1 />}
      {search.scene === 2 && <Scene2 />}
      {search.scene === 3 && <Scene3 />}
      {search.scene === 4 && <Scene4 />}
    </div>
  );
}

const SceneLayout = ({
  top,
  bottom,
  onNext,
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
  onNext?: () => void;
}) => {
  return (
    <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
      <div className="mx-auto pb-6 mt-auto">{top}</div>
      <div className="flex-center text-center">{bottom}</div>
      {onNext && (
        <div
          className="inset-0 absolute bg-transparent"
          onClick={onNext}
          style={{
            animation: 'blink 1s infinite',
          }}
        >
          <p className="absolute bottom-6 right-1/2 translate-x-1/2">
            Tab to continue
          </p>
        </div>
      )}
    </div>
  );
};

const Scene1 = () => {
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
          scene: 2,
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

const Scene2 = () => {
  const { params } = useMatch({
    from: '/story/$storyId',
  });
  const navigate = useNavigate();

  const lines = [
    "I've always wanted to have a cat",
    'I was envious of cats basking in the sun, lazily grooming themselves.',
    'If I had worked hard enough, I might have had a cat.',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  return (
    <SceneLayout
      top={
        <img
          src="/images/story1_scene2.png"
          className="w-[138px] mx-auto"
          alt="scene2"
        />
      }
      bottom={
        <div className="space-y-4">
          {lines.slice(0, currentIdx + 1).map((line, i) => (
            <Typing
              key={i}
              speed={60}
              startDelay={i === 0 ? 500 : 0}
              onEnd={() => {
                if (i < lines.length - 1) {
                  setTimeout(() => {
                    setCurrentIdx(i + 1);
                  }, 1000);
                } else if (i === lines.length - 1) {
                  setTimeout(() => {
                    setReadyToTab(true);
                  }, 500);
                }
              }}
            >
              {line}
            </Typing>
          ))}
        </div>
      }
      onNext={
        readyToTab
          ? () =>
              navigate({
                to: '/story/$storyId',
                params: { storyId: params.storyId },
                search: {
                  scene: 3,
                },
                replace: true,
              })
          : undefined
      }
    />
  );
};

const Scene3 = () => {
  const { params } = useMatch({
    from: '/story/$storyId',
  });
  const navigate = useNavigate();

  const lines = [
    'But had my life been cursed?',
    'I was run over by a drunk-driving truck while walking down the street.',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  return (
    <SceneLayout
      top={
        <img
          src="/images/story1_scene3.png"
          className="w-[133px] mx-auto"
          alt="scene3"
        />
      }
      bottom={
        <div className="space-y-4">
          {lines.slice(0, currentIdx + 1).map((line, i) => (
            <Typing
              key={i}
              speed={60}
              startDelay={i === 0 ? 500 : 0}
              onEnd={() => {
                if (i < lines.length - 1) {
                  setTimeout(() => {
                    setCurrentIdx(i + 1);
                  }, 1000);
                } else if (i === lines.length - 1) {
                  setTimeout(() => {
                    setReadyToTab(true);
                  }, 500);
                }
              }}
            >
              {line}
            </Typing>
          ))}
        </div>
      }
      onNext={
        readyToTab
          ? () =>
              navigate({
                to: '/story/$storyId',
                params: { storyId: params.storyId },
                search: {
                  scene: 4,
                },
                replace: true,
              })
          : undefined
      }
    />
  );
};

const Scene4 = () => {
  const { params } = useMatch({
    from: '/story/$storyId',
  });
  const navigate = useNavigate();

  const lines = [
    'Where... am I...?',
    "Ah... I'm dead...",
    'I must be in the afterlife!\nEverything around me is pitch black and silent.',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [readyToTab, setReadyToTab] = useState(false);

  return (
    <SceneLayout
      top={
        <img
          src="/images/story1_scene4.png"
          className="w-[138px] mx-auto"
          alt="scene4"
        />
      }
      bottom={
        <div className="space-y-4">
          {lines.slice(0, currentIdx + 1).map((line, i) => (
            <Typing
              key={i}
              speed={60}
              startDelay={i === 0 ? 500 : 0}
              onEnd={() => {
                if (i < lines.length - 1) {
                  setTimeout(() => {
                    setCurrentIdx(i + 1);
                  }, 1000);
                } else if (i === lines.length - 1) {
                  setTimeout(() => {
                    setReadyToTab(true);
                  }, 500);
                }
              }}
            >
              {line}
            </Typing>
          ))}
        </div>
      }
      onNext={
        readyToTab
          ? () =>
              navigate({
                to: '/story/$storyId',
                params: { storyId: params.storyId },
                search: {
                  scene: 5,
                },
                replace: true,
              })
          : undefined
      }
    />
  );
};
