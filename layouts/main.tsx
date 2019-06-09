import React from "react"
import "tsugi/lib/polyfills/ie11"
import PropTypes from "prop-types"
import Router from "next/router"
import Head from "next/head"
import { connect } from "react-redux"
import _static from "tsugi/lib/static"
import ErrorPage from "tsugi/pages/_error"
import getConfig from "tsugi/lib/config"
import styles from "tsugi/styles/layouts/main.css"
import classNames from "classnames"

const mapStateToProps = (state: any) => {
  return state
}

class Main extends React.PureComponent {
  static contextTypes = {
    store: PropTypes.object,
  }

  static propTypes = {
    canonicalPath: PropTypes.string,
    errorStatusCode: PropTypes.number,
    isLoading: PropTypes.bool,
    pageCategory: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {}

  // static getInitialProps = async ({
  //   // asPath,
  //   pathname,
  //   query,
  //   res,
  //   store,
  // }: any) => {
  //   const pageRequest = WrappedComponent.getInitialProps({
  //     pathname,
  //     query,
  //     store,
  //     res,
  //   }) // current page data
  //   return {}
  // }

  componentDidMount() {
    const {} = getConfig()

    Router.onRouteChangeStart = (url) => {
      console.log(url)
    }

    Router.onRouteChangeComplete = (url) => {
      console.log(url)
    }

    window.addEventListener("popstate", this.onPopState)
  }

  componentWillUnmount() {
    Router.onRouteChangeComplete = undefined
    Router.onRouteChangeStart = undefined
    window.removeEventListener("popstate", this.onPopState)
  }

  onPopState = (e: Event) => {
    console.log(e)
  }

  render() {
    const {
      canonicalPath,
      errorStatusCode,
      pageCategory,
      title,
      // isLoading,
      children,
    }: any = this.props

    if (errorStatusCode) {
      return <ErrorPage statusCode={errorStatusCode} />
    }

    return (
      <div
        id="layout-wrapper"
        className={classNames(styles.main)}
        data-page-category={pageCategory}
      >
        <Head>
          <title key="title">{title}</title>
          <link
            key="canonical"
            href={`http://localhost:3001${canonicalPath}`}
            rel="canonical"
          />
          <meta
            key="meta-description"
            content="Example"
            name="description"
            property="og:description"
          />
          {/* <link key="application-stylesheet" rel="stylesheet" type="text/css" href={ _static("application.bundle.css") } /> */}
        </Head>
        <div className={styles.mainContentContainer}>
          <div className={styles.topContent} />

          {/* Page Content */}
          <div className={styles.mainContent} id="main-content">
            {children}
          </div>

          <div className={styles.bottomContent} />
        </div>

        {/* TODO: remove */}
        <div className={styles.usedForRebuild} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  () => ({})
)(Main)
