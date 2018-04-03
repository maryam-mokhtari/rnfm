import React from 'react'
import Route from 'react-router/lib/Route'
import App from './containers/App'
import VmbillsPage from './containers/VmbillsPage'
import VmSinglePage from './containers/VmSinglePage'
import SupportPage from './containers/SupportPage'
import VmNewInvoicePage from './containers/VmNewInvoicePage'
import {requireAuthentication} from './AuthenticatedComponent'

export default (
  <Route path="" component={App}>
    <Route path="/vm/support" component={SupportPage}/>
    <Route path="/vm/search/:query" component={requireAuthentication(VmbillsPage)}/>
    <Route path="/vm/search/host/:query" component={requireAuthentication(VmbillsPage)}/>
    <Route path="/vm/order/hpc" component={requireAuthentication(VmNewInvoicePage)} />
    <Route path="/vm/order/host" component={requireAuthentication(VmNewInvoicePage)} />
    <Route path="/vm/order" component={requireAuthentication(VmNewInvoicePage)} />
    <Route path="/vm/hpc" component={requireAuthentication(VmbillsPage)} />
    <Route path="/vm/host" component={requireAuthentication(VmbillsPage)} />
    <Route path="/vm/host/:name/:tab/:subtab" component={requireAuthentication(VmSinglePage)} />
    <Route path="/vm/host/:name/:tab" component={requireAuthentication(VmSinglePage)} />
    <Route path="/vm/host/:name" component={requireAuthentication(VmSinglePage)} />
    <Route path="/vm/:name/:tab/:subtab" component={requireAuthentication(VmSinglePage)} />
    <Route path="/vm/:name/:tab" component={requireAuthentication(VmSinglePage)} />
    <Route path="/vm/:name" component={requireAuthentication(VmSinglePage)} />
    <Route path="/vm/" component={requireAuthentication(VmbillsPage)} />
    <Route path="/vm" component={requireAuthentication(VmbillsPage)} />
  </Route>
)
