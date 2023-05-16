import { render } from '@testing-library/react';
import IntroPage from './intro-page';

describe('IntroPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IntroPage />);
    expect(baseElement).toBeTruthy();
  });
});
