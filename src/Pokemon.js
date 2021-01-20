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

  const name = details.name.charAt(0).toUpperCase() + details.name.slice(1);

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
  }

  return (
    <div key={details.id}>
      <Modal open={modal} toggle={toggleModal}>
        <ModalHeader className='row d-flex justify-content-between'>
          <h4>{name}</h4>
        </ModalHeader>
        <ModalBody>
          <div className='row'>
            <img style={{ height: '250px' }} alt='' />
            <div>
              <>{stats.types[0].type.name}</>
              {stats.types[1] && <span> / {stats.types[1].type.name}</span>}
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Card
        onClick={toggleModal}
        style={{
          width: '200px',
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
