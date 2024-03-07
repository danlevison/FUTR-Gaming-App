"use client"

import {
  useFetchFollowingCollectionsQuery,
  useFetchFollowingCollectionIdsQuery,
} from "@/redux/features/collectionsApiSlice"
import { useParams } from "next/navigation"
import CollectionsCarousel from "./CollectionsCarousel"
import useUser from "@/hooks/useUser"

export default function CollectionsSlider() {
  const { user_id } = useParams()
  const user = useUser()
  const { data: collectionsIds } = useFetchFollowingCollectionIdsQuery(
    user_id as string
  )

  const collectionId = collectionsIds?.map(
    (collection) => collection.collectionId
  )

  const {
    data: collectionsData,
    isLoading,
    isFetching,
    isError,
  } = useFetchFollowingCollectionsQuery(collectionId as string[])

  const publicCollections = collectionsData?.filter(
    (collection) => collection.isPublic
  )

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold uppercase pb-2">
        Following Collections <span>({publicCollections?.length || 0})</span>
      </h2>
      {!publicCollections || publicCollections?.length === 0 ? (
        <p className="mt-20 text-xl text-center">
          {user?.uid === user_id
            ? "You are not following any collections yet."
            : "No collections yet."}
        </p>
      ) : (
        <CollectionsCarousel
          collectionsData={publicCollections || []}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
        />
      )}
    </section>
  )
}
