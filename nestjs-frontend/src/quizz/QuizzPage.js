import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const QuizzPage = () => {
    const { chapterId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Stockez les réponses sélectionnées sous forme d'objet
    const [selectedVraie, setSelectedVraie] = useState({}); // Stockez les réponses sélectionnées sous forme d'objet
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await apiClient.get(`/quizz/quizzParChapitre/1/${chapterId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement du quiz :', error);
            }
        };

        fetchQuiz();
    }, [chapterId]);

    const handleSelection = (questionId, responseId, thirdValue) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: responseId
        }));
    
        setSelectedVraie(prevState => ({
            ...prevState,
            [questionId]: thirdValue
        }));
    };
    

    const handleSubmit = async () => {
        if (!quiz || Object.keys(selectedAnswers).length === 0) return;
    
        const submission = {
            idQuizz: quiz.note.id_quizz,
            idUser: quiz.note.id_user,
            data: Object.entries(selectedAnswers).map(([questionId, responseId]) => ({
                idQuestion: parseInt(questionId),
                estVraie: selectedVraie[questionId],
                idReponse: responseId
            }))
        };

        try {
            const response = await apiClient.post('/users-quizz/reponseQuizz', JSON.stringify(submission), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Soumission réussie:', response.data);
            // Réinitialiser l'état des réponses sélectionnées après la soumission réussie si nécessaire
            setSelectedAnswers({});
            setSelectedVraie({});
            navigate("/liste-chapitres");
        } catch (error) {
            console.error('Erreur lors de la soumission du quiz :', error);
            // Gérer les erreurs de soumission ici
        }

    };
    

    if (!quiz) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h2>Détails du Quiz</h2>
            <h5>Score avant cette session : {quiz.note.score}</h5>
            <button onClick={handleSubmit}>Soumettre le Quiz</button>
            <ul>
                {quiz.quizz.map((questionItem, index) => (
                    <li key={index}>
                        <p>{questionItem.questions.questions}</p>
                        {questionItem.reponses.map((response, responseIndex) => (
                            <div key={responseIndex}>
                                <input
                                  
                                    type="radio"
                                    id={`response-${index}-${responseIndex}`}
                                    name={`question-${index}`}
                                    value={response.id_reponses_questions}
                                    checked={selectedAnswers[questionItem.questions.id_questions_quizz] === response.id_reponses_questions}
                                    onChange={() => handleSelection(questionItem.questions.id_questions_quizz, response.id_reponses_questions,  response.est_vraie)}
                                />
                                <label htmlFor={`response-${index}-${responseIndex}`}>{response.reponses}</label>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizzPage;