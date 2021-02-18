import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AfterLoginTemplate from '../templates/AfterLoginTemplate';
import Heading from '../components/atoms/Heading/Heading';
import Paragraph from '../components/atoms/Paragraph/Paragraph';
import Button from '../components/atoms/Button/Button';
import withContext from '../hoc/withContext';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  max-width: 50vw;
  position: relative;
  margin:auto;
  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;
  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const StyledImage = styled.img`
  position: absolute;
  right: -80px;
  top: 50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const DetailsTemplate = ({ pageContext, title, content}) => (
  <AfterLoginTemplate>
    <StyledWrapper>
      <StyledPageHeader>
        <StyledHeading big as="h1">
          {title}
        </StyledHeading>
      </StyledPageHeader>
      <Paragraph>{content}</Paragraph>
      
      <Button as={Link} to={`/${pageContext}`} activecolor={pageContext}>
        wróć
      </Button>
    </StyledWrapper>
  </AfterLoginTemplate>
);

DetailsTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']).isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  title: '',
  content: '',
};

export default withContext(DetailsTemplate);