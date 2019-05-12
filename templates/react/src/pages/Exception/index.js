import './index.less';

import React, { Component } from 'react';

import { Button } from 'antd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from '~/plugins';

@connect(
  (state) => {
    return state.router;
  }
)
class Exception extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  $i18nPath = 'exception'

  render = () => {
    const { match } = this.props;

    return (
      <div className="exception-container">
        <div className="exception-image-wrapper">
          <img
            className="exception-image"
            src={`/static/images/exception/${match.params.code}.svg`}
            alt={match.params.code}
          />
        </div>

        <div className="exception-content-wrapper">
          <h1 className="exception-content-title">{match.params.code}</h1>

          <p className="exception-content-desc">{this.$i18n(match.params.code)}</p>

          <p className="exception-content-operation">
            <Link to="/">
              <Button type="primary" className="btn-back">{this.$i18n('back')}</Button>
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Exception;
