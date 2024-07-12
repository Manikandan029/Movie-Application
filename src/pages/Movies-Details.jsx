import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewRelease from '../data/new-release';
import NewReleaseSeries from '../data/new-Release-Series';
import Recommended from '../data/Recommended';
import Video from '../assets/video-Home.mp4';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { RiArrowRightSFill } from 'react-icons/ri';
import AlsoRecommended from '../data/Also-Recommended';
import Image1 from '../assets/users/user1.avif';
import Image2 from '../assets/users/user2.avif';
import Image3 from '../assets/users/user3.avif';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

export default function Details() {
  const { category, id } = useParams();
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Shuffle the recommended movies array
    shuffleRecommendedMovies();
  }, [id]); // Re-shuffle whenever the `id` changes

  let movie;
  if (category === 'new-release') {
    movie = NewRelease.find((movie) => movie.id === id);
  } else if (category === 'new-release-series') {
    movie = NewReleaseSeries.find((movie) => movie.id === id);
  } else if (category === 'recommended') {
    movie = Recommended.find((movie) => movie.id === id);
  } else if (category === 'Also-Recommented') {
    movie = AlsoRecommended.find((movie) => movie.id === id);
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  // Function to shuffle the recommended movies array
  const shuffleRecommendedMovies = () => {
    const shuffled = [...AlsoRecommended].sort(() => Math.random() - 0.5);
    setRecommendedMovies(shuffled);
  };

  return (
    <section className="Details">
      {/* video Section */}
      <section className="Video">
        <div className="mx-20 h-96 my-10 mt-20">
          <video className="w-full h-full" controls src={Video} type="video/mp4"></video>
        </div>
      </section>

      {/* details section */}
      <section className="Movie-Details mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div className="mt-20 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
          <div className="justify-end ml-4 md:ml-40 mx-auto md:mx-0 mb-6 md:mb-0 max-w-96">

              <img
                src={movie.image}
                alt={movie.Name}
                className="h-96 max-w-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:ml-10">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">{movie.Name}</h1>
            </div>
            <div className="mt-4 md:mt-6">
              <ul className="flex flex-wrap gap-4">
                {movie.Gendre.split(',').map((genre, index) => (
                  <li key={index} className="border bg-red-500 border-gray-800 px-2 py-1 pt-1 mr-2 rounded-lg">
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 md:mt-6">
              <ul className="flex gap-8">
                <li className="flex items-center">
                  <FaRegCalendarAlt className="mr-2" />
                  {movie.date_Release}
                </li>
                <li className="flex items-center">
                  <IoIosTimer className="mr-2" />
                  {movie.duration}
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <p className="text-sm md:text-base">{movie.details}</p>
            </div>
            <div className="mt-6">
              <ol className="space-y-2">
                <li>Country: {movie.country}</li>
                <li>Genre: {movie.Gendre}</li>
                <li>Date: {movie.date_Release}</li>
                <li>Cast: {movie.caste}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>




      {/* series section */}
      <section className="Sereis-episodes">
        {category === 'new-release-series' && (
          <div className="items-center justify-center ">
            <ul className="grid grid-cols-2 mx-24 px-20 my-10 gap-3 ">
              <li className=" episode-item ">
                <RiArrowRightSFill className="mt-1 mr-2 text-2xl" />
                Episode 1
              </li>
              <li className=" episode-item">
                <RiArrowRightSFill className="mt-1 mr-2 text-2xl" />
                Episode 2
              </li>
              <li className=" episode-item">
                <RiArrowRightSFill className="mt-1 mr-2 text-2xl" />
                Episode 3
              </li>
              <li className=" episode-item">
                <RiArrowRightSFill className="mt-1 mr-2 text-2xl" />
                Episode 4
              </li>
              <li className=" episode-item">
                <RiArrowRightSFill className="mt-1 mr-2 text-2xl" />
                Episode 5
              </li>
              <li className=" episode-item">
                <RiArrowRightSFill className="mt-1 mr-2 text-2xl" />
                Episode 6
              </li>
            </ul>
          </div>
        )}
      </section>

      {/* also recommended */}
      <section className="mt-20 mx-4 sm:mx-12 md:mx-20 lg:mx-36">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl">Recommended Movies</h1>
          {/* Optionally add a "View more..." link here */}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {recommendedMovies && recommendedMovies.length > 0 ? (
            recommendedMovies.map((RecommendedList) => (
              <Link to={`/details/Also-Recommented/${RecommendedList.id}`} key={RecommendedList.id}>
                <div className="relative">
                  <img
                    src={RecommendedList.image}
                    alt={RecommendedList.Name}
                    className="h-96 w-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="flex justify-between">
                    <h2 className="text-lg font-bold mb-2 mt-2 ">{RecommendedList.Name}</h2>
                    <div className="flex gap-2 mt-1">
                      <p className="text-sm mb-1 my-3">{RecommendedList.duration}</p>
                      <p className="bg-red-600 px-2 py-1 rounded-lg mt-2">{RecommendedList.quality}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-lg text-gray-500">Not Found!</div>
          )}
        </div>
      </section>

      {/* Comments Section */}
      <section className="">
        <h1 className="text-2xl mb-16 my-10 text-center">Comments</h1>
        <div className="space-y-5 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row mx-4 md:mx-10 lg:mx-36 gap-7">
            <div className="mx-auto md:mx-0 mb-4 md:mb-0">
              <img src={Image1} alt="" className="h-28 w-24 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <p>Scorlet</p>
              <p>11/7/2024</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, temporibus.
              </p>
              <div className="flex gap-6">
                <BiSolidLike />
                <BiSolidDislike />
                <p>Reply</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mx-4 md:mx-10 lg:mx-36 gap-7">
            <div className="mx-auto md:mx-0 mb-4 md:mb-0">
              <img src={Image2} alt="" className="h-28 w-24 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <p>Scorlet</p>
              <p>11/7/2024</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, temporibus.
              </p>
              <div className="flex gap-6">
                <BiSolidLike />
                <BiSolidDislike />
                <p>Reply</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mx-4 md:mx-10 lg:mx-36 gap-7">
            <div className="mx-auto md:mx-0 mb-4 md:mb-0">
              <img src={Image3} alt="" className="h-28 w-24 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <p>Scorlet</p>
              <p>11/7/2024</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, temporibus.
              </p>
              <div className="flex gap-6">
                <BiSolidLike />
                <BiSolidDislike />
                <p>Reply</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
