import { useRouter } from "next/router";
import CheckListIcon from "components/icons/CheckListIcon";
import CheckListFillIcon from "components/icons/CheckListFillIcon";
import MenuIcon from "components/icons/MenuIcon";
import MenuFillIcon from "components/icons/MenuFillIcon";
import PiggyBankIcon from "components/icons/PiggyBankIcon";
import PiggyBankFillIcon from "components/icons/PiggyBankFillIcon";
import SettingsIcon from "components/icons/SettingsIcon";
import SettingsFIllIcon from "components/icons/SettingsFillIcon";
// import styles from './index.module.scss'

export default function Nav() {
  const router = useRouter();

  return (
    // <nav className={styles.Nav}>
    <nav className="Nav">
      <div className="Nav__container">
        <a
          href="/missions"
          className={
            "Nav__container__item " +
            (router.pathname == "/missions"
              ? "Nav__container__item--active"
              : "")
          }
        >
          <div className="Nav__container__item__icon">
            <CheckListIcon></CheckListIcon>
          </div>
          <div className="Nav__container__item__icon--fill">
            <CheckListFillIcon></CheckListFillIcon>
          </div>
          <span className="Nav__container__item__text">Missions</span>
        </a>
        <a
          href="/"
          className={
            "Nav__container__item " +
            (router.pathname == "/" ? "Nav__container__item--active" : "")
          }
        >
          <div className="Nav__container__item__icon">
            <MenuIcon></MenuIcon>
          </div>
          <div className="Nav__container__item__icon--fill">
            <MenuFillIcon></MenuFillIcon>
          </div>
          <span className="Nav__container__item__text">Dashboard</span>
        </a>
        <a
          href="/settings"
          className={
            "Nav__container__item " +
            (router.pathname == "/settings"
              ? "Nav__container__item--active"
              : "")
          }
        >
          <div className="Nav__container__item__icon">
            <SettingsIcon/>
          </div>
          <div className="Nav__container__item__icon--fill">
            <SettingsFIllIcon/>
          </div>
          <span className="Nav__container__item__text">Settings</span>
        </a>
      </div>
    </nav>
  );
}
