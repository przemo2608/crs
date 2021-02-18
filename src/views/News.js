import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from '../templates/GridTemplate';
import Card from '../components/molecules/Card/Card';
import { fetchNews } from '../actions/index';

class News extends Component {
  componentDidMount() {
    const { GetNews } = this.props;
    GetNews();
  }


  render() {
    const { news } = this.props;

    return (
      <GridTemplate>
        {news.map(({id, title, content}) => (
          <Card
            id={id}
            title={title}
            content={content}
            key={id}
          />
        ))}
      </GridTemplate>
    );
  }
}

News.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
};

News.defaultProps = {
  news: [],
};

const mapStateToProps = state => {
  const { news } = state;
  return { news };
};

const mapDispatchToProps = dispatch => ({
  GetNews: () => dispatch(fetchNews()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);