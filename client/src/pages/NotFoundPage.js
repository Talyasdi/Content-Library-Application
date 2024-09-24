import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      <p>That page cannot be found</p>
      <Link to="/">Back to the HomePage</Link>
    </div>
  );
}
 
export default NotFound;