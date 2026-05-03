import { Box, cn, Text } from "@/features/common";
import { useState } from "react";
import { SoundKnob } from "./sound-knob";
import { SoundCloudEmbed } from "./soundcloud-embed";
import styles from "./music-drawer.module.css";

export function MusicDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      as="aside"
      rounded
      className={cn(
        styles.drawer,
        isOpen ? styles.drawerOpen : styles.drawerClosed,
      )}
      containerClassName={styles.container}
    >
      <SoundKnob
        className={styles.knob}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <header>
        <Text as="h2" className={cn("font-stroke-white", styles.title)}>
          ♩ ♪ ♫ Music Box ♫ ♪ ♩
        </Text>
      </header>
      <div className={styles.embedWrapper}>
        <SoundCloudEmbed
          url="https://api.soundcloud.com/playlists/2224108670"
          height="100%"
          autoPlay={false}
          artistName="𝐚𝐢𝐢𝐢𝐝𝐞𝐧"
          artistUrl="https://soundcloud.com/jjambaek-h"
          label="聖曲"
          labelUrl="https://soundcloud.com/jjambaek-h/sets/uqwdvm7889fs"
        />
      </div>
    </Box>
  );
}
