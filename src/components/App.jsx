import { useState, useEffect } from 'react';
import { Searchabar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Oval } from 'react-loader-spinner';

const API_KEY = '34813361-3927ac478a2bf3f204ffaaf5a';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [arrayImages, setArrayImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(null);
  const [btnVisible, setBtnVisible] = useState(true);

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    setLoader(true);

    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Nothing was found'));
      })
      .then(res => {
        res.hits.length < 12 ? setBtnVisible(false) : setBtnVisible(true);

        setArrayImages(prevState => [...prevState, ...res.hits]);
      })
      .catch(er => setError(er))
      .finally(() => {
        setLoader(false);

        // if (arrayImages.length) {
        //   window.scrollBy(0, 255);
        // }
      });
  }, [imageName, page]);

  const getSerchName = imageName => {
    setArrayImages([]);
    setPage(1);
    setImageName(imageName);
  };

  const btnAddImages = () => {
    return setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchabar onSubmit={getSerchName} />
      {error && <h2>Error</h2>}
      <ImageGallery images={arrayImages} />
      {loader && (
        <Oval
          height={200}
          width={5000}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      {imageName && btnVisible && <Button addImages={btnAddImages} />}
    </>
  );
};
