type GameCategoryMenuT = {
	endPoints: {
		name: string
		path: string
	}[]
	categoryIndex: number
	handleGameCategory: (index: number) => void
}

export default function GameCategoryMenu({
	endPoints,
	categoryIndex,
	handleGameCategory
}: GameCategoryMenuT) {
	return (
		<ul className="flex items-center w-full mt-4">
			{endPoints.map((link, idx) => (
				<li key={link.name}>
					<button
						type="button"
						onClick={() => handleGameCategory(idx)}
						className={`text-gray-400 font-bold border-t-2 border-transparent p-4 transition-all duration-300 hover:border-primaryText hover:text-primaryText ${
							idx === categoryIndex && "border-t-yellow-500 text-yellow-500"
						}`}
					>
						{link.name}
					</button>
				</li>
			))}
		</ul>
	)
}
