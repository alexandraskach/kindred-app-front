import { useRouter } from 'next/router'
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon'
import SettingsIcon from 'components/icons/SettingsIcon'

export default function Header() {
    const router = useRouter()

    return (
        <div className="Header">
            <span className="Header__title">Kindred</span>

            {router.pathname !== '/' && (
                <a className="Header__button" href='#0'><ArrowLeftIcon/>Go back</a>
            )}
            
            {router.pathname == '/' && (
                <a className="Header__button" href='#0'><SettingsIcon/>Settings</a>
            )}
        </div>
    )
}