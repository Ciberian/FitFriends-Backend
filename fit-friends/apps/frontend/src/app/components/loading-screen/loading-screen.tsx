import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
