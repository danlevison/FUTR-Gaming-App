import CollectionCard from "@/components/CollectionCard"
import Spinner from "@/components/loading/Spinner"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CollectionsData } from "@/types"

type CollectionsCarouselProps = {
  collectionsData: CollectionsData[]
  isLoading: boolean
  isFetching: boolean
  isError: boolean
}

function CollectionsCarousel({
  collectionsData,
  isLoading,
  isFetching,
  isError,
}: CollectionsCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      {isLoading || isFetching ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <CarouselContent>
            {collectionsData?.map(
              ({
                id,
                title,
                description,
                isPublic,
                followers,
                games,
                owner,
                ownerId,
              }) => (
                <CarouselItem
                  key={id}
                  className="sm:basis-1/2 md:basis-1/2 xl:basis-1/3"
                >
                  <CollectionCard
                    id={id}
                    title={title}
                    description={description}
                    isPublic={isPublic}
                    followers={followers}
                    games={games}
                    owner={owner}
                    ownerId={ownerId}
                  />
                </CarouselItem>
              )
            )}
            {/* TODO: Check styling */}
            {isError && <p>Unable to load collections.</p>}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      )}
    </Carousel>
  )
}

export default CollectionsCarousel
