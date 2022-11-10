import React, { Component } from "react";
import Movies from "../Components/Movies";
import Preloader from "../Components/Preloader";
import Search from "../Components/Search";

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Main extends Component {
  state = {
    movies: [],
    loading: true,
  };

  componentDidMount() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
      .then((res) => res.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  searchMovies = (str, type = "all") => {
    this.setState({ loading: true });
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { movies, loading } = this.state;

    return (
      <>
        <div className="container content">
          <Search searchMovies={this.searchMovies} />

          {loading ? <Preloader /> : <Movies movies={movies} />}
        </div>
      </>
    );
  }
}
