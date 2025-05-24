import React from 'react';

const BookDetail = ({ book }) => {
  if (!book) return <div>No hay detalles del libro disponibles.</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Autor: {book.author}</p>
      <p>Estado: {book.status}</p>
      <p>Fecha de Inicio: {book.startDate}</p>
      <p>Fecha de Fin: {book.endDate}</p>
      <p>Comentario: {book.comment}</p>
    </div>
  );
};

export default BookDetail;
