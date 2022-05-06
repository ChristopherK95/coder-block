import { useEffect, useState } from 'react';
import { Container, PaginationBtn } from './Styles';

const Pagination = (props: {
  currentPage: number;
  pages: number;
  setPage: (page: number) => void;
}) => {
  const { currentPage, pages, setPage } = props;
  const [pageBtns, setPageBtns] = useState<number[]>([]);

  useEffect(() => {
    if (currentPage >= 4 && currentPage <= pages - 4) {
      const arr: number[] = [];
      for (let i = currentPage - 2; i < pages && arr.length < 5; i++) {
        arr.push(i);
      }
      setPageBtns(arr);
    }
    if (currentPage < 4) {
      const arr: number[] = [];
      for (let i = 0; i < pages && arr.length < 5; i++) {
        arr.push(i);
      }
      setPageBtns(arr);
    }
    if (currentPage > pages - 4) {
      const arr: number[] = [];
      for (let i = pages - 5; i < pages && arr.length < 5; i++) {
        arr.push(i);
      }
      setPageBtns(arr);
    }
  }, [currentPage]);

  return (
    <Container>
      {currentPage > 3 && (
        <PaginationBtn onClick={() => setPage(0)}>1..</PaginationBtn>
      )}
      {pageBtns.map((btn, index) => (
        <PaginationBtn
          key={index}
          onClick={() => setPage(btn)}
          selected={currentPage === btn}
        >
          {btn + 1}
        </PaginationBtn>
      ))}
      {currentPage < pages - 4 && (
        <PaginationBtn onClick={() => setPage(pages - 1)}>
          ..{pages}
        </PaginationBtn>
      )}
    </Container>
  );
};

export default Pagination;
