import ChevronTop from "components/icons/ChevronTop";

export function toggle(select) {
    const others = select.querySelector('.SelectChild__others')
    const container = select.querySelector('.SelectChild__others__container')
    const containerWidth = container.clientHeight
    
    select.classList.toggle('show')
    others.style.height = select.classList.contains('show') ? containerWidth + 'px' : '0px'
}

export default function SelectChild() {

    return (
        <div className="SelectChild">
            <div className="SelectChild__current" onClick={e => toggle(e.target.parentNode)}>
                <div className="SelectChild__current__informations">
                    <img src="" />
                    <span>Lorem ipsum</span>
                </div>
                <ChevronTop/>
            </div>
            <div className="SelectChild__others">
                <div className="SelectChild__others__container">
                    <div className="SelectChild__others__container__item">
                        <img src="" />
                        <span>Lorem ipsum</span>
                    </div>
                    <div className="SelectChild__others__container__item">
                        <img src="" />
                        <span>Lorem ipsum</span>
                    </div>
                </div>
            </div>
        </div>
    )
}