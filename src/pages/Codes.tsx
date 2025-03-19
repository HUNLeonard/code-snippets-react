import { useSearchParams } from "react-router-dom"
import { H2 } from "../components/common/H2"

export const Codes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("categories") || "";
  const categories = catParam.split(",")

  const handleSearchParams = () => {
    setSearchParams(params => {
      params.set("categories", (catParam + ",apple"));
      return params;
    });
  }

  return (
    <main className="my-6">
      <H2>Codes {!!catParam.length && `- ${catParam}`}</H2>
      {
        categories.map((c, idx) =>
          <p key={idx}>{c}</p>
        )
      }
      <button onClick={handleSearchParams}>Add apple</button>
    </main>
  )
}
