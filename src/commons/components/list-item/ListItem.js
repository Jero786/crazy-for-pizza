// Resources
import './ListItem.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';


function ListItem({children, imageSrc = 'https://www.cicis.com/media/1243/pizza_adven_zestypepperoni.png'}) {
    return (
        <div className="list-item margin-center bg-white">
            <div className="list-item__picture">
                <img src={imageSrc} alt="The image of the Item"/>
            </div>
            <div className="list-item__content">
                {children}
            </div>
        </div>
    );
}

ListItem.propTypes = {
    children: PropTypes.any,
    PropTypes: PropTypes.string,
};

export default memo(ListItem);
