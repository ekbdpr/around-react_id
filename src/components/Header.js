import logo from "../images/logo/logo_around-the-us.svg";

export default function Header() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="around the US logo" className="header__logo" />
        <hr className="header__line" />
      </header>
    </>
  );
}
