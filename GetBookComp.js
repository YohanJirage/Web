import React, { useState } from 'react';

function GetBookComp() {
  const [bookId, setBookId] = useState('');
  const [bookInfo, setBookInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchBookInfo = async () => {
    try {
      const response = await fetch(`http://training.object.co.in/api/book/getbook?Id=${bookId}`);
      const data = await response.json();

      if (data) {
        setBookInfo(data);
        setErrorMessage('');
      } else {
        setBookInfo(null);
        setErrorMessage('No book found with the given ID.');
      }
    } catch (error) {
      setBookInfo(null);
      setErrorMessage('An error occurred while fetching the book information.');
    }
  };

  return (
    <div>
      <h2>Get Book Information</h2>
      <div>
        <label htmlFor="bookId">Book ID:</label>
        <input
          type="text"
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
      </div>
      <button onClick={fetchBookInfo}>Get Book</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {bookInfo && (
        <div>
          <h3>Book Information:</h3>
          <p>Title: {bookInfo.Title}</p>
          <p>Publication: {bookInfo.Publication}</p>
          <p>Price: {bookInfo.Price}</p>
        </div>
      )}
    </div>
  );
}

export default GetBookComp;