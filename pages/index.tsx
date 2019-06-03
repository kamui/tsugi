import withApplicationLayout from "tsugi/layouts/with_application_layout"

const Homepage = () => <div>Hello World!</div>

Homepage.getInitialProps = ({ pathname, store }: any) => {
  console.log("Homepage")
  console.log(pathname)
  console.log(store)
  return {
    canonicalPath: "",
    pageCategory: "Homepage",
    title: "Example",
  }
}

export default withApplicationLayout(Homepage)
