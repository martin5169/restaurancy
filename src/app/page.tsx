import Link from "next/link";
import api from "./api";
import SearchBox from "./components/SearchBox";
import RestaurantCard from "./components/RestaurantCard";

export default async function Home({ searchParams }: { searchParams: { q: string } }) {


  const restaurants = await api.search(searchParams.q);
   
  return (
    <section>
     <SearchBox/>
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.length==0? <p>Ese restaurant no existe</p> : restaurants.map((restaurant) => {
        return (
          <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
        );
      })}
    </section>
    </section>
  );
}