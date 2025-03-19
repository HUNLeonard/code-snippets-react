const animationLength = 3000; //ms
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
            animationDuration: animationLength + "ms",
            animationDelay: (index * animationLength) / loadingLength + "ms",
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
};
