interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  score: number;
  ratings: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  list: async (): Promise<Restaurant[]> => {
    // Agrega un parametro de consulta unico para tener los datos siempre actualizados, evitando el cache
    const timestamp = new Date().getTime();
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGCBqA5SkYLzUuDClwyQH-85Md5q78WerfYV4gKgCbIGwAxY6fGojNDKeDNBypsVXvsaeRScOByt0/pub?output=csv&_`;

    const response = await fetch(url,  { cache: 'no-store' });
    const text = await response.text();
    const [, ...data] = text.split('\n');

    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(',');
      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image
      };
    });

    return restaurants;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    
    const restaurants = await api.list();
    const restaurant = restaurants.find((r) => r.id === id);

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },
};

export default api;
