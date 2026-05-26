import { describe, expect, it } from 'vitest';

import reducer, { resetFieldCreation, setArea, setDrawing, setFieldInfo } from './createFieldSlice';

describe('createFieldSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      data: {
        name: '',
        address: '',
        owner: '',
        area: 0,
        cropType: '',
        soilType: '',
      },
      isDrawing: false,
    });
  });

  it('setFieldInfo stores field data and enables drawing mode', () => {
    const state = reducer(
      undefined,
      setFieldInfo({
        fieldName: 'North Field',
        address: 'Kyiv region',
        owner: 'John Doe',
        area: 15.3,
        cropType: 'Wheat',
        soilType: 'Loam',
      })
    );

    expect(state.data).toEqual({
      name: 'North Field',
      address: 'Kyiv region',
      owner: 'John Doe',
      area: 15.3,
      cropType: 'Wheat',
      soilType: 'Loam',
    });
    expect(state.isDrawing).toBe(true);
  });

  it('setArea updates only field area', () => {
    const withInfo = reducer(
      undefined,
      setFieldInfo({
        fieldName: 'North Field',
        address: 'Kyiv region',
        owner: 'John Doe',
        area: 15.3,
        cropType: 'Wheat',
        soilType: 'Loam',
      })
    );

    const state = reducer(withInfo, setArea(20.1));

    expect(state.data.area).toBe(20.1);
    expect(state.data.name).toBe('North Field');
    expect(state.isDrawing).toBe(true);
  });

  it('setDrawing disables drawing mode', () => {
    const withInfo = reducer(
      undefined,
      setFieldInfo({
        fieldName: 'North Field',
        address: 'Kyiv region',
        owner: 'John Doe',
        area: 15.3,
        cropType: 'Wheat',
        soilType: 'Loam',
      })
    );

    const state = reducer(withInfo, setDrawing());

    expect(state.isDrawing).toBe(false);
  });

  it('resetFieldCreation restores initial state', () => {
    const withInfo = reducer(
      undefined,
      setFieldInfo({
        fieldName: 'North Field',
        address: 'Kyiv region',
        owner: 'John Doe',
        area: 15.3,
        cropType: 'Wheat',
        soilType: 'Loam',
      })
    );

    const state = reducer(withInfo, resetFieldCreation());

    expect(state).toEqual({
      data: {
        name: '',
        address: '',
        owner: '',
        area: 0,
        cropType: '',
        soilType: '',
      },
      isDrawing: false,
    });
  });
});
