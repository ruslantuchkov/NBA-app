import React from 'react';
import Slick from 'react-slick';
import { Link } from 'react-router-dom';
import styles from './slider.css';

const SliderTemplates = props => {
  let template = null;

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...props.settings
  };

  switch (props.type) {
    case 'featured':
      template = props.data.map(({ id, title, image }) => (
        <div key={id}>
          <div className={styles.featured_item}>
            <div
              className={styles.featured_image}
              style={{ background: `url(${image})` }}
            />
            <Link to={`/articles/${id}`}>
              <div className={styles.featured_caption}>{title}</div>
            </Link>
          </div>
        </div>
      ));
      break;
    default:
      template = null;
  }

  return <Slick {...settings}>{template}</Slick>;
};

export default SliderTemplates;
