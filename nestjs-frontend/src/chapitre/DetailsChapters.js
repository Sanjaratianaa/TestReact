import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ChapterDetails = () => {
    const { chapterId } = useParams(); // Extract chapterId from URL parameters
    console.log(chapterId);
  const [details, setDetails] = useState(null);
  const [chapitre, setChapitre] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/chapitres/${chapterId}`);
        const chapterResponse = await apiClient.get(`/details-chapitres/chapitre/${chapterId}`);
        const chapterData = await chapterResponse.data;
        
        setChapitre(response.data);
        console.log(response.data);
        setDetails(chapterData);

        // Fetch quiz data related to the chapter
        const quizResponse = await apiClient.get(`/quizz/quizzParChapitre/1/${chapterId}`);
        setQuiz(quizResponse.data); // Assuming the response data is the quiz object
        console.log(quizResponse)
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    fetchData();
  }, [chapterId]);
                                                                                                                                                                                                  

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{chapitre.chapitre}</h2>
      <h5>Les paragraphes</h5>
      <ul>
        {details.map((chapter) => (
          <li key={chapter.idDetailsChapitre}>
            {chapter.titre}
            <Link to={`/chapter-details-details/${chapitre.idChapitre}/${chapter.idDetailsChapitre}`}>View Details</Link>

          </li>
        ))}
      </ul>
      {/* Display quiz data here */}
            {/* Example: Displaying the first question */}
            {/* {quiz && quiz.questions && quiz.questions.length > 0 && (
              <Link to="/quiz-page">Voulez-vous vous testez?</Link>
              <p>Votre score actuelle est : </p>
            )} */}
    </div>
  );
};

export default ChapterDetails;
