import pb from "@service/pocketbase.service";
import {
  getIsUserFavorites,
  getRestaurant,
  getRestaurantFavoritedAmount,
} from "@service/restaurant.service";
import { getRestaurantReviewsAmount } from "@service/reviews.service";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Edit3, Eye, Heart, MapPin, Star } from "@geist-ui/icons";
import { round } from "@utils/utils";
import FavoriteButton from "@components/favorite/favorite-button";

interface RestaurantHeaderProps {
  restaurantId: string;
}

export default async function RestaurantHeader({
  restaurantId,
}: RestaurantHeaderProps) {
  try {
    const [restaurant, reviewAmount, favorited, favoritedAmount] =
      await Promise.all([
        getRestaurant({ restaurantId }),
        getRestaurantReviewsAmount({ restaurantId }),
        getIsUserFavorites({ restaurantId: restaurantId }),
        getRestaurantFavoritedAmount({ restaurantId }),
      ]);

    const images: string[] = ((restaurant.images as string[]) || []).map(
      (image) => {
        return pb.files.getUrl(restaurant, image, { thumb: "0x300" });
      },
    );
    return (
      <>
        <section className="w-full h-[60vh] flex-grow max-h-full flex flex-col gap-8 mb-4 lg:mb-0">
          <div className="w-full h-full gap-4 flex">
            <div className="w-[45%] h-full bg-black rounded-xl overflow-clip">
              {images[0] && (
                <Image
                  width={1024}
                  height={720}
                  className="w-full h-full object-cover opacity-80"
                  src={images[0]}
                  alt="coverImage"
                />
              )}
            </div>
            <div className="w-[25%] h-full bg-black rounded-xl overflow-clip">
              {images[1] && (
                <Image
                  width={1024}
                  height={720}
                  className="w-full h-full object-cover opacity-80"
                  src={images[1]}
                  alt="coverImage"
                />
              )}
            </div>
            <div className="w-[30%] h-full flex flex-col gap-4">
              <div className="w-full h-[50%] bg-black rounded-xl overflow-clip">
                {images[2] && (
                  <Image
                    width={1024}
                    height={720}
                    className="w-full h-full object-cover opacity-80"
                    src={images[2]}
                    alt="coverImage"
                  />
                )}
              </div>
              <div className="w-full h-[50%] bg-black rounded-xl overflow-clip relative">
                {images.length <= 4 ? (
                  images[3] && (
                    <Image
                      width={1024}
                      height={720}
                      className="w-full h-full object-cover opacity-80"
                      src={images[3]}
                      alt="coverImage"
                    />
                  )
                ) : (
                  <div className="w-full h-full">
                    <Image
                      width={1024}
                      height={720}
                      className="w-full h-full object-cover opacity-35 hover:opacity-20 transition-all duration-300 ease-in-out absolute"
                      src={images[3]}
                      alt="coverImage"
                    />
                    <h1 className="z-10 text-3xl text-white w-full h-full justify-center items-center flex">
                      +&nbsp;{images.length - 4}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-fit flex flex-col xl:flex-row justify-between gap-16  ">
          <div className="w-full xl:w-[60%] h-full flex flex-col gap-8 ">
            <div className="w-full h-full flex flex-col gap-8 ">
              <div className="w-full h-full flex flex-col gap-1">
                <div className="flex gap-4 w-full justify-between">
                  <h1 className="text-2xl lg:text-3xl font-medium">
                    {restaurant.name}
                  </h1>
                </div>
                <div className="flex gap-4 items-center h-f">
                  <div className="flex gap-1 items-center">
                    <Star color="#6b7280" className="w-4 flex-shrink-0" />
                    <p className="text-gray-500 text-sm lg:text-base ">
                      {round(restaurant.cachedRating)}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Eye color="#6b7280" className="w-4 flex-shrink-0" />
                    <p className="text-gray-500 text-sm lg:text-base ">12313</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Edit3 color="#6b7280" className="w-4 flex-shrink-0" />
                    <p className="text-gray-500 text-sm lg:text-base ">
                      {reviewAmount}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Heart color="#6b7280" className="w-4 flex-shrink-0" />
                    <p className="text-gray-500 text-sm lg:text-base ">
                      {favoritedAmount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 xl:hidden">
                <div>
                  <p className=" text-base  text-gray-500 text-wrap">
                    Opening Hours: 07:00 - 18:00
                  </p>
                </div>
                <span className="flex h-fit gap-2 items-start justify-start  xl:items-start">
                  <MapPin color="#6b7280" className="w-4 flex-shrink-0 " />
                  <p className="  text-base  text-gray-500 text-wrap text-left w-fit">
                    {restaurant.location}
                  </p>
                </span>
              </div>
              <p className="  text-base  text-gray-500 w-full xl:w-[80%]">
                {restaurant.description}
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg flex flex-col gap-2 ">
              <h1 className="  text-base  font-medium">
                Customer Sentiment Overview:
              </h1>
              <div>
                <p className="  text-base  text-gray-500 italic">
                  “Visitors have consistently reported a positive experience.
                  The ‘Buta Kara’ dish is frequently mentioned as a favorite
                  menu item.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[40%] h-auto items-end  justify-between  flex-col gap-8 hidden xl:flex ">
            <div className="w-full h-fit items-end flex-col gap-1 hidden xl:flex">
              <div>
                <p className="  text-base  text-gray-500 text-wrap">
                  Opening Hours: 07:00 - 18:00
                </p>
              </div>
              <span className="flex h-fit gap-2 items-center xl:items-start justify-end ">
                <MapPin color="#6b7280" className="w-4 flex-shrink-0 " />
                <p className="  text-base  text-gray-500 text-wrap text-right w-fit">
                  {restaurant.location}
                </p>
              </span>
            </div>
            <div>
              <FavoriteButton
                favorited={favorited}
                restaurantId={restaurantId}
              />
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    return notFound();
  }
}
