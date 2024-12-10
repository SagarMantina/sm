import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
  const [airingAnime, setAiringAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);

  useEffect(() => {

    AOS.init({ duration: 1000 }); 

    const fetchData = async () => {
      try {
        const airingResponse = await fetch('http://localhost:5000/api/airing');
        const airingData = await airingResponse.json();
        setAiringAnime(airingData);

        const upcomingResponse = await fetch('http://localhost:5000/api/upcoming');
        const upcomingData = await upcomingResponse.json();
        setUpcomingAnime(upcomingData);

        const popularResponse = await fetch('http://localhost:5000/api/popular');
        const popularData = await popularResponse.json();
        setPopularAnime(popularData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleCardClick = (animeId) => {
    console.log(animeId);
    navigate(`/anime/${animeId}`);
  };
  

  return (
    <div className='bg-black min-h-screen text-white m-0'>
      <nav className="flex justify-center space-x-4">
        <Link to='/'><p className='lg:text-3xl font-bold text-red-500 cursor-pointer sm:text-xl py-2'>ANIME MOOD</p></Link>
        <ul className='flex justify-center space-x-4 my-2 text-gray-400 text-md'>
          <li><Link to='/login' data-aos="fade-up">Login</Link></li>
          <li><Link to='/signup' data-aos="fade-up">Signup</Link></li>
          <li><Link to='/mood' data-aos="fade-up">Select Mood</Link></li>
        </ul>
      </nav>
      
      <div>
         <p className='lg:text-2xl font-bold text-center sm:text-sm' data-aos="fade-up">Anime Mood recommends trending anime and offers mood-based suggestions tailored for you.</p>
      </div>
      <div className='my-8 lg:h-1/3 sm:h-1/4' data-aos="fade-up">
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500' data-aos="fade-up">Airing</h1>
        </div>
        <div className='lg:flex m-2 sm:grid grid-cols-3 grid'>
          {airingAnime.map((anime) => (
            <Card key={`airing-${anime.mal_id}`} data={anime} onClick={() => handleCardClick(anime.mal_id)} />
          ))}
        </div>
      </div>

   

      <div className='my-8 lg:h-1/3 sm:h-1/4' data-aos="fade-up">
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500 ' data-aos="fade-up">Upcoming</h1>
        </div>
        <div className='lg:flex m-2 sm:grid grid-cols-3 grid'>
          {upcomingAnime.map((anime) => (
            <Card key={`upcoming-${anime.mal_id}`} data={anime} onClick={() => handleCardClick(anime.mal_id)} />
          ))}
        </div>
      </div>

      <div className='my-8 lg:h-1/3 sm:h-1/4' data-aos="fade-up">
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500' data-aos="fade-up">Popular</h1>
        </div>
        <div className='lg:flex m-2 sm:grid grid-cols-3 grid'>
          {popularAnime.map((anime) => (
            <Card key={`popular-${anime.mal_id}`} data={anime} onClick={() => handleCardClick(anime.mal_id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
