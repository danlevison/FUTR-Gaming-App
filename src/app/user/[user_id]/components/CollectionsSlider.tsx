"use client"

import CollectionCard from "@/components/CollectionCard"
import Spinner from "@/components/loading/Spinner"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel"
import { currentUser } from "@/redux/features/authSlice"
import { useFetchCollectionsQuery } from "@/redux/features/collectionsApiSlice"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"

export default function CollectionsSlider() {
	const user = useSelector(currentUser)
	const { user_id } = useParams()
	const {
		data: collectionsData,
		isLoading,
		isFetching,
		isError
	} = useFetchCollectionsQuery({ userId: user_id as string })

	const publicCollections = () => {
		// if the user is not the current user then only show public collections
		if (user?.uid !== user_id) {
			return collectionsData?.filter((collection) => collection.isPublic)
		} else {
			// otherwise, show all collections
			return collectionsData
		}
	}

	return (
		<section className="w-full pt-10">
			<h2 className="text-xl font-bold uppercase pb-2">
				Collections <span>({publicCollections()?.length})</span>
			</h2>
			{publicCollections()?.length === 0 ? (
				<p className="mt-20 text-xl text-center">No collections yet.</p>
			) : (
				<Carousel
					opts={{
						align: "start",
						loop: true
					}}
				>
					{isLoading || isFetching ? (
						<div className="flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						<div>
							<CarouselContent>
								{publicCollections()?.map(
									({
										id,
										title,
										description,
										isPublic,
										games,
										owner,
										ownerId
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
												games={games}
												owner={owner}
												ownerId={ownerId}
												user={user!}
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
			)}
		</section>
	)
}

{
	/* <Carousel
				opts={{
					align: "start",
					loop: true
				}}
				className="w-full mt-5"
			>
				{(isLoading || isFetching) && <SkeletonGameScreenshots />}
				{gamesData && gamesData.results.length > 0 && (
					<CarouselContent>
						{gamesData.results.map((game) => (
							<CarouselItem
								key={game.id}
								className="sm:basis-1/2 md:basis-1/2 xl:basis-1/3"
							>
								<Image
									src={game?.background_image}
									alt={game?.name}
									width={400}
									height={300}
									style={{ objectFit: "cover" }}
									className="w-full h-[300px] rounded-md"
								/>
								<div className="absolute bottom-0 flex items-center w-full px-4 h-14 bg-transparent backdrop-blur-lg">
									<Link
										href={`games/${game.id}`}
										className="w-fit uppercase text-lg font-bold tracking-wide hover:underline rounded-b-md"
									>
										{game?.name}
									</Link>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				)}
				<CarouselPrevious />
				<CarouselNext />
			</Carousel> */
}
