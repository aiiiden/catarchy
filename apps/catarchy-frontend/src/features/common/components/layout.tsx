export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-1 flex-col overflow-y-auto bg-white lg:w-lg">
      {children}
    </div>
  );
}
