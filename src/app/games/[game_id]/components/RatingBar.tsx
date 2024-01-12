import type { GameT } from "@/types"

export default function RatingBar({ gameData }: { gameData: GameT }) {
	return (
		<div className="flex flex-col md:flex-row w-full overflow-hidden mt-10">
			{gameData.ratings &&
				gameData.ratings.map((rating) => (
					<div
						key={rating.id}
						style={{ width: `${rating.percent}%` }}
						className={`p-3 bg-gradient-to-t ${
							rating.title === "exceptional"
								? "from-green-900  to-green-600"
								: rating.title === "recommended"
								? "from-blue-900  to-blue-600"
								: rating.title === "meh"
								? "from-orange-900  to-orange-600"
								: "from-red-900  to-red-600"
						}`}
					>
						<span className="capitalize text-sm">{rating.title}</span>
					</div>
				))}
		</div>
	)
}
