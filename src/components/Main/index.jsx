import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

export default function MainContainer({ children = null }) {
  return <Container>{children}</Container>;
}

MainContainer.propTypes = {
  children: PropTypes.node,
};
