export default function MainPage() {
  return (
    <>
      Main page - <a href={import.meta.env.VITE_BUNGIE_API_AUTHURL}>Log in</a>
    </>
  );
}
