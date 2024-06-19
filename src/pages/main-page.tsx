export default function MainPage(props: { authenticated: boolean }) {
  if (props.authenticated) {
    // User is supposedly logged in, redirecting to login page to check auth and manifest
    location.href = "/#/logging-in";
    return <></>;
  }

  return (
    <>
      Main page -{" "}
      <a
        href={
          import.meta.env.VITE_BUNGIE_API_AUTHURL +
          "?state=dataverse-" +
          new Date().getTime()
        }
      >
        Log in
      </a>
    </>
  );
}
