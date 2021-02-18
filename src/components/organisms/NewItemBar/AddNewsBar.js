import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import withContext from '../../../hoc/withContext';
import Heading from '../../atoms/Heading/Heading';
import { connect } from 'react-redux';
import { addNews as addNewsAction } from '../../../actions/index';
import { Formik, Form } from 'formik';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
`;

const AddNewsBar = ({ pageContext, isVisible, addNews, handleClose }) => (
  <StyledWrapper isVisible={isVisible} activecolor={pageContext}>
    <Heading big>Dodaj {pageContext}</Heading>
    <Formik
      initialValues={{ title: '', content: '' }}
      onSubmit={(values, {resetForm}) => {
        addNews(values);
        handleClose();
        resetForm({})
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
          <StyledInput
            type="text"
            name="title"
            placeholder="tytuł"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          <StyledTextArea
            name="content"
            as="textarea"
            placeholder="opis"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          <Button type="submit" activecolor={pageContext}>
            Dodaj
          </Button>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

AddNewsBar.propTypes = {
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

AddNewsBar.defaultProps = {
  pageContext: 'news',
  isVisible: false,
};

const mapDispatchToProps = dispatch => ({
  addNews: (newsContent) => dispatch(addNewsAction(newsContent)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withContext(AddNewsBar));