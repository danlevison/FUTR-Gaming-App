"use client"

import Banner from "@/components/Banner"
import {
  useGetStoreQuery,
  useGetAllStoreGamesQuery,
} from "@/redux/features/gamesApiSlice"
import { useParams } from "next/navigation"
import GamesList from "@/components/GamesList"
import Pagination from "@/components/Pagnination"
import LoadingGames from "@/components/loading/LoadingGames"
import SkeletonBanner from "@/components/skeletons/SkeletonBanner"
import { useQueryState, parseAsInteger } from "nuqs"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Store() {
  const { store_id } = useParams()
  const [pageQuery, setPageQuery] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )
  const {
    data: storeData,
    isLoading: isStoreDataLoading,
    isFetching: isStoreDataFetching,
    isError: isStoreDataError,
  } = useGetStoreQuery(store_id as string)

  const {
    data: storeGamesData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllStoreGamesQuery({
    page: pageQuery,
    id: storeData?.id!,
  })

  const pageHandler = (pageValue: number) => {
    setPageQuery(pageValue)

    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
  }

  return (
    <main className="flex flex-col w-full px-5 pt-20 pb-10 md:pt-2">
      {(isStoreDataLoading || isStoreDataFetching) && <SkeletonBanner />}
      {storeData && <Banner data={storeData} />}
      {isStoreDataError && (
        <ErrorDisplay errorMessage="Sorry, something went wrong." />
      )}
      <div className="mt-7 w-full">
        {(isLoading || isFetching) && <LoadingGames />}
        {storeGamesData && storeGamesData.results?.length > 0 && (
          <div className="flex flex-col items-center gap-10">
            <GamesList games={storeGamesData.results} />
            <Pagination
              pageHandler={pageHandler}
              nextPage={storeGamesData.next}
              prevPage={storeGamesData.previous}
              currentPage={pageQuery}
              count={storeGamesData.count}
            />
          </div>
        )}
        {isError && <ErrorDisplay errorMessage="Unable to load games." />}
      </div>
    </main>
  )
}
