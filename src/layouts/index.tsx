import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import Envelope from '@/pages/Envelope'

function Layout() {
  return (
    <div className={Styles.layout}>
      {/* <Envelope /> */}
      <IndexPage />
    </div>
  )
}

export default Layout
