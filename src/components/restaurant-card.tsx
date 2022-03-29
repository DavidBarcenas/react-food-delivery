import {Link} from 'react-router-dom';

interface RestaurantCardProps {
  id: number;
  name: string;
  coverImage: string;
  categoryName: string;
}

function RestaurantCard(restaurant: RestaurantCardProps) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <img
        src={restaurant.coverImage}
        alt={restaurant.name}
        className='mb-3 h-[180px] w-full object-cover'
      />
      <h3 className='text-lg font-medium leading-none'>{restaurant.name}</h3>
      <span className='text-sm capitalize leading-none text-gray-500'>
        {restaurant.categoryName}
      </span>
    </Link>
  );
}

export default RestaurantCard;
