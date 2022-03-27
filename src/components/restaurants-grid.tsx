import {restaurantsPageQuery_restaurants_results} from '../types/RestaurantsPageQuery';
import RestaurantCard from './restaurant-card';

interface RestaurantsGridProps {
  restaurants: restaurantsPageQuery_restaurants_results[] | null | undefined;
}

function RestaurantsGrid({restaurants}: RestaurantsGridProps) {
  return restaurants && restaurants.length > 0 ? (
    <div className='mb-8 grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4'>
      {restaurants.map(restaurant => (
        <RestaurantCard {...restaurant} key={restaurant.id} />
      ))}
    </div>
  ) : null;
}

export default RestaurantsGrid;
