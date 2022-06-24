import { Base } from "components/Base";
import redirectToAuh from "components/redirectToAuh";
import styles from "./parent-profile.module.scss";

export default function render() {
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
          <div className="Picture Picture--big mx-auto mb-1">R</div>
          <h3 className="m-0">Robert Godwin</h3>
          <p className="small m-0">Parent</p>
        </div>

        {/* Childs */}
        <div className="Card">
          <div className={styles.profile__header}>
            <div className={styles.profile__title}>Children</div>
            <div className={styles.profile__add__button}>+</div>
          </div>
          {data.children.map((child) => (
            <div className={styles.profile__child} key={child.id}>
              <div className={styles.profile__child__picture}></div>
              <div className={styles.profile__informations}>
                <div className={styles.profile__child__name}>
                  {child.first_name} {child.last_name}
                </div>
                <div className={styles.profile__child__adding__date}>
                  Added on {child.created_at}
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
            <div className={styles.profile__email}>{data.mail}</div>
            <div className={styles.profile__birthdate}>
              Born on the {data.birthdate}
            </div>
          </div>
        </div>

        {/* affichage des infos personelles */}
        <div className="Card">
          <input
            className="Button Button--tertiary"
            type="button"
            value={"logout"}
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
// function ParentSettings() {
//   const location = useLocation();

//   const isSettingsPage = location.pathname === "/settings";
//   const isChangePasswordPage = location.pathname === "/change-password";
//   const isLogOutPage = location.pathname === "/logout";

//   return (
//     <div>
//       <Header retour="true"></Header>
//       <div className="container__profile">
//         {isChangePasswordPage ? (
//           <>
//             <h2>Changing your password</h2>
//             <h3>New password</h3>
//             <div className="form">
//               <Formik
//                 initialValues={{
//                   password: "",
//                   password: "",
//                 }}
//                 validate={(values) => {
//                   const errors = {};
//                   if (!values.email) {
//                     errors.email = "Required";
//                   } else if (
//                     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
//                       values.email
//                     )
//                   ) {
//                     errors.email = "Invalid email address";
//                   }
//                   return errors;
//                 }}
//                 onSubmit={async (values) => {
//                   fetch(process.env.REACT_APP_API + "/api/login", {
//                     method: "post",
//                     body: JSON.stringify(values),
//                     headers: {
//                       Accept: "application/json",
//                       "Content-Type": "application/json",
//                     },
//                   })
//                     .then((res) => res.json())
//                     .then(
//                       (result) => {
//                         if (result.access_token) {
//                           sessionStorage.setItem("isLoggedIn", true);
//                           sessionStorage.setItem("role", result.user.role);
//                           sessionStorage.setItem(
//                             "user",
//                             JSON.stringify(result)
//                           );
//                           // result.user.role === "admin"
//                           //   ? setRoleAdmin(true)
//                           //   : setIsSubmitted(true);
//                           // setIsSubmitted(true)
//                         } else {
//                           // setIsSubmitted(false);
//                           alert(
//                             "Error, please verify your user or your password"
//                           );
//                         }
//                       },
//                       (error) => {
//                         // setIsSubmitted(false);
//                         console.log(error);
//                       }
//                     );
//                 }}
//               >
//                 <Form>
//                   <div className="input-container">
//                     <Field
//                       type="text"
//                       name="password"
//                       placeholder="Enter your new password"
//                       required
//                     />
//                   </div>
//                   <div className="input-container">
//                     <Field
//                       type="text"
//                       name="password"
//                       placeholder="Confirm your new password"
//                       required
//                     />
//                   </div>
//                   {/* {renderErrorMessage("pass")}
//     {renderErrorMessage("email")} */}
//                   <div className="button-container">
//                     <button className="button-dark" type="submit">
//                       Sign in
//                     </button>
//                   </div>
//                 </Form>
//               </Formik>
//             </div>
//           </>
//         ) : isLogOutPage ? (
//           <Navigate to="/" />
//         ) : (
//           ""
//         )}
//         <div className="navbar">
//           {" "}
//           <Navbar></Navbar>
//         </div>
//       </div>
//     </div>
//   );
// }

// ParentSettings.propTypes = {};

// ParentSettings.defaultProps = {};

// export default ParentSettings;
