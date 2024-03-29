"use client"

import { useGetAllPublishersQuery } from "@/redux/features/gamesApiSlice"
import { useQueryState, parseAsInteger } from "nuqs"
import PageItemList from "@/components/PageItemList"
import LoadingItems from "@/components/loading/LoadingItems"
import Pagination from "@/components/Pagnination"
import PageHeading from "@/components/PageHeading"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Publishers() {
  const [pageQuery, setPageQuery] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )
  const {
    data: allPublishersData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllPublishersQuery(pageQuery)

  const pageHandler = (pageValue: number) => {
    setPageQuery(pageValue)

    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
  }

  return (
    <main className="w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
      <PageHeading headingText="Publishers" />
      <div className="flex justify-center">
        {(isLoading || isFetching) && <LoadingItems />}
      </div>

      {allPublishersData && allPublishersData.results?.length > 0 && (
        <>
          <PageItemList data={allPublishersData.results} />
          <div className="flex flex-col items-center justify-center">
            <Pagination
              pageHandler={pageHandler}
              nextPage={allPublishersData.next}
              prevPage={allPublishersData.previous}
              currentPage={pageQuery}
              count={allPublishersData.count}
            />
          </div>
        </>
      )}

      {isError && <ErrorDisplay errorMessage="Unable to load publishers." />}
    </main>
  )
}
