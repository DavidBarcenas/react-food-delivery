import {render} from '@testing-library/react';
import Pagination from '../pagination';

function renderPagination({
  currentPage = 1,
  totalPages = 0,
  prevPage = () => null,
  nextPage = () => null,
} = {}) {
  return render(
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      prevPage={prevPage}
      nextPage={nextPage}
    />,
  );
}

it('should return null when totalPages equals 0', () => {
  const {container} = renderPagination();
  expect(container.firstChild).toBeNull();
});

it('should hide back button when current page is less than 2', () => {
  const {queryByText} = renderPagination({currentPage: 1, totalPages: 2});
  expect(queryByText('west')).toBeNull();
});

it('it should show the back button and execute your function', () => {
  const mockPrevPage = jest.fn();
  const {getByText} = renderPagination({currentPage: 2, totalPages: 3, prevPage: mockPrevPage});
  const prevButton = getByText('west');
  prevButton.click();
  expect(mockPrevPage).toHaveBeenCalledTimes(1);
});

it('should hide next button when current currentPage equals totalPages', () => {
  const {queryByText} = renderPagination({currentPage: 1, totalPages: 1});
  expect(queryByText('east')).toBeNull();
});

it('it should show the next button and execute your function', () => {
  const mockNextPage = jest.fn();
  const {getByText} = renderPagination({currentPage: 1, totalPages: 2, nextPage: mockNextPage});
  const nextButton = getByText('east');
  nextButton.click();
  expect(mockNextPage).toHaveBeenCalledTimes(1);
});

it('render the text correctly', () => {
  const {getByText} = render(
    <Pagination currentPage={2} totalPages={3} prevPage={() => null} nextPage={() => null} />,
  );
  expect(getByText('Página 2 de 3')).toBeInTheDocument();
});
