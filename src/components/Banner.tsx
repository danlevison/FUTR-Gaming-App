import Image from "next/image"
import placeholder from "@/../public/assets/placeholder.png"
import Description from "@/app/games/[game_id]/components/details/Description"
import type { PageItemT } from "@/types"

export default function Banner({ data }: { data: PageItemT }) {
	return (
		<section className="relative flex h-full min-h-[350px] w-full ">
			<Image
				src={data?.image_background || placeholder}
				alt={""}
				role="presentation"
				aria-hidden="true"
				fill
				style={{ objectFit: "cover", objectPosition: "center" }}
				className="absolute w-full h-full rounded-lg"
			/>
			<div className="backdrop-blur-[4px] backdrop-filter w-full h-full min-h-[350px] bg-background/70 p-4">
				<h1 className="max-w-[1000px] text-3xl md:text-6xl lg:text-7xl font-bold mt-4">
					{data?.name}
				</h1>

				{data?.description && (
					<>
						<h3 className="font-bold text-gray-500 text-xl md:text-3xl mt-4">
							About
						</h3>
						<Description description={data.description} />
					</>
				)}
			</div>
		</section>
	)
}
