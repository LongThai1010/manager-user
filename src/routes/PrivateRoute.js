import { Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function PrivateRoute(props) {
  const user = useSelector((state) => state.user.account);

  if (user && !user.auth) {
    return (
      <>
        <Container>
          <Alert variant="danger" dismissible>
            <Alert.Heading>Oh No! You got an error!</Alert.Heading>
            <p>
              Please Login to use this service
            </p>
          </Alert>
        </Container>
      </>
    );
  }
  return <>{props.children}</>;
}

export default PrivateRoute;
