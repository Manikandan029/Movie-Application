import React, { useState ,useEffect} from "react";
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HomeImage from "../data/home";
import NewRelease from "../data/new-release";
import NewReleaseSeries from '../data/new-Release-Series';
import Recommended from '../data/Recommended';

export default function Home() {
  const [currentPopularSlide, setCurrentPopularSlide] = useState(0);
  const [currentNewReleaseSlide, setCurrentNewReleaseSlide] = useState(0);
  const [currentNewReleaseSeriesSlide, setCurrentNewReleaseSeriesSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const nextPopularSlide = () => {
    setCurrentPopularSlide((prevSlide) => (prevSlide + 1) % HomeImage.length);
  };

  const prevPopularSlide = () => {
    setCurrentPopularSlide((prevSlide) => (prevSlide - 1 + HomeImage.length) % HomeImage.length);
  };

  const nextNewReleaseSlide = () => {
    if (currentNewReleaseSlide + 1 < NewRelease.length) {
      setCurrentNewReleaseSlide((prevSlide) => prevSlide + 1);
    }
  };

  const prevNewReleaseSlide = () => {
    if (currentNewReleaseSlide > 0) {
      setCurrentNewReleaseSlide((prevSlide) => prevSlide - 1);
    }
  };

  const nextNewReleaseSeriesSlide = () => {
    if (currentNewReleaseSeriesSlide + 1 < NewReleaseSeries.length) {
      setCurrentNewReleaseSeriesSlide((prevSlide) => prevSlide + 1);
    }
  };

  const prevNewReleaseSeriesSlide = () => {
    if (currentNewReleaseSeriesSlide > 0) {
      setCurrentNewReleaseSeriesSlide((prevSlide) => prevSlide - 1);
    }
  };

  const categories = ['All', ...new Set(Recommended.map(movie => movie.category))];

  const filteredMovies = Recommended.filter(movie =>
    selectedCategory === 'All' || movie.category === selectedCategory
  );
   useEffect(() => {
    
    const interval = setInterval(() => {
      nextPopularSlide();
    }, 4000); 



    return () => clearInterval(interval);
  }, [currentPopularSlide, HomeImage.length]);

  return (
    <div className="">
      {/* Movie popular */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {HomeImage && HomeImage.map((HomeList, index) => (
            <div
              key={HomeList.id}
              className={`absolute transition-opacity duration-1000 ease-in-out ${currentPopularSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={HomeList.Image} alt="" className="w-full h-screen object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-black bg-opacity-50 text-white backdrop-blur-lg">
                <h1 className="text-4xl font-bold mb-2 md:mb-4">{HomeList.name}</h1>
                <ul className="flex flex-wrap space-x-2 mb-2 md:mb-4">
                  <li>Action</li>
                  <li>Adventure</li>
                  <li>Sci-fi</li>
                  <li>2024</li>
                  <li>2:45:00</li>
                  <li>9 star</li>
                </ul>
                <p className="text-sm md:text-base">{HomeList.details}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {HomeImage.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 md:h-2 md:w-2 rounded-full ${currentPopularSlide === index ? 'bg-red-600' : 'bg-white'} cursor-pointer`}
              onClick={() => setCurrentPopularSlide(index)}
              style={{ marginRight: index === HomeImage.length - 1 ? '0' : '0.5rem' }}
            />
          ))}
        </div>
        <button
          className="absolute top-1/2 left-36 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          onClick={prevPopularSlide}
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          className="absolute top-1/2 right-36 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          onClick={nextPopularSlide}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* New Release */}
      <div className="mt-20">
        <div className="flex justify-between items-center mb-4 mx-4 sm:mx-12 md:mx-20 lg:mx-36">
          <h1 className="text-3xl">New Release Movies </h1>
          <p className="text-sm cursor-pointer text-gray-500">View more...</p>
        </div>
        <div className="relative overflow-hidden mx-4 sm:mx-12 md:mx-20 lg:mx-32">
          <div className="flex transition-transform duration-300 ease-in-out gap-5" style={{ transform: `translateX(calc(-${currentNewReleaseSlide * (100 / NewRelease.length)}%))` }}>
            {NewRelease.map((movie) => (
              <Link to={`/details/new-release/${movie.id}`} key={movie.id} className="ml-5">
                <img src={movie.image} alt={movie.Name} className="h-96 max-w-96 border-b-gray-900 rounded-lg" />
                <div className="flex justify-between my-2">
                  <p>{movie.Name}</p>
                  <div className="flex gap-2">
                    <p className="border-b-gray-950 bg-red-600 px-1 rounded-lg">{movie.quality}</p>
                    <p>{movie.duration}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4 absolute top-1/2 transform -translate-y-1/2 left-4">
            <FaChevronLeft
              size={24}
              className={`bg-black bg-opacity-50 text-white p-2 rounded-full  hover:bg-opacity-75 cursor-pointer ${currentNewReleaseSlide === 0 ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={prevNewReleaseSlide}
              disabled={currentNewReleaseSlide === 0}
            />
          </div>
          <div className="flex items-center space-x-4 absolute top-1/2 transform -translate-y-1/2 right-4">
            <FaChevronRight
              size={24}
              className={`bg-black bg-opacity-50 text-white p-2 rounded-full  hover:bg-opacity-75 cursor-pointer ${currentNewReleaseSlide === NewRelease.length - 1 ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={nextNewReleaseSlide}
              disabled={currentNewReleaseSlide === NewRelease.length - 1}
            />
          </div>
        </div>
      </div>

      {/* New release Series */}
      <div className="mt-20">
        <div className="flex justify-between items-center mb-4 mx-4 sm:mx-12 md:mx-20 lg:mx-36">
          <h1 className="text-3xl">New Release Series</h1>
          <p className="text-sm cursor-pointer text-gray-500">View more...</p>
        </div>
        <div className="relative overflow-hidden mx-4 sm:mx-12 md:mx-20 lg:mx-32">
          {NewReleaseSeries && NewReleaseSeries.length > 0 ? (
            <div
              className="flex transition-transform duration-300 ease-in-out gap-5"
              style={{
                transform: `translateX(calc(-${currentNewReleaseSeriesSlide * (100 / NewReleaseSeries.length)}%))`,
              }}
            >
              {NewReleaseSeries.map((NewMovieList) => (
                <Link to={`/details/new-release-series/${NewMovieList.id}`} key={NewMovieList.id} className="ml-5">
                  <img
                    src={NewMovieList.image}
                    alt={NewMovieList.Name}
                    className="h-96 max-w-96 border-b-gray-900 rounded-lg"
                  />
                  <div className="flex justify-between my-2">
                    <p>{NewMovieList.Name}</p>
                    <div className="flex gap-2">
                      <p className="border-b-gray-950 bg-red-600 px-1 rounded-lg">
                        {NewMovieList.quality}
                      </p>
                      <p>{NewMovieList.duration}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>No data available</div>
          )}
          <div className="flex items-center space-x-4 absolute top-1/2 transform -translate-y-1/2 left-4">
            <FaChevronLeft
              size={24}
              className={`bg-black bg-opacity-50 text-white p-2 rounded-full p-1 hover:bg-opacity-75 cursor-pointer ${currentNewReleaseSeriesSlide === 0 ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={prevNewReleaseSeriesSlide}
              disabled={currentNewReleaseSeriesSlide === 0}
            />
          </div>
          <div className="flex items-center space-x-4 absolute top-1/2 transform -translate-y-1/2 right-4">
            <FaChevronRight
              size={24}
              className={`bg-black bg-opacity-50 text-white p-2 rounded-full p-1 hover:bg-opacity-75 cursor-pointer ${currentNewReleaseSeriesSlide === NewReleaseSeries.length - 1 ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={nextNewReleaseSeriesSlide}
              disabled={currentNewReleaseSeriesSlide === NewReleaseSeries.length - 1}
            />
          </div>
        </div>
      </div>

      {/* Movies Categories */}
        <div className="mt-20 mx-4 sm:mx-12 md:mx-20 lg:mx-32">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl">Movies Categories</h1>
                <p className="text-sm cursor-pointer text-gray-500">View more...</p>
            </div>
            <div className="flex overflow-x-auto mb-4">
                {categories.map((category) => (
                <button
                    key={category}
                    className={`py-2 px-4 mx-2 text-white rounded-full ${selectedCategory === category ? 'bg-red-600' : 'bg-gray-500'}`}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-5">
                {filteredMovies.map((RecommendedList) => (
                <Link to={`/details/recommended/${RecommendedList.id}`} key={RecommendedList.id} className="ml-5">
                    <img
                    src={RecommendedList.image}
                    alt={RecommendedList.Name}
                    className="h-96 max-w-96 border-b-gray-900 rounded-lg"
                    />
                    <div className="flex justify-between my-2">
                    <h1>{RecommendedList.Name}</h1>
                    <div className="flex gap-2">
                        <p className="border-b-gray-950 bg-red-600 px-1 rounded-lg">
                        {RecommendedList.quality}
                        </p>
                        <p>{RecommendedList.duration}</p>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>

    </div>
  );
}
