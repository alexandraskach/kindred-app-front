import { useRouter } from "next/router";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import SettingsIcon from "components/icons/SettingsIcon";

export default function Header() {
  const router = useRouter();

  return (
    <div className="Header">
      <span className="Header__title">Kindred</span>

      {router.pathname !== "/" && (
        <a className="Header__button" onClick={() => router.back()}>
          <ArrowLeftIcon />
          Go back
        </a>
      )}

      {router.pathname == "/" && (
        <a className="Header__button" href="/settings">
          <SettingsIcon />
          Settings
        </a>
      )}
    </div>
  );
}
