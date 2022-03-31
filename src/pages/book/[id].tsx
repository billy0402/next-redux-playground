import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Form, { FieldConfig } from '@components/Form';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { setDefaultValues } from '@lib/form';
import { bookFieldConfigs } from '@lib/form-configs/book';
import { toApiStatus } from '@models/api-status';
import { authorListAsync } from '@reducers/authorList';
import {
  bookCreateAsync,
  bookDetailAsync,
  bookDetailReset,
} from '@reducers/bookDetail';
import { classificationListAsync } from '@reducers/classificationList';
import { publisherListAsync } from '@reducers/publisherList';
import { tagListAsync } from '@reducers/tagList';

const BookDetailPage = () => {
  const dispatch = useAppDispatch();
  const bookDetail = useAppSelector((state) => state.bookDetail);
  const authorList = useAppSelector((state) => state.authorList);
  const publisherList = useAppSelector((state) => state.publisherList);
  const classificationList = useAppSelector(
    (state) => state.classificationList,
  );
  const tagList = useAppSelector((state) => state.tagList);
  const { loading, success, error } = toApiStatus(bookDetail.status.detail);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = toApiStatus(bookDetail.status.create);
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
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady || id === 'create') return;
    dispatch(bookDetailAsync(id as string));
    dispatch(authorListAsync());
    dispatch(publisherListAsync());
    dispatch(classificationListAsync());
    dispatch(tagListAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router.isReady]);

  const setOptions = (fieldConfigs: FieldConfig[]) => {
    const newConfigs = fieldConfigs;
    newConfigs.find((config) => config.name === 'authors')!.options =
      authorList.data.map((author) => ({
        label: author.name,
        value: author.id,
      }));
    newConfigs.find((config) => config.name === 'publisher')!.options =
      publisherList.data.map((publisher) => ({
        label: publisher.name,
        value: publisher.id,
      }));
    newConfigs.find((config) => config.name === 'classification')!.options =
      classificationList.data.map((classification) => ({
        label: classification.name,
        value: classification.id,
      }));
    newConfigs.find((config) => config.name === 'tags')!.options =
      tagList.data.map((tag) => ({
        label: tag.name,
        value: tag.id,
      }));
    return newConfigs;
  };

  useEffect(() => {
    if (id === 'create') {
      setFieldConfigs(setOptions(bookFieldConfigs));
      return;
    }

    if (!bookDetail.data) return;
    const newConfigs = setOptions(
      setDefaultValues(bookFieldConfigs, bookDetail.data),
    );
    setFieldConfigs(newConfigs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookDetail.data, id]);

  useEffect(() => {
    return () => {
      dispatch(bookDetailReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any) => {
    dispatch(bookCreateAsync(data));
  };

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
      <Link href='/book'>List</Link>
      <Form fieldConfigs={fieldConfigs} onSubmit={onSubmit}>
        <input type='submit' />
      </Form>
    </>
  );
};

export default BookDetailPage;
