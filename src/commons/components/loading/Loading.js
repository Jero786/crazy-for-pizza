// Resources
import './Loading.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';

function Loading() {
    return (
        <div className="cp-loading">
            <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
        </div>
    );
}

Loading.propTypes = {};
Loading.defaultProps = {};

export default memo(Loading);
