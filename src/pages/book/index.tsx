import { useEffect } from 'react';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { bookListAsync } from '@reducers/bookList';
import { toApiStatus } from '@models/api-status';

const BookListPage = () => {
  const dispatch = useAppDispatch();
  const bookList = useAppSelector((state) => state.bookList);

  const { loading, success, error } = toApiStatus(bookList.status);

  useEffect(() => {
    dispatch(bookListAsync());
  }, [dispatch]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{bookList.error.message}</p>}
      {success && bookList.data && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Summary</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {bookList.data.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.summary}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BookListPage;
