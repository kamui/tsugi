import Main from "tsugi/layouts/main"

const Homepage = ({ canonicalPath, pageCategory, title }: any) => (
  <Main canonicalPath={canonicalPath} pageCategory={pageCategory} title={title}>
    <p>Hello World!</p>
  </Main>
)

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

export default Homepage
