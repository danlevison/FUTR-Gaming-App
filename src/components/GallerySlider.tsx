"use client"

import Link from "next/link"
import Image from "next/image"
import { useGetAllGamesQuery } from "@/redux/features/apiSlice"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules"
import Heading from "./Heading"

//swiper styles
import "swiper/css"
import "@/styles/swiperStyles.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import SkeletonGameScreenshots from "./skeletons/SkeletonGameScreenshots"

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
		<section className="w-full px-5">
			<Heading
				heading={{ firstText: "New and", secondText: "Upcoming games" }}
			/>
			<div className="flex flex-col justify-center items-center w-full mt-4">
				<Swiper
					modules={[Navigation, A11y, Autoplay]}
					slidesPerView={1}
					spaceBetween={20}
					autoplay={{
						delay: 4000,
						disableOnInteraction: false
					}}
					loop={true}
					navigation
					breakpoints={{
						640: {
							slidesPerView: 1,
							spaceBetween: 20
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 20
						}
					}}
					className="w-full mt-4"
				>
					{(isLoading || isFetching) && <SkeletonGameScreenshots />}
					{gamesData && gamesData.results.length > 0 && (
						<div>
							{gamesData.results.map((game) => (
								<SwiperSlide
									key={game.id}
									className="relative w-full h-full select-none rounded-md"
								>
									<Image
										src={game?.background_image}
										alt={game?.name}
										width={400}
										height={500}
										style={{ objectFit: "cover" }}
										className="w-full h-[300px]  rounded-md"
									/>
									<Link
										href={`games/${game.id}`}
										className="absolute bottom-[-1px] flex items-center w-full h-14 px-4 bg-transparent backdrop-blur-lg uppercase text-lg font-bold tracking-wide hover:underline rounded-b-md"
									>
										{game?.name}
									</Link>
								</SwiperSlide>
							))}
						</div>
					)}
				</Swiper>

				{isError && <p className="text-3xl font-bold">Unable to load games.</p>}
			</div>
		</section>
	)
}
