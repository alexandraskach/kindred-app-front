import { Base } from "components/Base";
import styles from "./edit-contract.module.scss";

export default function render() {
  const data = {
    first_name: "Robert",
    last_name: "Godwin",
    mail: "robertgodwin@mail.com",
    roles: "Parent",
    birthdate: "20/02/1972",
    contract_value: "0,80",
    contract_description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut tellus tortor, tristique quis velit at, semper laoreet ex. Vivamus tempor eu arcu ac tristique. Aenean aliquam risus ante, vel auctor lorem vestibulum vitae. Ut condimentum finibus augue malesuada sagittis. Quisque eget feugiat nisi. Nunc fringilla faucibus felis ut sodales. Proin volutpat sagittis sem quis volutpat. Quisque eget libero nec urna lobortis ultricies.",
    children: [
      {
        id: 1,
        first_name: "Katie",
        last_name: "Godwin",
        created_at: "02/02/2017",
        contract_date: "15/12/2019",
      },
      {
        id: 2,
        first_name: "Samantha",
        last_name: "Godwin",
        created_at: "02/02/2017",
        contract_date: "15/12/2019",
      },
      {
        id: 3,
        first_name: "Brock",
        last_name: "Godwin",
        created_at: "02/02/2017",
        contract_date: "15/12/2019",
      },
    ],
  };

  return (
    <Base>
      <div id={styles.EditContract}>
        <h1>Edit contract</h1>
        <div>
          <div className="body-semibold">Child</div>
          <select>
            {data.children.map((child) => (
              <option value={child.first_name}>
                {child.first_name} {child.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="body-semibold">Value of each point</div>
          <input value={data.contract_value + "€"} />
        </div>
        <div>
          <div className="body-semibold">Description</div>
          <input value={data.contract_description} />
        </div>
        <div>
          <input
            type="button"
            className="Button Button--tertiary"
            value="Save modification"
          />
          <input
            type="button"
            className="Button Button-tertiary"
            value="Save as draft"
          />
        </div>
      </div>
    </Base>
  );
}
