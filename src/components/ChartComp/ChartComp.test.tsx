import React from 'react';
import ReactDOM from 'react-dom';
import ChartComp from './ChartComp';
import StringUtil from '../../util/StringUtil'
import { MockConstants } from '../../config/MockConstants';
import TimestampConstants from '../../config/TimestampConstants';
import DateUtil from '../../util/DateUtil'
import { ClipLoader } from 'react-spinners';
import renderer from 'react-test-renderer';
import HeaderComp from '../HeaderComp/HeaderComp'
import { shallow } from 'enzyme';
import { MessageConstants } from '../../config/MessageConstants';
import ChartConstants from '../../config/ChartConstants';

it('should convert correctly a JSON string to array of objects', () => {
  const eventsArray = StringUtil.strToJSONArray(MockConstants.dataTxt);
  expect(Array.isArray(eventsArray)).toBe(true);
});

it('should calculate difference between two timestamps', () => {
  const timeDiff = DateUtil.timestampDiff(TimestampConstants.hourstamp, 5 * TimestampConstants.minutestamp);
  expect(typeof timeDiff).toBe('string');
});

it('should remove slash from string', () => {
  const strCamel = StringUtil.toCammelCaseSlash('min_response_time');
  expect(strCamel.indexOf('_') == -1).toBe(true);
});

it('should remove slash from string', () => {
  const strCamel = StringUtil.toCammelCaseSlash('min_response_time');
  expect(strCamel.indexOf('_') == -1).toBe(true);
});

it('should not has error when verifyDataErrors with a valid inputData string', () => {
  const eventsArray = StringUtil.strToJSONArray(MockConstants.dataTxt);
  const error = StringUtil.verifyDataErrors(eventsArray);
  expect(error).toBe(null);
});

it('should verify errors when invalid inputData is used', () => {
  const eventsArray = StringUtil.strToJSONArray(MockConstants.invalidDataTxt);
  const error = StringUtil.verifyDataErrors(eventsArray);
  expect(error).toBe(MessageConstants.PARSE_ERROR);
});

it("should verify errors whenm empty inputData is used", () => {
  const error = StringUtil.verifyDataErrors('');
  expect(error).toBe(MessageConstants.EMPTY_DATA);
});

