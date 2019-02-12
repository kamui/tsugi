import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import Cta from "tsugi/components/cta"
import styles from "tsugi/styles/components/error_page/custom_error.css"

const CustomError = ({ statusCode }) => (
  <div
    className={classNames(
      "component",
      "error-component",
      styles.component,
      styles.center,
      styles.secondary
    )}
  >
    <section className={styles.copy}>
      <h1 className={styles.title}>
        {statusCode === 404
          ? "Sorry, the page you were looking for could not be found."
          : null}
        {statusCode === 401
          ? "Sorry, you are not authorized to access this resource"
          : null}
        {statusCode === 409 ? "Sorry, cart is currently being modified" : null}
        {![401, 404, 409].includes(statusCode)
          ? "This page needs some tailoring..."
          : null}
      </h1>
      {statusCode >= 500 && (
        <h2 className={styles.description}>
          We apologize but we’re experiencing an internal server problem. Please
          check back soon or contact us at
          <a
            aria-label="Open a new email to ninjas@bonobos.com "
            href="mailto:ninjas@bonobos.com"
          >
            {" "}
            ninjas@bonobos.com{" "}
          </a>
          for immediate assistance.
        </h2>
      )}
      <div className={styles.ctaContainer}>
        <Cta align="inline" href="/" layout="primary" tabIndex="0">
          Return to the homepage
        </Cta>
      </div>
    </section>
  </div>
)

CustomError.propTypes = {
  statusCode: PropTypes.number,
}

export default CustomError
