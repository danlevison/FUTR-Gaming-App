type GameCategoryMenuT = {
	endPoints: {
		name: string
		path: string
	}[]
	categoryQuery: number
	handleGameCategory: (index: number) => void
}

export default function GameCategoryMenu({
	endPoints,
	categoryQuery,
	handleGameCategory
}: GameCategoryMenuT) {
	return (
		<ul className="flex justify-center sm:justify-start items-center w-full mt-10">
			{endPoints.map((link, idx) => (
				<li key={link.name}>
					<button
						type="button"
						onClick={() => handleGameCategory(idx)}
						className={`text-sm sm:text-base text-gray-400 font-bold border-t-2 border-transparent p-4 transition-all duration-300 hover:border-primaryText hover:text-primaryText ${
							idx === categoryQuery &&
							"border-t-accentSecondary text-accentSecondary"
						}`}
					>
						{link.name}
					</button>
				</li>
			))}
		</ul>
	)
}
