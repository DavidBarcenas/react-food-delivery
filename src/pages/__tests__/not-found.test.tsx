import {render} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import NotFound from '../not-found';

it('render correctly', () => {
  const {getByRole} = render(
    <HelmetProvider>
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    </HelmetProvider>,
  );
  const btnToGohome = getByRole('button');
  btnToGohome.click();
  expect(window.location.pathname).toBe('/');
});
