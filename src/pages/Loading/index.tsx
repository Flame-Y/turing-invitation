import * as React from 'react'
import { useState } from 'react'
import Styles from './index.module.scss'
import logo from '../../images/TR_logo.png'
import eventBus from '../../util/event'
const Loading = () => {
  const [active, setActive] = useState(false)
  const [num, setNum] = useState(0)
  eventBus.on("message", (url, itemsLoaded, itemsTotal) => {
    console.log(
      "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
    );
    setNum(itemsLoaded / itemsTotal * 100)
  });
  const handleOpen = () => {
    eventBus.emit('enter', 'enter')
    // setActive(true)
  }
  return (
    <div className={`${Styles.loading}`}>
      <div className={Styles.logo}>
        <img className={Styles.logoInside} src={logo} alt='' />
      </div>
      <div className={Styles.name}>TuringTeam Invitation</div>
      <div className={Styles.progress}>{num}%</div>
      <div className={Styles.enter} onClick={handleOpen}>进入</div>
    </div>
  )
}

export default Loading
