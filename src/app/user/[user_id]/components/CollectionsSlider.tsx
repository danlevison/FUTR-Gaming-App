"use client"

import useUser from "@/hooks/useUser"
import { useFetchCollectionsQuery } from "@/redux/features/collectionsApiSlice"
import { useParams } from "next/navigation"
import CollectionsCarousel from "./CollectionsCarousel"
import { CollectionsData, UserT } from "@/types"

export default function CollectionsSlider() {
  const user = useUser()
  const { user_id } = useParams()
  const {
    data: collectionsData,
    isLoading,
    isFetching,
    isError,
  } = useFetchCollectionsQuery(user_id as string)

  const publicCollections = () => {
    // if the user is not the current user then only show public collections
    if (user?.uid !== user_id) {
      return collectionsData?.filter((collection) => collection.isPublic)
    } else {
      // otherwise, show all collections
      return collectionsData
    }
  }

  function getCollectionsHeading(
    user: UserT,
    collectionsData: CollectionsData[],
    user_id: string
  ) {
    if (user?.uid === user_id) {
      return "My Collections"
    }

    return `${collectionsData?.map(
      (collection) => collection.owner
    )}'s Collections`
  }

  return (
    <section className="w-full">
      {collectionsData && (
        <h2 className="text-xl font-bold uppercase pb-2">
          {getCollectionsHeading(user, collectionsData, user_id as string)}{" "}
          <span>({publicCollections()?.length})</span>
        </h2>
      )}

      {publicCollections()?.length === 0 ? (
        <p className="mt-20 text-xl text-center">No collections yet.</p>
      ) : (
        <CollectionsCarousel
          collectionsData={publicCollections() || []}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
        />
      )}
    </section>
  )
}
