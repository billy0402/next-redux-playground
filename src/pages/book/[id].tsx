import Form from '@components/Form';

const fieldConfigs = [
  {
    name: 'name',
    type: 'text',
    label: '書名',
    defaultValue: 'example',
    required: true,
  },
  {
    name: 'summary',
    type: 'text',
    label: '摘要',
    required: false,
  },
  {
    name: 'price',
    type: 'number',
    label: '價格',
    required: true,
  },
];

const BookDetailPage = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form fieldConfigs={fieldConfigs} onSubmit={onSubmit}>
      <input type='submit' />
    </Form>
  );
};

export default BookDetailPage;
