import {renderHook} from '@testing-library/react';
import {MutableRefObject} from 'react';
import {Map} from 'leaflet';
import useMap from './use-map';
import { LOCATIONS } from '../../const';

describe('Test useMap hook', () => {
  const fakeCity = LOCATIONS[0].location;

  it('should return instance of leaflet map if html element exist',() => {
    const map = document.createElement('div');
    const fakeMapRef: MutableRefObject<HTMLElement | null> = {
      current: map
    };

    const {result} = renderHook(() => useMap(fakeMapRef, fakeCity));
    expect(result.current).toBeInstanceOf(Object);
    expect(result.current instanceof Map).toBeTruthy();
  });

  it('should not return instance of leaflet map if html element doesnt exist', () => {
    const map = null;
    const fakeRefWithHtmlElement: MutableRefObject<HTMLElement | null> = {
      current: map
    };

    const {result} = renderHook(() => useMap(fakeRefWithHtmlElement, fakeCity));
    expect(result.current instanceof Map).not.toBeTruthy();
  });
});
