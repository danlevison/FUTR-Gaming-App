import { useGetGameScreenshotsQuery } from "@/redux/features/apiSlice"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
//swiper styles
import "swiper/css"
import "@/styles/swiperStyles.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
//types
import { GameT } from "@/types"
import SkeletonGameScreenshots from "@/components/skeletons/SkeletonGameScreenshots"

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
		<section className="w-full">
			<div className="flex flex-col">
				{(isLoading || isFetching) && <SkeletonGameScreenshots />}

				<Swiper
					modules={[Navigation, Pagination, A11y]}
					spaceBetween={20}
					navigation
					pagination={{ clickable: true }}
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
					className="w-full mt-10 rounded-lg"
				>
					{screenshots && screenshots.results.length > 0 && (
						<>
							{screenshots.results.map((screenshot) => (
								<SwiperSlide
									key={screenshot.id}
									className="w-full h-full select-none rounded-md"
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
								</SwiperSlide>
							))}
						</>
					)}
				</Swiper>

				{isError && <p className="text-3xl font-bold">Unable to load games.</p>}
			</div>
		</section>
	)
}
