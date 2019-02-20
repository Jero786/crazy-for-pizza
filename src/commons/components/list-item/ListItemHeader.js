// Resources
import './ListItemHeader.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';

function ListItemHeader() {
  return (
      <div className="list-item-header card-header">
          <h1 className="list-item-header__title margin-center">Crazy for Pizza</h1>
      </div>
  );
}

ListItemHeader.propTypes = {};
ListItemHeader.defaultProps = {};

export default memo(ListItemHeader);
