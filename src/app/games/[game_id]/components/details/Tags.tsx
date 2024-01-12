import Link from "next/link"
import type { GameT } from "@/types"

export default function Tags({ gameData }: { gameData: GameT }) {
	return (
		<div className="mt-4">
			<h3 className="font-bold text-gray-500 text-xl">Tags</h3>
			{gameData.tags?.length! > 0 ? (
				<ul className="flex flex-wrap gap-1">
					{gameData.tags?.map((tag, idx, array) => (
						<li key={tag.id}>
							<Link
								href={`/tags/${tag.slug}`}
								className="underline"
							>
								{tag.name + (idx < array.length - 1 ? "," : "")}
							</Link>
						</li>
					))}
				</ul>
			) : (
				<span>N/A</span>
			)}
		</div>
	)
}
