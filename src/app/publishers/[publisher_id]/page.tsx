"use client"

import Banner from "@/components/Banner"
import {
  useGetPublisherQuery,
  useGetAllPublisherGamesQuery,
} from "@/redux/features/gamesApiSlice"
import { useParams } from "next/navigation"
import GamesList from "@/components/GamesList"
import Pagination from "@/components/Pagnination"
import LoadingGames from "@/components/loading/LoadingGames"
import SkeletonBanner from "@/components/skeletons/SkeletonBanner"
import { useQueryState, parseAsInteger } from "nuqs"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Publisher() {
  const { publisher_id } = useParams()
  const [pageQuery, setPageQuery] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )
  const {
    data: publisherData,
    isLoading: isPublisherDataLoading,
    isFetching: isPublisherDataFetching,
    isError: isPublisherDataError,
  } = useGetPublisherQuery(publisher_id as string)

  const {
    data: publisherGamesData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllPublisherGamesQuery({
    page: pageQuery,
    slug: publisher_id as string,
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
      {(isPublisherDataLoading || isPublisherDataFetching) && (
        <SkeletonBanner />
      )}
      {publisherData && <Banner data={publisherData} />}
      {isPublisherDataError && (
        <ErrorDisplay errorMessage="Sorry, something went wrong." />
      )}
      <div className="mt-7 w-full">
        {(isLoading || isFetching) && <LoadingGames />}
        {publisherGamesData && publisherGamesData.results?.length > 0 && (
          <div className="flex flex-col items-center gap-10">
            <GamesList games={publisherGamesData.results} />
            <Pagination
              pageHandler={pageHandler}
              nextPage={publisherGamesData.next}
              prevPage={publisherGamesData.previous}
              currentPage={pageQuery}
              count={publisherGamesData.count}
            />
          </div>
        )}
        {isError && <ErrorDisplay errorMessage="Unable to load games." />}
      </div>
    </main>
  )
}
