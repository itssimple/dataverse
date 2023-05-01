export default function MainPage() {
  return (
    <>
      Main page -{" "}
      <a
        href={
          import.meta.env.VITE_BUNGIE_API_AUTHURL +
          "?state=dataverse-" +
          new Date().getTime()
        }>
        Log in
      </a>
    </>
  );
}
