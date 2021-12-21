import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fas from '@fortawesome/free-solid-svg-icons';
import * as fab from '@fortawesome/free-brands-svg-icons';

export default function Icons(props) {
  let iconName = '';
  switch (props.iconName) {
    case 'faSearch':
      iconName = fas[props.iconName];
      break;
    case 'faGithub':
      iconName = fab[props.iconName];
      break;
    default:
      iconName = '';
      break;
  }
  return <FontAwesomeIcon id={props.iconName} icon={iconName} />;
}
