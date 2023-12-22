import { GameT } from "@/types"
import GameCard from "./GameCard"

type GamesListT = {
	games: GameT[]
	sliceValue?: number
}

export default function GamesList({ games }: GamesListT) {
	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full">
			{games?.map((game) => (
				<li key={game.id}>
					<GameCard
						key={game.id}
						game={game}
					/>
				</li>
			))}
		</ul>
	)
}
