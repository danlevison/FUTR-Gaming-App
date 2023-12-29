import { AiOutlineSearch } from "react-icons/ai"
import { MdClose } from "react-icons/md"
import { Label } from "../ui/label"

type SearchFormProps = {
	searchInput: string
	setSearchInput: React.Dispatch<React.SetStateAction<string>>
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchForm({
	searchInput,
	setSearchInput,
	handleSearch
}: SearchFormProps) {
	return (
		<form className="w-full p-2">
			<div className="flex items-center gap-2">
				<div className="w-full flex items-center gap-2">
					<Label htmlFor="search">
						<AiOutlineSearch size={30} />
						<span className="sr-only">Search games</span>
					</Label>
					<div className="flex items-center w-full border-input border-2 rounded-md p-2">
						<input
							type="text"
							id="search"
							name="search"
							value={searchInput}
							onChange={handleSearch}
							placeholder="Search games"
							autoComplete="off"
							className="text-base w-full bg-transparent outline-none"
							autoFocus
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
			</div>
		</form>
	)
}
