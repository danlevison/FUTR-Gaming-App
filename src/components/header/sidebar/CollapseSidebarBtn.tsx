type CollapseSidebarBtnProps = {
	sidebarStatus: boolean
	setSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CollapseSidebarBtn({
	sidebarStatus,
	setSidebar
}: CollapseSidebarBtnProps) {
	return (
		<button
			onClick={() => setSidebar(!sidebarStatus)}
			className={`hidden transition-all duration-300 md:mt-auto md:gap-2 ${
				sidebarStatus ? "md:flex md:items-center" : "md:inline-block"
			} `}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				className={`h-6 w-6 fill-secondary transition-all duration-300 ${
					sidebarStatus && "rotate-180"
				}`}
			>
				<path
					fillRule="evenodd"
					d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
					clipRule="evenodd"
				/>
			</svg>

			<span
				className={`hidden text-body-1 text-primaryText ${
					sidebarStatus ? "md:inline-block" : "md:hidden"
				}`}
			>
				Collapse
			</span>
		</button>
	)
}
