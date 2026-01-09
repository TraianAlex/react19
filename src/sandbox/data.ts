import { faker } from '@faker-js/faker';

export const products = new Array(12).fill(null).map(() => ({
  id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  material: faker.commerce.productMaterial(),
  price: faker.commerce.price(),
  department: faker.commerce.department(),
  quantity: faker.number.int({ min: 0, max: 100 }),
}));

const DATA = [
  {
    label: 'Elephant',
    value: 'elephant',
    name: 'animal-radio-group',
    imgSrc:
      'https://support.wwf.org.uk/sites/default/files/styles/product_list_image/public/product-images/elephanthero1.jpg?h=27eb9958&itok=2m7MQQlU',
  },
  {
    label: 'Cheetah',
    value: 'cheetah',
    name: 'animal-radio-group',
    imgSrc:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cheetah-running-high-res-stock-photography-1570205431.jpg?crop=0.676xw:1.00xh;0.0521xw,0&resize=640:*',
  },
  {
    label: 'Puppies',
    value: 'puppies',
    name: 'animal-radio-group',
    imgSrc:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg?crop=0.752xw:1.00xh;0.125xw,0&resize=640:*',
  },
  {
    label: 'Crow',
    value: 'crow',
    name: 'animal-radio-group',
    imgSrc:
      'https://cdn.theatlantic.com/assets/media/img/2019/01/31/0319_WEL_Andersen_lead/1920.jpg?1549576567',
  },
  {
    label: 'Owl',
    value: 'owl',
    name: 'animal-radio-group',
    imgSrc:
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Fox',
    value: 'fox',
    name: 'animal-radio-group',
    imgSrc:
      'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Hippo',
    value: 'hippo',
    name: 'animal-radio-group',
    imgSrc:
      'https://ichef.bbci.co.uk/news/660/cpsprodpb/F76F/production/_101934336_hi001487062.jpg',
  },
];

export default DATA;
