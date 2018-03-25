import React from 'react';
import NewsSlider from '../widgets/NewsSlider/Slider';
import NewsList from '../widgets/NewsList/NewsList';
import VideosList from '../widgets/VideosList/VideosList';

const Home = () => {
  return (
    <div>
      <NewsSlider
        type="featured"
        start={0}
        amount={3}
        settings={{ dots: false }}
      />
      <NewsList type="card" loadmore={true} start={3} amount={3} />
      <VideosList
        type="card"
        loadmore={true}
        title={true}
        start={0}
        amount={3}
      />
    </div>
  );
};

export default Home;
