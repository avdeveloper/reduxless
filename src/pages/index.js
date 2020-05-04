import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { CustomerContext } from '../state/customer';

const IndexPage = () => {
  const { actions, state } = React.useContext(CustomerContext);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <button onClick={() => actions.fetchCustomer()} disabled={state.isLoading}>Fetch customer</button>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
}

export default IndexPage
