import ErrorLayout from "tsugi/layouts/error"
import PropTypes from "prop-types"
import { isClient } from "tsugi/utils/client"

interface ErrorProps {
  err?: Error
  statusCode: number
}

const Error = ({ err, statusCode }: ErrorProps) => {
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

Error.getInitialProps = ({ err, res, jsonPageRes }: any) => {
  const statusCode = res
    ? res.statusCode
    : jsonPageRes
    ? jsonPageRes.status
    : null
  console.log(`Render Error: ${statusCode}`)
  return { err, statusCode }
}

export default Error
