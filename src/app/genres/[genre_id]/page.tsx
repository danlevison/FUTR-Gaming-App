"use client"

import Banner from "@/components/Banner"
import {
  useGetGenreQuery,
  useGetAllGenreGamesQuery,
} from "@/redux/features/gamesApiSlice"
import { useParams } from "next/navigation"
import GamesList from "@/components/GamesList"
import Pagination from "@/components/Pagnination"
import LoadingGames from "@/components/loading/LoadingGames"
import { useQueryState, parseAsInteger } from "nuqs"
import SkeletonBanner from "@/components/skeletons/SkeletonBanner"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Genre() {
  const { genre_id } = useParams()
  const [pageQuery, setPageQuery] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )
  const {
    data: genreData,
    isLoading: isGenreDataLoading,
    isFetching: isGenreDataFetching,
    isError: isGenreDataError,
  } = useGetGenreQuery(genre_id as string)
  const {
    data: genreGamesData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllGenreGamesQuery({
    page: pageQuery,
    slug: genre_id as string,
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
      {(isGenreDataLoading || isGenreDataFetching) && <SkeletonBanner />}
      {genreData && <Banner data={genreData} />}
      {isGenreDataError && (
        <ErrorDisplay errorMessage="Sorry, something went wrong." />
      )}
      <div className="mt-7 w-full">
        {(isLoading || isFetching) && <LoadingGames />}
        {genreGamesData && genreGamesData.results?.length > 0 && (
          <div className="flex flex-col items-center gap-10">
            <GamesList games={genreGamesData.results} />
            <Pagination
              pageHandler={pageHandler}
              nextPage={genreGamesData.next}
              prevPage={genreGamesData.previous}
              currentPage={pageQuery}
              count={genreGamesData.count}
            />
          </div>
        )}
        {isError && <ErrorDisplay errorMessage="Unable to load games." />}
      </div>
    </main>
  )
}
