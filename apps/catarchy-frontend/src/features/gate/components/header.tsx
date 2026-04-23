import { LogoText, Text } from "@/features/common";

export function Header() {
  return (
    <header className="flex flex-col gap-2 py-4 items-center">
      <LogoText title="Catarchy" />
      <h1 className="sr-only">CATARCHY</h1>
      <Text as="p" className="text-center">
        ver. alpha
      </Text>
    </header>
  );
}
