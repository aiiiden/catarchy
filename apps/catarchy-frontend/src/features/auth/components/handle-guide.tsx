import { Text } from "@/features/common";

export function HandleGuide() {
  return (
    <article className="border">
      <header className="bg-gradient-dither-1 border-b px-3 py-2">
        <Text as="h2" className="font-stroke-white text-center">
          Please enter your new handle
        </Text>
      </header>
      <div className="px-2 py-2">
        <ul className="list-outside list-disc relative pl-5">
          <li className="marker:">
            <Text>4~15 characters</Text>
          </li>
          <li className="marker:size-4">
            <Text>Only lowercase letters, numbers, and underscores</Text>
          </li>
        </ul>
      </div>
    </article>
  );
}
