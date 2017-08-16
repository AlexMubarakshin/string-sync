import React from 'react';
import { Link } from 'react-router';

import Card from 'antd/lib/card';
import LazyLoad from 'react-lazyload';

import './_notationDetail.less';

const style = { width: '280px', height: '240px', cursor: 'pointer' };

const NotationDetail = ({ notation }): JSX.Element => (
  <div className="NotationDetail">
    <Link to={`/n/${notation.id}`}>
      <LazyLoad
        height={style.height}
        offset={500}
        placeholder={<Card loading {...style} />}
      >
        <Card {...style}>
          <div>
            <div className="NotationDetail__img">
              <img alt={notation.name} width="100%" src={notation.thumbnailUrl} />
            </div>
            <div className="NotationDetail__info">
              <h3>{`${notation.name} by ${notation.artist}`}</h3>
              <p>{notation.transcriber}</p>
            </div>
          </div>
        </Card>
      </LazyLoad>
    </Link>
  </div>
);

export default NotationDetail;
