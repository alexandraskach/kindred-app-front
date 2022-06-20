import { Base } from "components/Base";
import CheckListIcon from "components/icons/CheckListIcon";
import MenuIcon from "components/icons/MenuIcon";
import PiggyBankIcon from "components/icons/PiggyBankIcon";
import styles from "./navbar.module.scss";
// export default function render() {
//   return (
//     <Base>
//       <div id={styles.Navbar} className="mt-8">
//         <div className="nav">
//           <div className="nav__item">
//             <CheckListIcon></CheckListIcon>
//             <span className="nav__item_text">Missions</span>
//           </div>
//           <div className="nav__item">
//             <MenuIcon></MenuIcon>
//             <span className="nav__item_text">Dashboard</span>
//           </div>
//           <div className="nav__item">
//             <PiggyBankIcon></PiggyBankIcon>
//             <span className="nav__item_text">Piggybank</span>
//           </div>
//         </div>
//       </div>
//     </Base>
//   );
// }

const Navbar = () => (
  <div className="nav" id={styles.Navbar}>
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
);

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
