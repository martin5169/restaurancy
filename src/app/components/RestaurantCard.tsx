'use client'

import Link from "next/link";
import useLocalStorage from "../useLocalStorage";

export default function RestaurantCard({
    restaurant,
  }: {
    restaurant: {
      id: string;
      name: string;
      image: string;
      description: string;
      score: number;
      ratings: number;
    };
  }) 
  
  {
    const [isFavourite, setIsFavourite] = useLocalStorage(`${restaurant.id}`, false);


    
    const handleToggleFavourite = () => {
      setIsFavourite((prev:boolean) => !prev);
    };
  
    return (
      <article>
        <img
          alt={restaurant.name}
          className="mb-3 h-[300px] w-full object-cover"
          src={restaurant.image}
        />
        <h2 className="inline-flex gap-2 text-lg font-bold items-center">
          <Link href={`/${restaurant.id}`}>
            <span>{restaurant.name}</span>
          </Link>
          <small className="inline-flex gap-1">
            <span>⭐</span>
            <span>{restaurant.score}</span>
            <span className="font-normal opacity-75">({restaurant.ratings})</span>
          </small>
          <button
            type="button"
            onClick={handleToggleFavourite}
            className={`text-red-500 text-xl ${
              isFavourite ? "opacity-100" : "opacity-20"
            }`}
          >
            ♥
          </button>
        </h2>
        <p className="opacity-90">{restaurant.description}</p>
      </article>
    );
  }