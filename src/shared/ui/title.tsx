import { cn } from "@shared/utils/utils";

type TitleProps = {
  text: string;
  className?: string;
};

export function Title({ text, className }: TitleProps) {
  return (
    <h1
      className={cn(
        "w-full break-words text-[36px] font-medium leading-[22px] tracking-[-0.4px] text-foreground",
        className,
      )}
    >
      {text}
    </h1>
  );
}
