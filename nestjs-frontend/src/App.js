// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListChapters from './chapitre/ListChapitres';
import ChapterDetails from './chapitre/DetailsChapters';
import ChapterDetailsDetails from './chapitre/DetailsDetailsChapitre'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route exact path="/" component={ListChapters} /> */}
          <Route path="/liste-chapitres" element={<ListChapters />} />
          <Route path="/chapter-details/:chapterId" element={<ChapterDetails />} />
          <Route path="/chapter-details-details/:chapterId/:detailsChapitreId" element={<ChapterDetailsDetails />} />
          <Route path="/quiz-page" element={<ChapterDetailsDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
