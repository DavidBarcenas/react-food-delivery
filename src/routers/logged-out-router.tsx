import {isLoggedInVar} from '../apollo';

function LoggedOutRouter() {
  function onClick() {
    isLoggedInVar(true);
  }
  return (
    <div>
      <h1>LoggedInRouter</h1>
      <button onClick={onClick}>Click to login</button>
    </div>
  );
}

export default LoggedOutRouter;
