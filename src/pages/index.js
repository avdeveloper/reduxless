import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { CustomerContext } from '../state/customer';

const IndexPage = () => {
  const { actions, state } = React.useContext(CustomerContext);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <div>
        {'sprites' in state.data ? (
          <div>
            <img src={state.data.sprites.front_default} />
            <p>{state.data.name}</p>
          </div>
        ) : <p>Push the button</p>}
      </div>
      <button onClick={() => actions.fetchCustomer()} disabled={state.isLoading}>Fetch customer</button>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
}

export default IndexPage
