import api from "../api";
import Link from "next/link";



export async function generateMetadata({params: {id}}: {params: {id: string}}) {
    const restaurant = await api.fetch(id);
    return {
      title: `${restaurant.name} - Restaurancy`,
      description: restaurant.description,
    };
}

export default async function RestaurantPage({ params: { id } }: { params: { id: string } }) {
  const restaurant = await api.fetch(id);

  return (
    <article key={restaurant.id} className="grid grid-rows-1 justify-center">
      <img
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex gap-2 text-lg font-bold">
        <span>{restaurant.name}</span>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
      <div className="m-6 text-center items-center">{parseInt(restaurant.id) >1 &&
      <Link className="m-8 p-2 border-2 " href={`/${parseInt(restaurant.id)-1}`}>Previous</Link>}
      {parseInt(restaurant.id) < 12 && 
          <Link className="m-8 p-2 border-2" href={`/${parseInt(restaurant.id) + 1}`}>
            Next
          </Link>
        }
      </div>
    </article>
  );
}