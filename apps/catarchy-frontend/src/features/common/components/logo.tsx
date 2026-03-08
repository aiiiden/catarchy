import LogoImage from "../assets/logo-image.svg?react";
import LogoText from "../assets/logo-text.svg?react";

export function ImageLogo({
  size = 32,
  hidePadding = false,
}: {
  size?: 32 | 64 | 128 | 256 | 512;
  hidePadding?: boolean;
}) {
  const multiplier = size / 32;

  return (
    <div
      role="img"
      style={
        hidePadding
          ? undefined
          : {
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
      }
    >
      <LogoImage
        width={19 * multiplier}
        height={15 * multiplier}
        title="Cat Icon"
      />
    </div>
  );
}

export function TextLogo({ size = 72 }: { size?: 72 | 144 | 288 | 512 }) {
  return <LogoText width={size} height={size / 6} title="Catarchy" />;
}
