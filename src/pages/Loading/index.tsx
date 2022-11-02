import * as React from 'react'
import { useState } from 'react'
import Styles from './index.module.scss'
import logo from '../../images/logo.png'
import eventBus from '../../util/event'
const Loading = () => {
  const [active, setActive] = useState(false)
  const handleOpen = () => {
    eventBus.emit('enter', 'enter')
    // setActive(true)
  }
  return (
    <div className='layout'>
      <div className={`${Styles.loading} ${active ? Styles.hidden : ''}`}>
        <div className={Styles.logo}></div>
        <div className={Styles.enter} onClick={handleOpen}>进入</div>
      </div>
    </div>
  )
}

export default Loading
