import { Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function PrivateRoute(props) {
  const user = useSelector((state) => state.user.account);

  if (user && !user.auth) {
    return (
      <>
        <Container>
          <Alert variant="danger" dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
              elit. Cras mattis consectetur purus sit amet fermentum.
            </p>
          </Alert>
        </Container>
      </>
    );
  }
  return <>{props.children}</>;
}

export default PrivateRoute;
