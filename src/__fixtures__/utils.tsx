/* eslint-disable @typescript-eslint/no-explicit-any */
import {render} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';

export function AllTheProviders({children}: {children: React.ReactNode}) {
  return (
    <BrowserRouter>
      <HelmetProvider>{children}</HelmetProvider>
    </BrowserRouter>
  );
}

export function customRender(ui: React.ReactElement, options?: any) {
  return render(ui, {wrapper: AllTheProviders, ...options});
}
