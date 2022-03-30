import {restaurantsPageQuery_restaurants_results} from '../types/RestaurantsPageQuery';
import RestaurantCard from './restaurant-card';

interface RestaurantsGridProps {
  restaurants: Omit<restaurantsPageQuery_restaurants_results, '__typename'>[] | null | undefined;
}

function RestaurantsGrid({restaurants}: RestaurantsGridProps) {
  return restaurants && restaurants.length > 0 ? (
    <div className='mb-8 grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4' id='restaurants-grid'>
      {restaurants.map(restaurant => (
        <RestaurantCard
          id={restaurant.id}
          name={restaurant.name}
          coverImage={restaurant.coverImage}
          categoryName={restaurant.category?.name || ''}
          key={restaurant.id}
        />
      ))}
    </div>
  ) : null;
}

export default RestaurantsGrid;
