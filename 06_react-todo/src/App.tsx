import { memo, useLayoutEffect } from 'react';
import axios from 'axios';

import './css/reset.css';
import './css/style.css';

const url = 'http://localhost:8080/api/todos';

const App = () => {
  useLayoutEffect(() => {
    (async () => {
      const { data } = await axios.get(url);

      console.log(data);
    })();
  }, []);

  return (
    <div className="container">
      <h1>Todo</h1>

      <form>
        <input type="text" placeholder="Please enter what to do" required />
        <button>Create</button>
      </form>

      <div className="button-container">
        <button className="selection">Delete Selection</button>
        <button className="all">Delete All</button>
      </div>

      <ul></ul>
    </div>
  );
};

export default memo(App);
