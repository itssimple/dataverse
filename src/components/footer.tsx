export function Footer() {
  return (
    <footer className="fui body fiction">
      © 2023
      {new Date().getUTCFullYear() != 2023
        ? " - " + new Date().getUTCFullYear()
        : null}{" "}
      NoLifeKing85#2914
    </footer>
  );
}
