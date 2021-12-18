import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface Offset {
  bottom: number;
  left: number;
  zIndex: number;
}

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomInputValue = () => {
  const length = randomIntFromInterval(1, 25);
  let inputValue = '';
  for (let i = 0; i < length; i++) {
    inputValue += randomIntFromInterval(1, 2) === 1 ? 'e' : 'gg';
  }
  return inputValue;
};

const getLayers = (value: string) => {
  const valueAsArray = value.split('');
  const excludedIndexes: number[] = [];
  const layers = valueAsArray.reduce((acc: string[], curr, index, arr) => {
    if (excludedIndexes.includes(index)) {
      return acc;
    }

    if (curr === 'e') {
      return [...acc, 'e'];
    }

    if (curr === 'g' && arr[index + 1] === 'g') {
      excludedIndexes.push(index + 1);
      return [...acc, 'gg'];
    }

    return acc;
  }, []);

  return layers;
};

const E: React.FC<Offset> = ({ bottom, left, zIndex }) => {
  const [hide, setHide] = useState<0 | undefined>(undefined);
  return (
    <div
      className={styles.e}
      style={{ bottom, left, zIndex, opacity: hide }}
      onMouseEnter={() => setHide(0)}
      onMouseLeave={() => setHide(undefined)}
    />
  );
};

const Gg: React.FC<Offset> = ({ bottom, left, zIndex }) => {
  const [hide, setHide] = useState<0 | undefined>(undefined);

  return (
    <div
      className={styles.gg}
      style={{ bottom, left, zIndex, opacity: hide }}
      onMouseEnter={() => setHide(0)}
      onMouseLeave={() => setHide(undefined)}
    />
  );
};

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('egg');
  const [error, setError] = useState('');

  return (
    <div className={styles.container}>
      <div>
        <input
          onChange={(e) => {
            if (e.target.value.match(/[abcdfhijklmnopqrstuvwxyz0-9]/g)) {
              setError(e.target.value[e.target.value.length - 1]);
              return;
            }
            setError('');
            return setInputValue(e.target.value);
          }}
          value={inputValue}
          className={styles.input}
          placeholder="How do you like your egg?"
        />
        <button
          onClick={() => {
            return setInputValue(getRandomInputValue());
          }}
        >
          Random egg
        </button>
      </div>

      <div className={styles.error}>
        {error !== '' ? `There is no "${error}" in "egg"` : null}
      </div>

      <div className={styles.eggContainer}>
        {getLayers(inputValue).map((el, index) => {
          if (el === 'e') {
            return (
              <E bottom={index * 20} left={index * 20} zIndex={index * 20} />
            );
          } else
            return (
              <Gg bottom={index * 20} left={index * 20} zIndex={index * 20} />
            );
        })}
      </div>
      <a href="https://twitter.com/vickiheart/status/1471917945630515205">
        Source
      </a>
    </div>
  );
};

export default Home;
