import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface Offset {
  bottom: number;
  left: number;
  zIndex: number;
  deconstruct: boolean;
}

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomInputValue = () => {
  const length = randomIntFromInterval(1, 20);
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

const E: React.FC<Offset> = ({ bottom, left, zIndex, deconstruct }) => {
  const [hide, setHide] = useState(false);
  return (
    <div
      className={`${styles.e} ${hide ? styles.hideLayer : undefined} ${
        deconstruct ? styles.deconstruct : undefined
      }`}
      style={{ bottom, left, zIndex }}
      onMouseEnter={() => setHide(true)}
      onMouseLeave={() => setHide(false)}
    />
  );
};

const Gg: React.FC<Offset> = ({ bottom, left, zIndex, deconstruct }) => {
  const [hide, setHide] = useState(false);

  return (
    <div
      className={`${styles.gg} ${hide ? styles.hideLayer : undefined} ${
        deconstruct ? styles.deconstruct : undefined
      }`}
      style={{ bottom, left, zIndex }}
      onMouseEnter={() => setHide(true)}
      onMouseLeave={() => setHide(false)}
    />
  );
};

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('egg');
  const [error, setError] = useState('');
  const [deconstruct, setDeconstruct] = useState(false);

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

      <div
        className={`${styles.eggContainer} ${
          deconstruct ? styles.eggContainerDeconstruct : undefined
        }`}
      >
        {getLayers(inputValue).map((el, index) => {
          if (el === 'e') {
            return (
              <E
                bottom={index * 20}
                left={index * 20}
                zIndex={index * 20}
                deconstruct={deconstruct}
              />
            );
          } else
            return (
              <Gg
                bottom={index * 20}
                left={index * 20}
                zIndex={index * 20}
                deconstruct={deconstruct}
              />
            );
        })}
      </div>
      <footer className={styles.footer}>
        <div>
          <a href="https://twitter.com/vickiheart/status/1471917945630515205">
            Inspiration
          </a>{' '}
          <a href="https://github.com/mathieu-anderson/egg">Source</a>
        </div>
        <div
          className={`${deconstruct ? styles.deconstructed : undefined} ${
            styles.deconstructButton
          }`}
        >
          <input
            type="checkbox"
            id="deconstruct"
            name="deconstruct"
            onClick={() => setDeconstruct(!deconstruct)}
          />
          <label htmlFor="deconstruct">Deconstruct</label>
        </div>
      </footer>
    </div>
  );
};

export default Home;
