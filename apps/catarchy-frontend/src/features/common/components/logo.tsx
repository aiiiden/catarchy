import TextLogoImage from "../assets/logo-text.svg?react";
import { cn } from "../lib/cn";

export function LogoText({
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
  desc?: string;
  descId?: string;
}) {
  return <TextLogoImage className={cn(["text-black", className])} {...props} />;
}
