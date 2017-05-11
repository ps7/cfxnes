/* eslint-disable import/export */
import {values as inputTypes} from './InputType';

export * from './InputType';
export const SELECT = 'select';
export const values = [...inputTypes, SELECT];
