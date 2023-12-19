import React from "react"
import GenreCard from "./GenreCard"
import { GenresT } from "@/types"

export default function GenresList({ genres }: { genres: GenresT[] }) {
	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5">
			{genres?.map((genre) => (
				<li key={genre.id}>
					<GenreCard genre={genre} />
				</li>
			))}
		</ul>
	)
}
