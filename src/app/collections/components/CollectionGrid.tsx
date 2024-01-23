"use client"

import { useFetchCollectionsQuery } from "@/redux/features/collectionsApiSlice"
import Spinner from "@/components/loading/Spinner"
import CollectionCard from "@/components/CollectionCard"
import type { UserT } from "@/types"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function CollectionGrid({ user }: { user: UserT }) {
	const {
		data: collectionsData,
		isLoading,
		isFetching,
		isError
	} = useFetchCollectionsQuery(user?.uid as string)

	return (
		<div>
			{isLoading || isFetching ? (
				<div className="flex justify-center items-center">
					<Spinner />
				</div>
			) : (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
					{collectionsData?.map(
						({ id, title, description, isPublic, games, owner, ownerId }) => (
							<li key={id}>
								<CollectionCard
									id={id}
									title={title}
									description={description}
									isPublic={isPublic}
									games={games}
									owner={owner}
									ownerId={ownerId}
									user={user!}
								/>
							</li>
						)
					)}
					{isError && (
						<ErrorDisplay errorMessage="Unable to load collections." />
					)}
				</ul>
			)}
		</div>
	)
}
