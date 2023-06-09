import PropTypes from 'prop-types';
import css from './Buton.module.css';

export const BtnLoadMore = ({ arraySearchImg }) => {
  return (
    <>
      <button className={css.button} onClick={() => arraySearchImg()}>
        Load more
      </button>
    </>
  );
};

BtnLoadMore.propTypes = {
  arraySearchImg: PropTypes.func.isRequired,
};
