export function withAuth(Component) {
  return function WithAuth(props) {
    const islogin = false;

    if (!islogin) {
      return <div>Anda harus login</div>;
    }

    return <Component {...props} />;
  };
}
