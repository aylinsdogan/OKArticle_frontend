import { FC, memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './components/web/pages/Home/Home';
import { Summarize } from './components/web/pages/Summarize/Summarize';

interface Props {
  className?: string;
}

export const App: FC<Props> = memo(function App(props = {}) {

  return (

    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/summarize' element={<Summarize />} />
      </Routes>
    </BrowserRouter>
  );
});