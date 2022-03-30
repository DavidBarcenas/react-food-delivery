import {render, waitFor} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import Title from '../title';

it('should display the title correctly', async () => {
  render(
    <HelmetProvider>
      <Title text='Home' />
    </HelmetProvider>,
  );
  await waitFor(() => {
    expect(document.title).toEqual('Home | Food Delivery');
  });
});
