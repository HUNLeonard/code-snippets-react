import { loadingTextAnimationLength } from "../../shared/const";

const loadingText = "Loading...";
const loadingLength = loadingText.length;

export const LoadingText = () => {
  return (
    <>
      {loadingText.split("").map((char, index) => (
        <span
          key={char + "-" + index}
          className="inline-block animation-loadingText"
          style={{
            animationDuration: loadingTextAnimationLength + "ms",
            animationDelay: (index * loadingTextAnimationLength) / loadingLength + "ms",
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
};
