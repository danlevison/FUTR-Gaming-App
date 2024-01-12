"use client"

import Image from "next/image"
import { useGetGameScreenshotsQuery } from "@/redux/features/gamesApiSlice"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel"
import SkeletonGameScreenshots from "@/components/skeletons/SkeletonGameScreenshots"
import type { GameT } from "@/types"

export default function Screenshots({ gameData }: { gameData: GameT }) {
	const {
		data: screenshots,
		isFetching,
		isLoading,
		isError
	} = useGetGameScreenshotsQuery({
		id: gameData.id as string
	})

	return (
		<section className="w-full mt-5">
			<Carousel
				opts={{
					align: "start",
					loop: true
				}}
				className="w-full"
			>
				{(isLoading || isFetching) && <SkeletonGameScreenshots />}
				{screenshots && screenshots.results.length > 0 && (
					<CarouselContent>
						{screenshots.results.map((screenshot) => (
							<CarouselItem
								key={screenshot.id}
								className="sm:basis-1/2 md:basis-1/2 xl:basis-1/3"
							>
								<div className="flex justify-center items-center w-full h-full">
									<Image
										src={screenshot?.image}
										alt={`${gameData.name} screenshot`}
										width={screenshot.width}
										height={screenshot.height}
										style={{ objectFit: "cover" }}
										className="w-full h-[300px] rounded-md"
									/>
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
