import React, { MouseEvent } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "tsugi/styles/components/cta.css"

export interface CtaProps {
  align?: string
  children: string
  className?: string
  href?: string
  isLink?: boolean
  layout?: string
  onClick(e: MouseEvent<HTMLElement>): void
  tabIndex?: string
}

const Cta = ({
  align,
  children,
  className,
  href,
  isLink,
  layout,
  onClick,
}: // ...other
CtaProps) => (
  <a
    className={classNames(
      "component",
      "cta-component",
      styles.component,
      className,
      align && styles[align],
      layout && styles[layout],
      isLink && styles.link
    )}
    href={href}
    onClick={onClick}
    // {...other}
  >
    {children}
  </a>
)

Cta.propTypes = {
  align: PropTypes.oneOf(["block", "stretch", "inline"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  isLink: PropTypes.bool,
  layout: PropTypes.oneOf(["primary", "transparent", "outline"]),
  onClick: PropTypes.func,
}

Cta.defaultProps = {
  align: "block",
  isLink: false,
  layout: "primary",
  onClick: () => {},
}

export default Cta
