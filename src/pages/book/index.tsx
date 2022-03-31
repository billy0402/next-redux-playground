import { useEffect } from 'react';

import Link from 'next/link';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useLoggedIn from '@hooks/useLoggedIn';
import { toApiStatus } from '@models/api-status';
import { authorListAsync } from '@reducers/authorList';
import { bookListAsync } from '@reducers/bookList';
import { classificationListAsync } from '@reducers/classificationList';
import { publisherListAsync } from '@reducers/publisherList';
import { tagListAsync } from '@reducers/tagList';

const BookListPage = () => {
  const dispatch = useAppDispatch();
  const bookList = useAppSelector((state) => state.bookList);
  const authorList = useAppSelector((state) => state.authorList);
  const publisherList = useAppSelector((state) => state.publisherList);
  const classificationList = useAppSelector(
    (state) => state.classificationList,
  );
  const tagList = useAppSelector((state) => state.tagList);
  const { loginGuard } = useLoggedIn();

  const { loading, success, error } = toApiStatus(bookList.status);
  const {
    loading: authorListLoading,
    success: authorListSuccess,
    error: authorListError,
  } = toApiStatus(authorList.status);
  const {
    loading: publisherListLoading,
    success: publisherListSuccess,
    error: publisherListError,
  } = toApiStatus(publisherList.status);
  const {
    loading: classificationListLoading,
    success: classificationListSuccess,
    error: classificationListError,
  } = toApiStatus(classificationList.status);
  const {
    loading: tagListLoading,
    success: tagListSuccess,
    error: tagListError,
  } = toApiStatus(tagList.status);

  useEffect(() => {
    loginGuard();
  }, [loginGuard]);

  useEffect(() => {
    dispatch(bookListAsync());
    dispatch(authorListAsync());
    dispatch(publisherListAsync());
    dispatch(classificationListAsync());
    dispatch(tagListAsync());
  }, [dispatch]);

  if (
    loading ||
    authorListLoading ||
    publisherListLoading ||
    classificationListLoading ||
    tagListLoading
  )
    return <p>Loading...</p>;

  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      {error && <p>{bookList.error.message}</p>}
      <button>
        <Link href='/book/create'>New</Link>
      </button>
      {success && bookList.data && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Summary</th>
              <th>Price</th>
              <th>Authors</th>
              <th>Publisher</th>
              <th>Classification</th>
              <th>Tags</th>
            </tr>
          </thead>

          <tbody>
            {bookList.data.map((book) => (
              <tr key={book.id}>
                <td>
                  <Link href={`/book/${book.id}`}>
                    <a>{book.id}</a>
                  </Link>
                </td>
                <td>{book.name}</td>
                <td>{book.summary}</td>
                <td>{book.price}</td>
                <td>
                  {
                    authorList.data.find((author) =>
                      book.authors.includes(author.id),
                    )?.name
                  }
                </td>
                <td>
                  {
                    publisherList.data.find(
                      (publisher) => publisher.id === book.publisher,
                    )?.name
                  }
                </td>
                <td>
                  {
                    classificationList.data.find(
                      (classification) =>
                        classification.id === book.classification,
                    )?.name
                  }
                </td>
                <td>
                  {tagList.data.find((tag) => book.tags.includes(tag.id))?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BookListPage;
