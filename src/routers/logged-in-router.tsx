import {isLoggedInVar} from '../apollo';

function LoggedInRouter() {
  function onClick() {
    isLoggedInVar(false);
  }
  return (
    <div>
      <h1>LoggedOutRouter</h1>
      <button onClick={onClick}>Click to logout</button>
    </div>
  );
}

export default LoggedInRouter;
