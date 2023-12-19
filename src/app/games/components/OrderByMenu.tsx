import { Fragment } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BiChevronDown } from "react-icons/bi"

type OrderByMenuT = {
	options: string[]
	optionQuery: string
	handleOption: (opt: any) => void
}

export default function OrderByMenu({
	options,
	optionQuery,
	handleOption
}: OrderByMenuT) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-2 border-accentPrimary border-2 bg-background p-3 rounded-md w-full max-w-[200px] capitalize select-none mt-3">
				Order by: {optionQuery} <BiChevronDown size={25} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-full sm:w-[200px] bg-[#374151] border-none divide-background divide-y">
				{options.map((opt) => (
					<Fragment key={opt}>
						<DropdownMenuItem
							asChild
							className="w-full h-full p-3 text-primaryText font-bold capitalize cursor-pointer"
						>
							<button onClick={() => handleOption(opt)}>{opt}</button>
						</DropdownMenuItem>
					</Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
