import { useEffect } from 'react';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useLoggedIn from '@hooks/useLoggedIn';
import { toApiStatus } from '@models/api-status';
import { bookListAsync } from '@reducers/bookList';

const BookListPage = () => {
  const dispatch = useAppDispatch();
  const bookList = useAppSelector((state) => state.bookList);
  const { loginGuard } = useLoggedIn();

  const { loading, success, error } = toApiStatus(bookList.status);

  useEffect(() => {
    loginGuard();
  }, [loginGuard]);

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
