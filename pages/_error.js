import ErrorLayout from "tsugi/layouts/error_layout"
import PropTypes from "prop-types"
import { isClient } from "tsugi/utils/client"

const Error = ({ err, statusCode }) => {

  // Prevent duplicate render for server-side error
  // https://github.com/zeit/next.js/issues/2573
  if (isClient && err && err.message === "500 - Internal Server Error.")
    return null

  return (
    <ErrorLayout
      title="Site"
      pageCategory="Page Not Found"
      statusCode={statusCode}
    />
  )
}

Error.propTypes = {
  err: PropTypes.object,
  statusCode: PropTypes.number,
}

Error.getInitialProps = ({ err, res, jsonPageRes }) => {
  const statusCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null)
  return { err, statusCode }
}

export default Error
