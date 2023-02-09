import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const category = categoryId ? `category=${categoryId}` : '';

    setIsLoading(true);
    fetch(
      `https://63e550674474903105fdb431.mockapi.io/collections?page=${page}&limit=3&${category}`,
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={i}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(value.toLowerCase()))
            .map((obj, i) => <Collection key={i} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''} key={i}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
