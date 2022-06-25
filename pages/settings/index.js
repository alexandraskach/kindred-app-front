import { Base } from "components/Base";
import redirectToAuh from "components/redirectToAuh";
import styles from "./parent-profile.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import Link from "next/link";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    console.log("user", context.req.session.user);
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }
    let props = context.req.session,
      responseChilds = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/users/${props.user.id}/childs`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      ),
      childs = await responseChilds.json();

    props.childs = childs;

    return { props };
  },
  sessionConfig
);

export default function render(props) {
  const data = {
    first_name: "Robert",
    last_name: "Godwin",
    mail: "robertgodwin@mail.com",
    roles: "Parent",
    birthdate: "20/02/1972",
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
      <div id={styles.ParentProfile}>
        <div className="d-flex flex-column align-items-center mb-3">
          <div className="Picture Picture--big mx-auto mb-1">
            {props.user.firstName.charAt(0).toUpperCase()}
          </div>
          <h3 className="m-0">
            {props.user.firstName} {props.user.lastName}
          </h3>
          <p className="small m-0">Parent</p>
        </div>

        {/* Childs */}
        <div className="Card">
          <div className={styles.profile__header}>
            <div className={styles.profile__title}>Children</div>
            <Link href="register/register-child">
              <div className={styles.profile__add__button}>+</div>
            </Link>
          </div>
          {props.childs.map((child) => (
            <div className={styles.profile__child} key={child.id}>
              <div className={styles.profile__child__picture}></div>
              <div className={styles.profile__informations}>
                <div className={styles.profile__child__name}>
                  {child.firstName} {child.lastName}
                </div>
                <div className={styles.profile__child__adding__date}>
                  Added on {child.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* affichage des contrats */}
        <div className="Card">
          <div className={styles.profile__header}>
            <div className={styles.profile__title}>Contracts</div>
            <div className={styles.profile__add__button}>+</div>
          </div>

          {data.children.map((child) => (
            <div className={styles.profile__child} key={child.id}>
              <div className={styles.profile__child__picture}></div>
              <div className={styles.profile__informations}>
                <a
                  className={styles.profile__child__name}
                  href="/parent-contract"
                >
                  {child.first_name} {child.last_name}
                </a>
                <div className={styles.profile__contract__date}>
                  {child.contract_date}
                </div>
              </div>
              <div className={styles.profile__contract__status}></div>
            </div>
          ))}
        </div>

        {/* affichage des infos personelles */}
        <div className="Card">
          <div className={styles.profile__title}>Personnal informations</div>
          <div className={styles.profile__informations}>
            <div className={styles.profile__email}>{props.user.email}</div>
            {/* <div className={styles.profile__birthdate}>
              Born on the {data.birthdate}
            </div> */}
          </div>
        </div>

        {/* affichage des infos personelles */}
        <div className="Card">
          <input
            className="Button Button--tertiary"
            type="button"
            value={"Logout"}
          />
          <div className={styles.profile__title}>
            <div className={styles.profile__change__password}>
              <a href="/change-password">Change your password</a>
            </div>
            <div className={styles.profile__delete__account}>
              <a href="/change-password">Delete your account</a>
            </div>
            {/* <div className={styles.profile__change__password}>
							<a href="/change-password">Change your password</a>
						</div>
						<div className={styles.profile__delete__account}>
							Delete your account
						</div> */}
          </div>
        </div>
      </div>
    </Base>
  );
}
