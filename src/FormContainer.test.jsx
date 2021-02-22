import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';
import FormContainer from './FormContainer';

import { changeInput, addRestaurant } from './actions';

jest.mock('react-redux');

describe('FormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    useSelector.mockImplementation((selector) => selector({
      restaurantInformation: {
        title: '',
        category: '',
        address: '',
      },
    }));

    useDispatch.mockImplementation(() => dispatch);
  });

  function renderFormConatainer() {
    return render(<FormContainer />);
  }

  it('renders inputs', () => {
    const { queryByPlaceholderText } = renderFormConatainer();

    expect(queryByPlaceholderText('이름')).not.toBeNull();
    expect(queryByPlaceholderText('분류')).not.toBeNull();
    expect(queryByPlaceholderText('주소')).not.toBeNull();
  });

  it('listens name input change event', () => {
    const { getByPlaceholderText } = renderFormConatainer();

    fireEvent.change(getByPlaceholderText('이름'), {
      target: {
        name: 'title',
        value: '마녀주방',
      },
    });

    expect(dispatch).toBeCalledWith(changeInput({
      name: 'title',
      value: '마녀주방',
    }));
  });

  it('listens category input change event', () => {
    const { getByPlaceholderText } = renderFormConatainer();

    fireEvent.change(getByPlaceholderText('분류'), {
      target: {
        name: 'category',
        value: '한식',
      },
    });

    expect(dispatch).toBeCalledWith(changeInput({
      name: 'category',
      value: '한식',
    }));
  });

  it('listens address input change event', () => {
    const { getByPlaceholderText } = renderFormConatainer();

    fireEvent.change(getByPlaceholderText('분류'), {
      target: {
        name: 'address',
        value: '서울시 강남구',
      },
    });

    expect(dispatch).toBeCalledWith(changeInput({
      name: 'address',
      value: '서울시 강남구',
    }));
  });

  it('renders "등록" button', () => {
    const { queryByText } = renderFormConatainer();

    expect(queryByText('등록')).not.toBeNull();
  });

  it('listens click event', () => {
    const { queryByText, getByPlaceholderText } = renderFormConatainer();

    fireEvent.change(getByPlaceholderText('이름'), {
      target: {
        name: 'title',
        value: '마녀주방',
      },
    });

    fireEvent.change(getByPlaceholderText('분류'), {
      target: {
        name: 'category',
        value: '한식',
      },
    });

    fireEvent.change(getByPlaceholderText('주소'), {
      target: {
        name: 'address',
        value: '서울시 강남구',
      },
    });

    fireEvent.click(queryByText('등록'));

    expect(dispatch).toBeCalledWith(addRestaurant());
  });
});