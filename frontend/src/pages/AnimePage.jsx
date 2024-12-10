import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AnimePage = () => {
  const [anime, setAnime] = useState(null);
  const { mal_id } = useParams();

  useEffect(() => {
    AOS.init({ duration: 1000 }); 

    const fetchAnimeDetails = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/anime/${id}`);
        const data = await response.json();

        console.log(data);
        setAnime(data.data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    if (mal_id) fetchAnimeDetails(mal_id);
  }, [mal_id]);

  if (!anime) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div
        className="relative h-[50vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900"></div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Anime Image */}
          <div
            className="flex-shrink-0 w-full md:w-1/3"
            data-aos="fade-up"
          >
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Anime Details */}
          <div
            className="flex-1 space-y-4"
            data-aos="fade-up"
          >
            <h1 className="text-4xl font-bold">{anime.title}</h1>
            <p className="text-sm text-gray-400">
              Aired: {anime.aired.string || 'Unknown'} | Episodes: {anime.episodes || 'Ongoing'} | Rating: {anime.rating || 'N/A'}
            </p>
            <p className="text-lg">{anime.synopsis}</p>

            {/* Genres */}
            {anime.genres && (
              <div>
                <h2 className="text-lg font-semibold">Genres</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-3 py-1 text-sm bg-gray-700 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer Button */}
            {anime.trailer?.url && (
              <a
                href={anime.trailer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition"
              >
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
