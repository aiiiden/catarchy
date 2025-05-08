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
    </div>
  );
}

const SceneLayout = ({
  top,
  bottom,
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
}) => {
  return (
    <div className="p-[30px] inset-0 absolute pb-0 grid grid-rows-[230fr_308fr]">
      <div className="mx-auto pb-6 mt-auto">{top}</div>
      <div className="flex-center text-center">{bottom}</div>
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
  const lines = [
    "I've always wanted to have a cat",
    'I was envious of cats basking in the sun, lazily grooming themselves.',
    'If I had worked hard enough, I might have had a cat.',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <SceneLayout
      top={
        <img
          src="/images/story1_scene1.png"
          className="w-[138px] mx-auto"
          alt="scene1"
        />
      }
      bottom={
        <div className="space-y-4">
          {lines.slice(0, currentIdx + 1).map((line, i) => (
            <Typing
              key={i}
              speed={60}
              onEnd={() => {
                if (i < lines.length - 1) {
                  setTimeout(() => {
                    setCurrentIdx(i + 1);
                  }, 1000); // 끝난 후 1초 뒤에 다음 문장 시작
                }
              }}
            >
              {line}
            </Typing>
          ))}
        </div>
      }
    />
  );
};
