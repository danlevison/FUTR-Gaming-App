import Image from "next/image"
import { platformIcons } from "@/utils/platformIcons"
import placeholder from "@/../public/assets/placeholder.png"
//types
import { GameT } from "@/types"

export default function Banner({ gameData }: { gameData: GameT }) {
	const releaseDate = new Date(gameData.released).toDateString()
	const platforms = gameData.parent_platforms?.map(({ platform }) => (
		<span key={platform.id}>{platformIcons[platform.name]}</span>
	))
	const averagePlaytime = gameData.playtime! > 0 && (
		<p className="uppercase text-sm">
			Average playtime: {gameData.playtime} hours
		</p>
	)

	return (
		<section className="relative flex h-[350px] w-full ">
			<Image
				src={gameData?.background_image || placeholder}
				alt={gameData.name}
				fill
				style={{ objectFit: "cover", objectPosition: "center" }}
				className="absolute w-full h-full rounded-lg"
			/>
			<div className="backdrop-blur-[3px] backdrop-filter w-full h-full bg-background/60 p-4">
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
					<div className="flex items-center gap-4">
						<p className="bg-white text-sm text-black uppercase p-1 rounded-md">
							{releaseDate}
						</p>
						<div className="flex items-center gap-1">{platforms}</div>
					</div>

					{averagePlaytime}
				</div>
				<h1 className="max-w-[1000px] text-3xl md:text-6xl lg:text-7xl font-bold mt-4">
					{gameData?.name}
				</h1>
			</div>
		</section>
	)
}
