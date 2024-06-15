export function withAuth(Component) {
  return function WithAuth(props) {
    const islogin = true;

    if (!islogin) {
      return <div>Anda harus login</div>;
    }

    return <Component {...props} />;
  };
}
