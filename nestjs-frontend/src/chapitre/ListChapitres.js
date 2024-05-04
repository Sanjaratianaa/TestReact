import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient';
import { Link } from 'react-router-dom';

const ListChapters = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await apiClient.get('/chapitres');
      setChapters(response.data);
    };
    console.log("chapitres");

    fetchChapters();
  }, []);

  return (
    <div>
      <h2>Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.idChapitre}>
            {chapter.chapitre}
            <Link to={`/chapter-details/${chapter.idChapitre}`}>View Details</Link>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListChapters;
