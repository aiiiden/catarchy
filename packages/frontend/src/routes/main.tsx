import { Button } from '@/components/ui/button';
import SpriteImage from '@/components/ui/sprite-image';
import CatScreen from '@/features/cat-screen';
import { createFileRoute, redirect } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/main')({
  component: RouteComponent,
  beforeLoad(ctx) {
    const { auth } = ctx.context;

    // TODO: Mock logic
    if (!auth.token) {
      console.log('Redirecting to login');
      return redirect({
        to: '/',
      });
    }
  },

  loader(ctx) {
    return ctx.context;
  },
});

function MenuButton({
  className,
  icon,
  alt,
  onClick,
}: {
  className?: string;
  icon: React.ReactNode;
  alt: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`cursor-pointer border p-2 rounded-sm bg-gray-extralight ${className} hover:bg-gray-light`}
      onClick={onClick}
    >
      <span className="sr-only">{alt}</span>
      <div className="w-4 h-4 relative *:absolute *:left-1/2 *:top-1/2 *:-translate-x-1/2 *:-translate-y-1/2">
        {icon}
      </div>
    </button>
  );
}

function RouteComponent() {
  return (
    <div className="h-full flex flex-col gap-0">
      <div className="relative h-full flex flex-col gap-0 border-b border-gray-light">
        <div className="bg-pattern-cat absolute inset-0 opacity-20"></div>
        <header className="px-4 py-3.5 flex justify-center items-center">
          <SpriteImage id="logo/typo" alt="CATARCHY" />
        </header>
        <div className="h-full flex flex-col justify-center items-center z-10">
          <div className="bg-white w-[260px] h-[220px] border box-content flex flex-col">
            <div className="flex justify-between px-2 border-b h-[20px] leading-4 pt-0.5 pb-0.5">
              <span>😊</span>
              <span className="-translate-y-px">🎂3.08</span>
              <span>Ⓟ1K</span>
            </div>
            <CatScreen />
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 flex flex-col justify-center">
        <div className="h-fit flex gap-4">
          <div className="border rounded-sm flex-grow">
            <table className="w-full *:leading-3.5 [&_th]:w-20 [&_th]:text-left [&_th]:pl-1.5 [&_th]:py-2 [&_td]:py-px [&_td]:text-right [&_td]:px-2 [&_td]:overflow-auto [&_tr]:not-last:border-b [&_tr]:not-last:border-dotted [&_tr]:not-last:border-gray-light">
              <tbody>
                <tr>
                  <th>🌱GROWTH</th>
                  <td>12131</td>
                </tr>
                <tr>
                  <th>🎂AGE</th>
                  <td>3 ¹⁄₁₂</td>
                </tr>
                <tr>
                  <th>ⓅPOINT</th>
                  <td>1,005 Pt</td>
                </tr>
                <tr>
                  <th>💼JOB</th>
                  <td>-</td>
                </tr>
                <tr>
                  <th>😊MOOD</th>
                  <td>HAPPY</td>
                </tr>
                <tr>
                  <th>❤LOVE</th>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-between">
            <MenuButton
              alt="Setting"
              icon={<SpriteImage id="icon/cat" alt="cat" />}
            />
            <MenuButton
              alt="Mail"
              icon={<SpriteImage id="icon/mail" alt="mail" />}
            />
            <MenuButton
              alt="School"
              icon={<SpriteImage id="icon/school" alt="school" />}
            />
            <MenuButton alt="Community" icon={<span>📰</span>} />
          </div>
        </div>
      </div>
      <div className="px-4 pb-6 pt-2">
        <Button size={'lg'} className="w-full">
          Care
        </Button>
      </div>
    </div>
  );
}
