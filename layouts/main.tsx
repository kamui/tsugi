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
import {
  pageLoaded,
  navigationClicked,
} from "tsugi/redux/actions/current_page_actions"

const mapStateToProps = (state: any) => {
  return state
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClickButton: () => {
      dispatch(navigationClicked("shop"))
    },
    onMount: () => {
      dispatch(pageLoaded())
    },
  }
}

class Main extends React.PureComponent {
  static contextTypes = {
    store: PropTypes.object,
  }

  static propTypes = {
    canonicalPath: PropTypes.string,
    errorStatusCode: PropTypes.number,
    isLoading: PropTypes.bool,
    onClickButton: PropTypes.func,
    onMount: PropTypes.func,
    pageCategory: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    onClickButton: () => {},
    onMount: () => {},
  }

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

  onRouteChangeStart() {}
  onRouteChangeComplete() {}

  componentDidMount() {
    const {} = getConfig()
    const { onMount }: any = this.props

    onMount()
    Router.events.on("routeChangeStart", this.onRouteChangeStart)
    Router.events.on("routeChangeComplete", this.onRouteChangeComplete)
    window.addEventListener("popstate", this.onPopState)
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.onRouteChangeStart)
    Router.events.off("routeChangeComplete", this.onRouteChangeComplete)
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
      onClickButton,
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
          <div className={styles.topContent}>
            <div>HEADER GOES HERE</div>
          </div>

          {/* Page Content */}
          <div className={styles.mainContent} id="main-content">
            {children}
            <button onClick={onClickButton}>click me</button>
          </div>

          <div className={styles.bottomContent}>
            <div>FOOTER GOES HERE</div>
          </div>
        </div>

        {/* TODO: remove */}
        <div className={styles.usedForRebuild} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
