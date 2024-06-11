export default function Dashboard() {
  const apiClient = window.apiClient;

  apiClient.checkIfAuthenticated().then((result) => {
    if (!result) {
      location.href = "/";
    }
  });

  return <>Blep</>;
}
