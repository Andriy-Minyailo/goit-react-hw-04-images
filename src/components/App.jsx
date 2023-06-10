import { useEffect, useState } from 'react';
import css from './App.module.css';
import { RequestServer } from '../pixabayAPI';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { BtnLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const requestServer = new RequestServer();

export const App = () => {
  const [imgs, setImgs] = useState([]);
  const [totalHitsLocal, setTotalHitsLocal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [stateLoader, setStateLoader] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue) return;
    arraySearchImg(searchValue, page);
  }, [searchValue, page]);

  const arraySearchImg = async (search, number) => {
    setStateLoader(true);

    try {
      const {
        data: { hits, totalHits },
      } = await requestServer.searchImg(search, number);
      if (!totalHits) {
        setError('No images found!');
        return;
      }
      setImgs(prevState => [...prevState, ...hits]);
      setTotalHitsLocal(totalHits);
    } catch (er) {
      console.log(er.message);
      setError(er.message);
    } finally {
      setStateLoader(false);
    }
  };

  const newSearchValue = inputValue => {
    setSearchValue(inputValue);
    setImgs([]);
    setTotalHitsLocal(0);
    setPage(1);
    setError(null);
  };

  const openModal = ({ currentTarget: { id } }) => {
    const imgModal = imgs.find(hit => hit.id === Number(id));
    setModalImg(imgModal);
    setStateModal(true);
  };

  const closeModal = () => {
    setStateModal(false);
    setModalImg('');
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar newSearchValue={newSearchValue}></Searchbar>

      {error ? (
        <h2>{error}</h2>
      ) : (
        <ImageGallery imgs={imgs} openModal={openModal} />
      )}

      {stateLoader && <Loader />}

      {totalHitsLocal / 12 > page && <BtnLoadMore loadMoreBtn={loadMoreBtn} />}

      {stateModal && <Modal modalImg={modalImg} closeModal={closeModal} />}
    </div>
  );
};
