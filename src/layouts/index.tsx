import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import Loading from '@/pages/Loading'
import eventBus from '../util/event'
import { useState } from 'react'
import ResizeHtmlFontSize from '@/utils/resetHtmlFontSize';
const Layout = () => {
  const [active, setActive] = useState(false)
  ResizeHtmlFontSize()
  eventBus.on("enter", (text) => {
    setActive(true)
  });
  return (
    <div >
      <div className={`${active ? Styles.hidden : ''}`}>
        <Loading />
      </div>
      <div className={Styles.page}>
        <IndexPage />
      </div>
    </div>
  )
}

export default Layout
