import { Button, sleep, Text, usePlatform } from "@/features/common";
import { useState } from "react";

export function PWAGuide({ onClose }: { onClose?: () => void }) {
  const { os } = usePlatform();

  return (
    <article className="flex flex-col gap-2 overflow-hidden h-full pb-safe">
      <div className="flex-1 overflow-y-auto h-full p-4 flex flex-col gap-4">
        <Text as="p" className="leading-snug text-center">
          Catarchy is a Progressive Web App (PWA). <br />
          For the best experience, <br />
          try adding this app to your home screen!
        </Text>
        {os === "ios" && <IosGuide />}
        {os === "android" && <AndroidGuide />}
      </div>
      <div className="px-4 py-2">
        <Button size={"big"} onClick={onClose}>
          Close
        </Button>
      </div>
    </article>
  );
}

const btnClass =
  "w-fit inline-block border px-1 border-dashed hover:border-solid active:border-solid focus:border-solid";

function IosGuide() {
  const { browser } = usePlatform();
  const [copied, setCopied] = useState<boolean>(false);
  const url = window.location.href;
  const safariUrl = url.replace(/^https:\/\//, "x-safari-https://");

  const copyToClipboard = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(url);
    await sleep(1);
    setCopied(false);
  };

  const isSafari = browser === "safari";
  const n = isSafari ? ["①", "②", "③"] : ["①", "②", "③", "④"];

  return (
    <div className="flex flex-col gap-1">
      {!isSafari && (
        <div className="flex flex-col gap-1">
          <Text as="p" className="leading-snug">
            {n[0]} Open this page in Safari
          </Text>
          <div className="flex gap-2 justify-center">
            <a href={safariUrl} className={btnClass}>
              Open in Safari
            </a>
            <button
              onClick={copyToClipboard}
              className={btnClass}
              disabled={copied}
            >
              {copied ? "URL Copied" : "Copy URL"}
            </button>
          </div>
        </div>
      )}
      <Text as="p" className="leading-snug">
        {isSafari ? n[0] : n[1]} Tap the Share button at the bottom
      </Text>
      <Text as="p" className="leading-snug">
        {isSafari ? n[1] : n[2]} Tap &quot;Add to Home Screen&quot;
      </Text>
      <Text as="p" className="leading-snug">
        {isSafari ? n[2] : n[3]} Open Catarchy
      </Text>
    </div>
  );
}

function AndroidGuide() {
  return (
    <div className="flex flex-col gap-1">
      <Text as="p" className="leading-snug">
        ① Tap the menu (&bull;&bull;&bull;) at the top right
      </Text>
      <Text as="p" className="leading-snug">
        ② Tap &quot;Add to Home Screen&quot; or &quot;Install App&quot;
      </Text>
      <Text as="p" className="leading-snug">
        ③ Tap &quot;Add&quot; / &quot;Install&quot;
      </Text>
      <Text as="p" className="leading-snug">
        ④ Open Catarchy
      </Text>
    </div>
  );
}
