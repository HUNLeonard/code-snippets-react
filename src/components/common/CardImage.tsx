import { capitalizer } from '../../utils/capitalize';

const CardImage = ({ src, name }: { src: string, name: string }) => {
  const cardImageSrc =
    src ||
    `https://placehold.co/600x400/221144/a3bbff/?text=${capitalizer(
      name,
    ).replace(" ", "%20")}`;

  return (
    <figure className="rounded-md overflow-hidden">
      <img
        src={cardImageSrc}
        alt={`Image of ${name}`}
        className="md:group-hover:blur-[2px] group-hover:scale-105 transition-all duration-600 ease-out"
      />
    </figure>
  )
}

export default CardImage