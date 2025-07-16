import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const orders = [...Array(30)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  pharmacy: faker.company.name(),
  paymentMethod: 'LifeLine Subscription',
  date: '31-07-2024',
  medication: 'Ibuprofen',
  status: sample(['success', 'rejected', 'pending']),
}));
