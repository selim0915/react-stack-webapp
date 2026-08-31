import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import APIs from '../../../apis';
import { Title } from '../../../components/commons';
import { RootState } from '../../../store';
import { asyncIncrease, decrease, increase, setCounter } from '../../../store/slices/counterSlice';
import { ProductType } from '../../../types/core.type';

const TestPage: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.counter);
  const isLoading = useSelector((state: RootState) => state.counter.request);
  const [productList, setProductList] = useState<ProductType[]>([]);

  const handleIncrease = () => {
    dispatch(increase());
  };

  const handleAsyncIncrease = () => {
    dispatch(asyncIncrease({ url: '/async-increase' }));
  };

  const handleDecrease = () => {
    dispatch(decrease());
  };

  const handleReset = () => {
    dispatch(setCounter(0));
  };

  useEffect(() => {
    APIs.Product.getProducts()
      .then((data) => {
        setProductList(data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Product API Error:', err.message);
      });
  }, []);

  return (
    <>
      <Title>API 테스트</Title>

      <div>
        <p id="counter" className="text-2xl">
          {count}
        </p>

        {isLoading && <div>Loading...</div>}

        <button
          type="button"
          id="btn-increase"
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={handleIncrease}
        >
          Increase
        </button>
        <button
          type="button"
          id="btn-async-increase"
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={handleAsyncIncrease}
        >
          Async Increase
        </button>
        <button
          type="button"
          id="btn-decrease"
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={handleDecrease}
        >
          Decrease
        </button>
        <button
          type="button"
          id="btn-reset"
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {productList.map((item, index) => {
        const idx = `${item}-${index}`;
        return (
          <ul key={idx}>
            <li>{item.name}</li>
            <li>{item.description}</li>
            <li>{item.price}</li>
          </ul>
        );
      })}
    </>
  );
};

export default TestPage;
