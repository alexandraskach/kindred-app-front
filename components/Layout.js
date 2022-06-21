import Link from "next/link";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import CheckListIcon from "./icons/CheckListIcon";
import MenuIcon from "./icons/MenuIcon";
import PiggyBankIcon from "./icons/PiggyBankIcon";

export function Layout({ children }) {
  return (
    <>
      {/* header */}
      <div className="header">
        <div>
          <span className="logo">Kindred</span>
        </div>
        <div className="centered row">
          <button className="header__button">
            <span className="header__button_icon">
              <ArrowLeftIcon></ArrowLeftIcon>
            </span>
            Go back
          </button>
        </div>
      </div>
      <main>{children}</main>
      {/* footer */}
      <div className="nav">
        <div className="nav__item">
          <CheckListIcon></CheckListIcon>
          <span className="nav__item_text">Missions</span>
        </div>
        <div className="nav__item">
          <MenuIcon></MenuIcon>
          <span className="nav__item_text">Dashboard</span>
        </div>
        <div className="nav__item">
          <PiggyBankIcon></PiggyBankIcon>
          <span className="nav__item_text">Piggybank</span>
        </div>
      </div>
    </>
  );
}
