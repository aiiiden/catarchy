import { Box, cn, Text } from "@/features/common";
import { useState } from "react";
import { SoundKnob } from "./sound-knob";
import { SoundCloudEmbed } from "./soundcloud-embed";

export function MusicDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      as="aside"
      rounded
      className={cn([
        "fixed top-4 bottom-4 overflow-visible! w-[calc(100%-1rem)] transition-[left] duration-300 ease-[steps(16,jump-end)]",
        isOpen ? "left-8" : "left-full",
      ])}
      containerClassName="w-full h-full py-4 pl-4 pr-7.5 relative overflow-visible! flex flex-col gap-4"
    >
      <SoundKnob
        className="absolute -left-6.5 top-1/2 -translate-y-1/2 z-50"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <header>
        <Text as="h2" className="font-stroke-white text-center">
          ♩ ♪ ♫ Music Box ♫ ♪ ♩
        </Text>
      </header>
      <div className="flex-1 h-full pb-3">
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
