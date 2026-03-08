export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex h-dvh w-full flex-col overflow-y-auto overscroll-none bg-white lg:w-lg">
      {children}
    </div>
  );
}
