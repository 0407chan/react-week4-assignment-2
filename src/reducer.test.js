import reducer from './reducer';

import {
  updateInputText,
  addRestaurant,
} from './actions';

describe('reducer', () => {
  const initalRestaurants = [];
  const initalInputs = [
    { placeholder: '이름', value: '' },
    { placeholder: '분류', value: '' },
    { placeholder: '주소', value: '' },
  ];

  describe('undefined action', () => {
    it('changes nothing', () => {
      const { restaurants, inputs } = reducer();

      expect(restaurants).toStrictEqual(initalRestaurants);
      expect(inputs).toStrictEqual(initalInputs);
    });
  });

  describe('updateInputText', () => {
    it('changes input texts', () => {
      const newInputText = '마녀주방';
      const { placeholder } = initalInputs[0];

      const { inputs } = reducer({
        restaurants: initalRestaurants,
        inputs: initalInputs,
      }, updateInputText(placeholder, newInputText));

      expect(inputs[0].value).toBe('마녀주방');
    });
  });

  describe('addRestaurant', () => {
    it('add restaurant to restaurants', () => {
      const previousInputs = [
        { placeholder: '이름', value: '시카고피자' },
        { placeholder: '분류', value: '양식' },
        { placeholder: '주소', value: '이태원동' },
      ];

      const { restaurants } = reducer({
        restaurants: initalRestaurants,
        inputs: previousInputs,
      }, addRestaurant());

      expect(restaurants).toHaveLength(initalRestaurants.length + 1);
    });
  });
});
