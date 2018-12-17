import "tsugi/lib/polyfills/ie11"
import PropTypes from "prop-types"
import Head from "next/head"
import CustomError from "tsugi/components/error_page/custom_error"
import _static from "tsugi/lib/static"

import styles from "tsugi/styles/layouts/error_layout.css"

const ErrorLayout = ({ title, pageCategory, statusCode }) => (
  <div id="layout-wrapper" data-page-category={ pageCategory }>
    <div className={ styles.topContent }></div>
    <CustomError statusCode= { statusCode } />
  </div>
)

ErrorLayout.propTypes = {
  pageCategory: PropTypes.string,
  statusCode: PropTypes.number,
  title: PropTypes.string,
}

export default ErrorLayout
