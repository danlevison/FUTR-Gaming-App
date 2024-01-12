"use client"

import Image from "next/image"
import Link from "next/link"
import { useGetAllGamesQuery } from "@/redux/features/gamesApiSlice"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel"
import SkeletonGameScreenshots from "../skeletons/SkeletonGameScreenshots"
import Heading from "./Heading"

export default function GallerySlider() {
	const {
		data: gamesData,
		isLoading,
		isFetching,
		isError
	} = useGetAllGamesQuery({
		urlEndpoint: "games/lists/main?",
		option: "released",
		page: 1
	})
	return (
		<section className="w-full px-5 pb-14">
			<Heading heading={{ firstText: "New & Upcoming", secondText: "Games" }} />
			<Carousel
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
			</Carousel>
			{isError && <p className="text-3xl font-bold">Unable to load games.</p>}
		</section>
	)
}
