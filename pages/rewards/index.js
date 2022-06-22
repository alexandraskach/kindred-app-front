import { Base } from "components/Base";
import PlusIcon from "components/icons/PlusIcon";
import Link from "next/link";
import styles from "./rewards.module.scss";

export default function render() {
  return (
    <Base>
      <div id={styles.Rewards} className="mt-8 wrapper">
        <div className="select-container">
          <select className="select">
            <option> Katie Moum</option>
          </select>
        </div>
        <h2 className="mt-2">Rewards</h2>
        <Link href="/rewards/add-reward">
          <button className="Button Button--outline">
            {" "}
            Add reward{" "}
            <span className="ml-2">
              <PlusIcon></PlusIcon>
            </span>
          </button>
        </Link>
        <div className="Card">
          <h2>120 points</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Ut tellus tortor, tristique quis velit at,
            semper laoreet ex.
          </p>
        </div>
        <div className="Card">
          <h2>120 points</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Ut tellus tortor, tristique quis velit at,
            semper laoreet ex.
          </p>
        </div>
      </div>
    </Base>
  );
}
