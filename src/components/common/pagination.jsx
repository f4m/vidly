import React from "react";
import _ from "lodash";
import PropType from "prop-types";

const Pagination = (props) => {
  const { pageSize, totalMovies, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(totalMovies / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;

  if (currentPage)
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => onPageChange(page)} className="page-link">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
};

Pagination.propTypes = {
  pageSize: PropType.number.isRequired,
  totalMovies: PropType.number.isRequired,
  onPageChange: PropType.func.isRequired,
  currentPage: PropType.number.isRequired,
};

export default Pagination;
