import React from 'react';
import ReactDOM from 'react-dom';
import StringUtil from '../../util/StringUtil'
import { MockConstants } from '../../config/MockConstants';
import TimestampConstants from '../../config/TimestampConstants';
import DateUtil from '../../util/DateUtil'
import { ClipLoader } from 'react-spinners';
import renderer from 'react-test-renderer';
import HeaderComp from '../HeaderComp/HeaderComp'


it('should render HeaderComp without error', () => {
  renderer.create(<HeaderComp></HeaderComp>);
});


