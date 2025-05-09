import { cn } from '@/lib/classname';

export const ReadyToTab = ({
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
