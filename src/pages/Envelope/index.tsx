import * as React from 'react'
import { useState } from 'react'
import Styles from './index.module.scss'
import logo from '../../images/队徽.png'
import eventBus from '../../util/event'
const Envelope = () => {
  const [active, setActive] = useState(false)
  const handleOpen = () => {
    setActive(true)
    setInterval(() => {
      eventBus.emit('message', 'hello world')
    }, 5000)
  }
  return (
    <div className='layout'>
      <div className={`${Styles.envelope} ${active ? Styles.active : ''} `}>
        <div className={Styles.top}></div>
        <div className={Styles.tag} onClick={handleOpen}>
          <img className={Styles.logo} src={logo} alt='' />
        </div>
        <div className={Styles.card}></div>
      </div>
    </div>
  )
}

export default Envelope
