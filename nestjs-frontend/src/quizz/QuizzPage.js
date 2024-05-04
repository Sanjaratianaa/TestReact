import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient'; // Assurez-vous que le chemin d'importation est correct
import { useParams } from 'react-router-dom';

const QuizzPage = () => {
    const { chapterId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await apiClient.get(`/quizz/quizzParChapitre/1/${chapterId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement du quiz:', error);
            }
        };

        fetchQuiz();
    }, [chapterId]);

    const handleSelection = (questionId, responseId) => {
        setSelectedAnswers(prevState => ({
          ...prevState,
            [questionId]: responseId
        }));
    };

    const handleSubmit = async () => {
        if (!quiz ||selectedAnswers) return;

        const submission = {
            idQuizz: quiz.note.id_quizz,
            idUser: quiz.note.id_user,
            data: Object.entries(selectedAnswers).map(([questionId, responseId]) => ({
                idQuestion: parseInt(questionId),
                estVraie: quiz.quizz.find(q => q.questions.id_questions_quizz === parseInt(questionId)).est_vraie, // Utilisez l'attribut est_vraie pour chaque question
                idReponse: responseId
            }))
        };

        console.log(submission);

        // Soumettre les données
        try {
            const response = await apiClient.post('/submit-quiz', submission);
            console.log('Quiz soumis avec succès:', response.data);
            // Gérer le succès, par exemple, afficher un message ou rediriger
        } catch (error) {
            console.error('Erreur lors de la soumission du quiz:', error);
            // Gérer l'erreur, par exemple, afficher un message d'erreur
        }
    };

    if (!quiz) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h2>Détails du Quiz</h2>
            <h5>Score avant la session: {quiz.note.score}</h5>
            <button onClick={handleSubmit}>Soumettre le Quiz</button>
            <ul>
                {quiz.quizz.map((questionItem, index) => (
                    <li key={index}>
                        <p>{questionItem.questions.questions}</p>
                        {questionItem.reponses.map((response, responseIndex) => (
                            <div key={responseIndex}>
                                <input
                                    type="radio"
                                    id={`option-${responseIndex}`}
                                    name={`question-${index}`}
                                    value={response.idReponses}
                                    checked={selectedAnswers[index] === response.idReponses}
                                    onChange={() => handleSelection(index, response.idReponses)}
                                />
                                <label htmlFor={`option-${responseIndex}`}>{response.reponses}</label>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizzPage;
