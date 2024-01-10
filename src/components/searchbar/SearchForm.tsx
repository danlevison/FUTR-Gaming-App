import { AiOutlineSearch } from "react-icons/ai"
import { MdClose } from "react-icons/md"
import { Label } from "../ui/label"

type SearchFormProps = {
	searchInput: string
	setSearchInput: React.Dispatch<React.SetStateAction<string>>
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
	showResults?: boolean
}

export default function SearchForm({
	searchInput,
	setSearchInput,
	handleSearch,
	showResults
}: SearchFormProps) {
	return (
		<form className="w-full py-1 px-2">
			<div className="w-full flex items-center gap-2">
				<Label
					htmlFor="search"
					className="bg-transparent"
				>
					<AiOutlineSearch size={30} />
					<span className="sr-only">Search games</span>
				</Label>
				<div className="flex items-center w-full border-input md:border-gray-600 border-2 rounded-md p-2">
					<input
						value={searchInput}
						onChange={handleSearch}
						type="text"
						id="search"
						name="search"
						placeholder="Search games"
						autoComplete="off"
						className="text-base w-full outline-none bg-transparent"
						autoFocus={showResults}
					/>
					{searchInput && (
						<button
							onClick={() => setSearchInput("")}
							type="button"
						>
							<MdClose />
						</button>
					)}
				</div>
			</div>
		</form>
	)
}
