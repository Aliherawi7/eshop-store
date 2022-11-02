import React, {useState, useRef} from 'react'
import "./Account.css"
import { BytesToFile } from '../../Utils/BytesToFile'
import AccountTools from "./AccountTools"
let counter = 0;
function Account() {
  const [panel, setPanel] = useState({component:AccountTools[0]});
  const handleMenu = (num) =>{
    counter = num
    setPanel({component: AccountTools[num]})
  }
  const infoPanel = useRef();
  const handleFullScreen = ()=>{
    
    const element = infoPanel.current;
    if(element.style.left == "0px"){
      element.style.left= "200px"
      
    }else{
      element.style.left = 0
    }
    
  }
  return (
    <div className='account-setting fade-in'>
      <section className='menu'>
          <div className='account-profile'>
              <img src={BytesToFile(localStorage.getItem("image"))} alt='avatar'/>
              <h2>{localStorage.getItem("name")+" "+localStorage.getItem("lastName")}</h2>
          </div>
          <ul>
            <li className={counter == 0 ? "active": ""} onClick={() => handleMenu(0)}><i className='bi bi-house-door-fill'></i> Account</li>
            <li className={counter == 1 ? "active": ""} onClick={() => handleMenu(1)}><i className='bi bi-key-fill'></i> Password</li>
            <li className={counter == 2 ? "active": ""} onClick={() => handleMenu(2)}><i className='bi bi-shield-fill'></i> Security</li>
            <li className={counter == 3 ? "active": ""} onClick={() => handleMenu(3)}><i className='bi bi-bell-fill'></i> Notification</li>
          </ul>
      </section>
      <section className='panel' ref={infoPanel}>
      <span className='full-screen-panel' onClick={handleFullScreen} ><i className='bi bi-filter-left'></i></span>
        <panel.component />
      </section>
    </div>
  )
}

export default Account