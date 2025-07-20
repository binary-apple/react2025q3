import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Loader from './Loader';

test('renders a loader', () => {
  const loader = render(<Loader />);
  expect(loader).toBeDefined();
});
