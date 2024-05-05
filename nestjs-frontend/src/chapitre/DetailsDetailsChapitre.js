import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ChapterDetailsDetails = () => {
  const navigate = useNavigate();
    const { chapterId, detailsChapitreId } = useParams();
    console.log(chapterId, detailsChapitreId); 
  const [chapter, setChapter] = useState(null);
  const [paragraphes, setParagraphes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chapterResponse = await apiClient.get(`/details-chapitres/chapitre/${chapterId}`);
        const paragraphesResponse = await apiClient.get(`/paragraphes/paragraphes/chapitre/${detailsChapitreId}`);
  
        const chapterData = await chapterResponse.data[0];
        
        const paragraphesData = await paragraphesResponse.data;
        
        // console.log(chapterData);
        setChapter(chapterData);
        setParagraphes(paragraphesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    fetchData();
  }, [chapterId, detailsChapitreId]);
                                               
  const terminateChapter = async () => {
    try {
        const response = await apiClient.post('/users-chapitre/', {
            idUser: 1, // Replace with the actual user ID
            idChapitre: chapterId,
        });
        // console.log(response);
        navigate('/liste-chapitres');
    } catch (error) {
        console.error('Error terminating chapter:', error);
        // Handle error (e.g., show an error message)
    }
  };

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{chapter.titre}</h2>
      <h5>Les paragraphes</h5>
      <ul>
        {paragraphes.map((paragraphes) => (
          <li key={paragraphes.idParagraphes}>
            {paragraphes.paragraphes}
          </li>
        ))}
      </ul>

      <button onClick={terminateChapter}>Terminate Chapter</button>
    </div>
  );
};

export default ChapterDetailsDetails;
