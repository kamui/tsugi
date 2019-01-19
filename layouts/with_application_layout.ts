import React from "react"
import "tsugi/lib/polyfills/ie11"
import PropTypes from "prop-types"
import Router from "next/router"
import Head from "next/head"
import { connect } from "react-redux"
import _static from "tsugi/lib/static"
import Error from "tsugi/pages/_error"
import getConfig from "tsugi/config/application"
import styles from "tsugi/styles/layouts/application_layout.css"
import classNames from "classnames"

const mapStateToProps = (state) => {
  return state
}

function wrapPageWithLayout(WrappedComponent) {
  if (WrappedComponent.getInitialProps == undefined) {
    throw new Error(`${WrappedComponent.name} does not define getInitialProps`)
  }

  class ApplicationLayout extends React.PureComponent {
    static contextTypes = {
      store: PropTypes.object,
    }

    static propTypes = {
      canonicalPath: PropTypes.string.isRequired,
      errorStatusCode: PropTypes.number,
      isLoading: PropTypes.bool,
      pageCategory: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }

    static defaultProps = {}

    static getInitialProps = async ({
      asPath,
      pathname,
      query,
      res,
      store,
    }) => {
      const pageRequest = WrappedComponent.getInitialProps({
        pathname,
        query,
        store,
        res,
      }) // current page data
      return {}
    }

    componentDidMount() {
      const {} = getConfig()

      Router.onRouteChangeStart = (url) => {}

      Router.onRouteChangeComplete = (url) => {}

      window.addEventListener("popstate", this.onPopState)
    }

    componentWillUnmount() {
      Router.onRouteChangeComplete = null
      Router.onRouteChangeStart = null
      window.removeEventListener("popstate", this.onPopState)
    }

    onPopState = (e) => {}

    render() {
      const {
        canonicalPath,
        errorStatusCode,
        pageCategory,
        title,
        isLoading,
      } = this.props

      if (errorStatusCode) {
        return <Error statusCode={errorStatusCode} />
      }

      return (
        <div
          id="layout-wrapper"
          className={classNames(styles.applicationLayout)}
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
              <WrappedComponent {...this.props} />
            </div>

            <div className={styles.bottomContent} />
          </div>

          {/* TODO: remove */}
          <div className={styles.usedForRebuild} />
        </div>
      )
    }
  }

  return connect(
    mapStateToProps,
    () => ({})
  )(ApplicationLayout)
}

export default function withLayout(WrappedComponent) {
  const pageWrappedWithLayout = wrapPageWithLayout(WrappedComponent)
  return connect()(pageWrappedWithLayout)
}