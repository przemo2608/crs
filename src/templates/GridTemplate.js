import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import AfterLoginTemplate from './AfterLoginTemplate';
import Input from '../components/atoms/Input/Input';
import Heading from '../components/atoms/Heading/Heading';
import Paragraph from '../components/atoms/Paragraph/Paragraph';
import Buttonicon from '../components/atoms/Buttonicon/Buttonicon';
import AddNewsBar from '../components/organisms/NewItemBar/AddNewsBar';
import AddUserBar from '../components/organisms/NewItemBar/AddUserBar';
import AddCarBar from '../components/organisms/NewItemBar/AddCarBar';
import plusIcon from '../assets/add.svg';
import minusIcon from '../assets/minus.svg';
import withContext from '../hoc/withContext';

const StyledWrapper = styled.div`
  position: relative;
  padding: 25px 150px 25px 70px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;
  @media (max-width: 1500px) {
    grid-gap: 45px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
   ${({news}) => (
      news && css`
      grid-template-columns: 1fr;
      width: 80%;
      margin: auto;
      `
  )
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

const StyledButtonIcon = styled(Buttonicon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${({ activecolor, theme }) => theme[activecolor]};
  background-size: 35%;
  border-radius: 50px;
  z-index: 10000;
`;

class GridTemplate extends Component {
  state = {
    isNewItemBarVisible: false,
    search: null
  };

    searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  toggleNewItemBar = () => {
    this.setState(prevState => ({
      isNewItemBarVisible: !prevState.isNewItemBarVisible,
    }));
  };

  render() {
    const { children, pageContext } = this.props;
    const { isNewItemBarVisible, search } = this.state;

    return (
      <AfterLoginTemplate>
        <StyledWrapper>
          <StyledPageHeader>
            <Input search placeholder="Search" onChange={(e)=>this.searchSpace(e)}/>
            {search}
          {pageContext == 'news' &&  <StyledHeading big as="h1"> Aktualności </StyledHeading>}
          {pageContext == 'customers' &&  <StyledHeading big as="h1"> Klienci </StyledHeading>}
          {pageContext == 'cars' &&  <StyledHeading big as="h1"> Samochody </StyledHeading>}
          {pageContext == 'workers' &&  <StyledHeading big as="h1"> Mechanicy </StyledHeading>}
          </StyledPageHeader>
         {pageContext!='news'? <StyledGrid>{children}</StyledGrid> : null}
         {pageContext=='news'? <StyledGrid news>{children}</StyledGrid> : null}
         {isNewItemBarVisible ? <StyledButtonIcon
            onClick={this.toggleNewItemBar}
            icon={minusIcon}
            activecolor={pageContext}
          /> :  <StyledButtonIcon
            onClick={this.toggleNewItemBar}
            icon={plusIcon}
            activecolor={pageContext}
          />}
         {pageContext=='news' && <AddNewsBar handleClose={this.toggleNewItemBar} isVisible={isNewItemBarVisible} /> }
          {pageContext=='customers' && <AddUserBar handleClose={this.toggleNewItemBar} isVisible={isNewItemBarVisible} /> }
           {pageContext=='workers' && <AddUserBar handleClose={this.toggleNewItemBar} isVisible={isNewItemBarVisible} /> }
           {pageContext=='cars' && <AddCarBar handleClose={this.toggleNewItemBar} isVisible={isNewItemBarVisible} /> }
        </StyledWrapper>
      </AfterLoginTemplate>
    );
  }
}

GridTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
};

GridTemplate.defaultProps = {
  pageContext: 'news',
};

export default withContext(GridTemplate);