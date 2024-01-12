import Link from "next/link"
import Description from "./details/Description"
import Tags from "./details/Tags"
import type { GameT } from "@/types"

export default function Details({ gameData }: { gameData: GameT }) {
	return (
		<section className="w-full mt-10">
			<h2 className="text-3xl font-bold mb-2">Details</h2>
			<div className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-10 bg-foreground rounded-lg p-5">
				<div className="w-full max-w-[700px]">
					<h3 className="font-bold text-gray-500 text-xl">About</h3>
					{gameData.description && (
						<Description description={gameData.description} />
					)}
					<Tags gameData={gameData} />
				</div>

				<div className="w-full">
					<div>
						<h3 className="font-bold text-gray-500 text-xl">Platforms</h3>
						<ul className="flex flex-wrap items-center gap-2">
							{gameData.parent_platforms?.map(({ platform }, idx, array) => (
								<li key={platform.id}>
									{platform.name + (idx < array.length - 1 ? "," : "")}
								</li>
							))}
						</ul>
					</div>
					<div className="py-3">
						<h3 className="font-bold text-gray-500 text-xl">Genre</h3>
						{gameData.genres?.length! > 0 ? (
							<ul className="flex flex-wrap items-center gap-2">
								{gameData.genres?.map((genre, idx, array) => (
									<li key={genre.id}>
										<Link
											href={`/genres/${genre.slug}`}
											className="underline"
										>
											{genre.name + (idx < array.length - 1 ? "," : "")}
										</Link>
									</li>
								))}
							</ul>
						) : (
							<span>N/A</span>
						)}
					</div>
					<div>
						<h3 className="font-bold text-gray-500 text-xl">Developer</h3>
						{gameData.developers?.length! > 0 ? (
							<ul className="flex flex-wrap items-center gap-2">
								{gameData.developers?.map((developer, idx, array) => (
									<li key={developer.id}>
										<Link
											href={`/publishers/${developer.slug}`}
											className="underline"
										>
											{developer.name + (idx < array.length - 1 ? "," : "")}
										</Link>
									</li>
								))}
							</ul>
						) : (
							<span>N/A</span>
						)}
					</div>
				</div>

				<div className="w-full">
					<div>
						<h3 className="font-bold text-gray-500 text-xl">Metascore</h3>
						<span>{gameData.metacritic || "Not rated"}</span>
					</div>
					<div className="py-3">
						<h3 className="font-bold text-gray-500 text-xl">Rating</h3>
						{gameData.rating && gameData.rating_top ? (
							<span>
								{gameData.rating} / {gameData.rating_top}
							</span>
						) : (
							<span>Not rated</span>
						)}
					</div>
					<div>
						<h3 className="font-bold text-gray-500 text-xl">Links</h3>
						{gameData.website ? (
							<a
								href={gameData.website}
								className="underline break-words"
								target="_blank"
							>
								{gameData.website}
							</a>
						) : (
							<span>N/A</span>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
