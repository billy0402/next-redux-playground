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
    required: false,
  },
  {
    name: 'price',
    type: 'number',
    label: '價格',
    required: true,
  },
];

export { bookFieldConfigs };
