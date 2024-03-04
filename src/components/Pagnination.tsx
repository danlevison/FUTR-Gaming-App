import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";

type PaginationT = {
  pageHandler: (pageValue: number) => void;
  nextPage: string | null;
  prevPage: string | null;
  currentPage: number;
  count: number;
};

export default function PaginationComponent({
  pageHandler,
  nextPage,
  prevPage,
  currentPage,
  count,
}: PaginationT) {
  const pageNextHandler = () => {
    if (nextPage !== null) pageHandler(++currentPage);
  };

  const pagePrevHandler = () => {
    if (prevPage !== null) pageHandler(--currentPage);
  };

  const pageNumberHandler = (pageNumber: number) => {
    pageHandler(pageNumber);
  };

  const handleActiveStyles = (pageNumber: number) => {
    return currentPage === pageNumber ? "bg-white text-background" : "";
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent className="flex sm:gap-2">
        <PaginationItem>
          <Button
            onClick={pagePrevHandler}
            variant={"outline"}
            disabled={prevPage === null ? true : false}
          >
            <MdOutlineKeyboardArrowLeft size={25} /> Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={() => pageNumberHandler(1)}
            variant={"outline"}
            className={`hidden sm:block ${handleActiveStyles(1)}`}
          >
            1
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={() => pageNumberHandler(2)}
            variant={"outline"}
            className={`hidden sm:block ${handleActiveStyles(2)}`}
            disabled={count < 40}
          >
            2
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={() => pageNumberHandler(3)}
            variant={"outline"}
            className={`hidden sm:block ${handleActiveStyles(3)}`}
            disabled={count < 80}
          >
            3
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis className="hidden sm:flex" />
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={pageNextHandler}
            variant={"outline"}
            disabled={nextPage === null ? true : false}
          >
            Next <MdOutlineKeyboardArrowRight size={25} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
