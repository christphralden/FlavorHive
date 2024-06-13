import { getAllRestaurantPaged } from "@service/restaurant.service"
import RestaurantProfileCard from "app/_components/restaurant-profile-card";

// TODO: change to sliderjs
export default async function RestaurantSlider(){
    try{
        const restaurants = await getAllRestaurantPaged({ page: 1, perPage: 10 });

        return(
            <div className="flex gap-4 w-full overflow-scroll">
                {
                    restaurants.items.map((restaurant,i)=>{
                        return(
                            <RestaurantProfileCard restaurant={restaurant} key={i}/>
                        )
                    })
                }
            </div>
        )
    } catch(error){
        console.error(error)
    }
}