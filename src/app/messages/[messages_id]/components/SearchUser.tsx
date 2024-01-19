type SearchUserProps = {
	username: string
	setUsername: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchUser({ username, setUsername }: SearchUserProps) {
	return (
		<input
			onChange={(e) => setUsername(e.target.value)}
			value={username}
			type="text"
			placeholder="Search"
			className="w-full bg-transparent outline-none border-none p-3"
		/>
	)
}
