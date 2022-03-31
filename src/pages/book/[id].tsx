import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Form, { FieldConfig } from '@components/Form';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { setDefaultValues } from '@lib/form';
import { bookFieldConfigs } from '@lib/form-configs/book';
import { toApiStatus } from '@models/api-status';
import { bookDetailAsync, bookDetailReset } from '@reducers/bookDetail';

const BookDetailPage = () => {
  const dispatch = useAppDispatch();
  const bookDetail = useAppSelector((state) => state.bookDetail);
  const { loading, success, error } = toApiStatus(bookDetail.status);
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady || id === 'create') return;
    dispatch(bookDetailAsync(id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router.isReady]);

  useEffect(() => {
    if (id === 'create') {
      setFieldConfigs(bookFieldConfigs);
      return;
    }

    if (!bookDetail.data) return;
    const newConfigs = setDefaultValues(bookFieldConfigs, bookDetail.data);
    setFieldConfigs(newConfigs);
  }, [bookDetail.data, id]);

  useEffect(() => {
    return () => {
      dispatch(bookDetailReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Link href='/book'>List</Link>
      <Form fieldConfigs={fieldConfigs} onSubmit={onSubmit}>
        <input type='submit' />
      </Form>
    </>
  );
};

export default BookDetailPage;
