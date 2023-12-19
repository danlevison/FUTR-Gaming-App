import PageItemCard from "./PageItemCard"

import { PageItemT } from "@/types"

export default function PageItemList<T extends PageItemT>({
	data
}: {
	data: T[]
}) {
	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5">
			{data?.map((item) => (
				<li key={item.id}>
					<PageItemCard item={item} />
				</li>
			))}
		</ul>
	)
}
