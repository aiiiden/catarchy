import { Button, cn, sleep, Text, usePlatform } from "@/features/common";
import { useState } from "react";
import styles from "./pwa-guide.module.css";

export function PWAGuide({ onClose }: { onClose?: () => void }) {
  const { os } = usePlatform();

  return (
    <article className={cn(styles.root, "pb-safe")}>
      <div className={styles.scrollArea}>
        <Text as="p" className={styles.description}>
          Catarchy is a Progressive Web App (PWA). <br />
          For the best experience, <br />
          try adding this app to your home screen!
        </Text>
        {os === "ios" && <IosGuide />}
        {os === "android" && <AndroidGuide />}
      </div>
      <div className={styles.footer}>
        <Button size="big" onClick={onClose}>
          Close
        </Button>
      </div>
    </article>
  );
}

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
    <div className={styles.guideSection}>
      {!isSafari && (
        <div className={styles.guideSection}>
          <Text as="p" className={styles.step}>
            {n[0]} Open this page in Safari
          </Text>
          <div className={styles.copyRow}>
            <a href={safariUrl} className={styles.btnLink}>
              Open in Safari
            </a>
            <Button native
              onClick={copyToClipboard}
              className={styles.btnLink}
              disabled={copied}
            >
              {copied ? "URL Copied" : "Copy URL"}
            </Button>
          </div>
        </div>
      )}
      <Text as="p" className={styles.step}>
        {isSafari ? n[0] : n[1]} Tap the Share button at the bottom
      </Text>
      <Text as="p" className={styles.step}>
        {isSafari ? n[1] : n[2]} Tap &quot;Add to Home Screen&quot;
      </Text>
      <Text as="p" className={styles.step}>
        {isSafari ? n[2] : n[3]} Open Catarchy
      </Text>
    </div>
  );
}

function AndroidGuide() {
  return (
    <div className={styles.guideSection}>
      <Text as="p" className={styles.step}>
        ① Tap the menu (&bull;&bull;&bull;) at the top right
      </Text>
      <Text as="p" className={styles.step}>
        ② Tap &quot;Add to Home Screen&quot; or &quot;Install App&quot;
      </Text>
      <Text as="p" className={styles.step}>
        ③ Tap &quot;Add&quot; / &quot;Install&quot;
      </Text>
      <Text as="p" className={styles.step}>
        ④ Open Catarchy
      </Text>
    </div>
  );
}
