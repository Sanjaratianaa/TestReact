// AddChapter.js
import React, { useState } from 'react';
import apiClient from '../apiClient';

const AddChapter = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiClient.post('/api/chapitres', { title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Chapter Title"
      />
      <button type="submit">Add Chapter</button>
    </form>
  );
};

export default AddChapter;
