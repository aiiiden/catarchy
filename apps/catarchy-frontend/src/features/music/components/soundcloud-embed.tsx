import { Text } from "@/features/common";

interface SoundCloudEmbedProps {
  url: string;
  color?: string;
  autoPlay?: boolean;
  height?: number | string;
  artistName?: string;
  artistUrl?: string;
  label?: string;
  labelUrl?: string;
}

export function SoundCloudEmbed({
  url,
  color = "#ff5500",
  autoPlay = false,
  height = 166,
  artistName,
  artistUrl,
  label,
  labelUrl,
}: SoundCloudEmbedProps) {
  const params = new URLSearchParams({
    url,
    color,
    auto_play: String(autoPlay),
    hide_related: "false",
    show_comments: "true",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "true",
  });

  const src = `https://w.soundcloud.com/player/?${params.toString()}`;

  return (
    <div
      className="no-invert"
      style={height === "100%" ? { height: "100%" } : undefined}
    >
      <iframe
        width="100%"
        height={height}
        style={{ border: "none", overflow: "hidden" }}
        allow="autoplay"
        src={src}
        title={label ?? "SoundCloud Player"}
      />
      {(artistName || label) && (
        <Text
          as="p"
          size="xsmall"
          style={{
            color: "#cccccc",
            lineBreak: "anywhere",
            wordBreak: "normal",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {artistName && (
            <a
              href={artistUrl}
              title={artistName}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              <Text>{artistName}</Text>
            </a>
          )}
          {artistName && label && <Text> · </Text>}
          {label && (
            <a
              href={labelUrl}
              title={label}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              <Text>{label}</Text>
            </a>
          )}
        </Text>
      )}
    </div>
  );
}
