import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
      sortColumn: {
        path: "title",
        order: "asc",
      },
    });
  }

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
    // console.log(genre);
  };

  handleDelete = (movie) => {
    var movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getNoOfMovie = () => this.state.movies.length;

  getPagedAndFilteredMovies = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;

    const filteredMovies = selectedGenre
      ? allMovies.filter((m) => m.genre.name === selectedGenre.name)
      : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalcount: filteredMovies.length, movies };
  };

  render() {
    const { currentPage, pageSize, selectedGenre, sortColumn } = this.state;

    if (this.getNoOfMovie() === 0) return <h4>There are no Movies to show</h4>;

    const { totalcount, movies } = this.getPagedAndFilteredMovies();

    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            <li
              style={{ cursor: "pointer" }}
              onClick={() => this.handleGenreSelect("")}
              className={
                selectedGenre === ""
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              All Movies
            </li>
          </ul>
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h3>Showing {totalcount} movies</h3>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            totalMovies={totalcount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
