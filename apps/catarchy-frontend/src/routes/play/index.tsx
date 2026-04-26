import { Scaffold, Text } from "@/features/common";
import { useMe } from "@/features/user/services/useMe";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useMe();
  return (
    <Scaffold>
      <Scaffold.Header title="Play" />
      <Scaffold.Body>
        <div className="p-4 flex flex-col gap-4">
          <Text as="p">
            Hi, Stranger @{data?.handle}! My name is aiiiden, I am cooking this
            catarchy right now! Unfortunately, Catarchy is not ready yet.
          </Text>
          <Text as="p">
            By the way, you signed up now! You are one of the earliest
            supporters of Catarchy, and I am really grateful for that! I am
            working hard to launch Catarchy as soon as possible.
          </Text>
          <Text as="p">
            If you interested in testing Catarchy and providing feedback, please{" "}
            <a href="mailto:admin@catarchy.com" className="underline">
              contact us
            </a>{" "}
            and share your thoughts and questions. I will also announce the
            launch of Catarchy on my Twitter,{" "}
            <a
              className="underline"
              href="https://x.com/aiiiden0"
              target="_blank"
              rel="noopener noreferrer"
            >
              @aiiiden
            </a>
            . Thank you for your support and patience!
          </Text>
        </div>
      </Scaffold.Body>
    </Scaffold>
  );
}
