import React, { useState, useEffect } from 'react';
import { saveBook } from '../api/bookApi';

const AddEditBookForm = ({ book, onSave, onCancel }) => {
  const [title, setTitle] = useState(book ? book.title : '');
  const [author, setAuthor] = useState(book ? book.author : '');
  const [status, setStatus] = useState(book ? book.status : 'leyendo');
  const [startDate, setStartDate] = useState(book ? book.startDate : '');
  const [endDate, setEndDate] = useState(book ? book.endDate : '');
  const [comment, setComment] = useState(book ? book.comment : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, status, startDate, endDate, comment };
    await saveBook(newBook);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="leyendo">Leyendo</option>
        <option value="completado">Completado</option>
        <option value="por leer">Por Leer</option>
      </select>
      <input type="date" placeholder="Fecha de Inicio" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" placeholder="Fecha de Fin" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <textarea placeholder="Comentario" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default AddEditBookForm;
