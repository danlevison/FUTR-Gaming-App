"use client"

import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules"
import { useSelector } from "react-redux"
import { games } from "@/redux/features/gameSlice"
import Heading from "./Heading"

//swiper styles
import "swiper/css"
import "@/styles/swiperStyles.css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function GallerySlider() {
	const sliderGames = useSelector(games)
	console.log(sliderGames)
	//TODO:
	return (
		<div className="w-full max-w-[1440px] mx-auto px-8 py-20">
			<Heading
				heading={{ firstText: "New and", secondText: "Upcoming games" }}
			/>
			<Swiper
				modules={[Navigation, Pagination, A11y, Autoplay]}
				slidesPerView={1}
				spaceBetween={30}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false
				}}
				navigation
				pagination={{ clickable: true }}
				breakpoints={{
					640: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 40
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 50
					}
				}}
				className="w-full mt-10"
			>
				{sliderGames.map((game) => (
					<SwiperSlide
						key={game.id}
						className="w-full h-full select-none rounded-md"
					>
						<Link href={`games/${game.id}`}>
							<Image
								src={game?.background_image}
								alt={game?.name}
								width={400}
								height={500}
								style={{ objectFit: "cover" }}
								className="w-full h-[500px] border-yellow-500 border-4 rounded-md"
							/>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
