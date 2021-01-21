import React, { useEffect, useState, useContext } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from 'shards-react';
import { AppContext, AppProvider } from './AppContext';

export default function Pokemon(props) {
  const context = useContext(AppContext);

  const { details } = props;

  const [stats, setStats] = useState();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();

  const name = details.name.charAt(0).toUpperCase() + details.name.slice(1);

  const realFeet = (stats.height * 0.328084).toFixed(2);

  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);

  useEffect(() => {
    fetch(details.url)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.log(err));
  }, [details.url]);

  function toggleModal() {
    setModal(!modal);
    fetch(stats.species.url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  if (!stats || !data) {
    return null;
  }

  return (
    <div key={details.id}>
      <Modal open={modal} toggle={toggleModal}>
        <ModalHeader className='row d-flex justify-content-between'>
          <span
            className='mr-3'
            style={{
              fontSize: '1rem',
              fontWeight: '300',
              color: '#5a6169',
            }}
          >
            No. {stats.id}{' '}
          </span>
          {name}
        </ModalHeader>
        <ModalBody>
          <div className='row justify-content-around'>
            <img
              className='col-md'
              style={{ height: '250px', maxWidth: '200px' }}
              // prettier-ignore
              src={stats.sprites.other.dream_world.front_default}
            />
            <div className='col-md'>
              {stats.types[0].type.name}
              {stats.types[1] && <span> / {stats.types[1].type.name}</span>}
              {stats.height && (
                <p>
                  {feet}' {inches}''
                </p>
              )}
              {data && (
                <p className='mt-2'>
                  {data.flavor_text_entries[0].flavor_text}
                </p>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Card
        onClick={toggleModal}
        style={{
          width: '190px',
          maxHeight: '292px',
          cursor: 'pointer',
        }}
        className='my-2 mx-2 p-3'
      >
        {stats && <CardImg top src={stats.sprites.front_default} alt={name} />}
        {stats && (
          <>
            <div className='d-flex justify-content-between'>
              <span>{stats.id}</span>
              <CardTitle className='mx-auto fixed'>{name}</CardTitle>
            </div>
            <div>
              <span>{stats.types[0].type.name}</span>
              {stats.types[1] && <span> / {stats.types[1].type.name}</span>}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
