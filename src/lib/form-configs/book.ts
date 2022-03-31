import { FieldConfig } from '@components/Form';

const bookFieldConfigs: FieldConfig[] = [
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
    required: true,
  },
  {
    name: 'price',
    type: 'number',
    label: '價格',
    required: true,
  },
  {
    name: 'authors',
    type: 'select',
    label: '作者',
    required: true,
    multiple: true,
  },
  {
    name: 'publisher',
    type: 'select',
    label: '出版社',
    required: true,
  },
  {
    name: 'classification',
    type: 'select',
    label: '分類',
    required: true,
  },
  {
    name: 'tags',
    type: 'select',
    label: '標籤',
    required: true,
    multiple: true,
  },
];

export { bookFieldConfigs };
