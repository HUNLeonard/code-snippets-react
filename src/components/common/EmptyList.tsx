import { CircleX, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { cn } from "../../utils/cn";

interface EmptyListProps {
  text?: string | Readonly<React.ReactNode>;
  className?: string;
  buttonText?: string;
  to?: string;
}

const EmptyList = ({ text, buttonText, to = "/", className }: EmptyListProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-4",
        className,
      )}
    >
      <div className="size-20 bg-base-content/50 rounded-full grid place-content-center">
        <CircleX strokeWidth={2} size={52} />
      </div>
      <p className="text-lg text-base-content/60">{text}</p>
      <Button
        className="w-fit mx-auto !bg-accent !px-4"
        tag={Link}
        tagProps={{ to }}
      >
        <span className="flex items-center gap-2">
          <PlusCircle size={20} />
          {buttonText}
        </span>
      </Button>
    </div>
  );
};

export default EmptyList;
