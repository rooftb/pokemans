import React, { useEffect, useState, useContext } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
} from 'shards-react';
import { AppContext, AppProvider } from './AppContext';

export default function Pokemon(props) {
  const context = useContext(AppContext);

  const { details } = props;

  const [stats, setStats] = useState();

  const name = details.name.charAt(0).toUpperCase() + details.name.slice(1);

  useEffect(() => {
    fetch(details.url)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.log(err));
  }, [details.url]);

  return (
    <div>
      <Card
        style={{
          width: '200px',
          maxHeight: '292px',
        }}
        className='my-2 mx-2 p-3'
      >
        {stats && <CardImg top src={stats.sprites.front_default} alt={name} />}
        {stats && (
          <>
            <div className='d-flex justify-content-between'>
              <span>{stats.id}</span>
              <CardTitle className='mx-auto'>{name}</CardTitle>
            </div>
            <CardBody>
              <span>{stats.types[0].type.name}</span>
            </CardBody>
          </>
        )}
      </Card>
    </div>
  );
}
