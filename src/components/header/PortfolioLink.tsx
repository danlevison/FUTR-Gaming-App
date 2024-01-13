export default function PortfolioLink({
	sidebarStatus,
	nav
}: {
	sidebarStatus?: boolean
	nav?: boolean
}) {
	return (
		<div className="text-sm md:text-xs text-center mx-auto text-gray-500">
			{(sidebarStatus || nav) && (
				<span className="whitespace-nowrap">Developed by </span>
			)}
			<a
				href={"https://danlevison.dev/"}
				target="_blank"
				className="underline font-bold uppercase hover:text-white duration-300"
			>
				Dan
				<span className="sr-only">Opens in a new tab</span>
			</a>
		</div>
	)
}
