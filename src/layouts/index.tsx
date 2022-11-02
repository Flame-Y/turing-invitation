import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import Loading from '@/pages/Loading'
import eventBus from '../util/event'
import { useState } from 'react'

const Layout = () => {
  const [active, setActive] = useState(false)

  eventBus.on("enter", (text) => {
    setActive(true)
  });
  return (
    <div >
      <div className={`${Styles.load} ${active ? Styles.hidden : ''}`}>
        <Loading />
      </div>
      <div className={Styles.page}>
        <IndexPage />
      </div>
    </div>
  )
}

export default Layout
