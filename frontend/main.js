import React, { Component, } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import kpi from "./kpi";
import InitBase from "./InitBase";
import item_information from "./item_information";
const Index = React.lazy(() => import('./Index'));
import Apply_CSS from "./Apply_CSS";

import ErrorBoundary from "./ErrorBoundary";

import { Loader } from "@airtable/blocks/ui";
const loader_main = <Loader scale={0.5}  fillColor="#33bbaa" />





class Main extends Component {
	

  render() {
	    return (
	<HashRouter>
	
			<div >
			  <h1>My Stock Block</h1>
			 
			  <ul className="header">
				<li className="stock_h"><NavLink to="/">My Stock</NavLink></li>
				<li className="iteem_h"><NavLink to="/item_information">Item information</NavLink></li>
				<li className="dash_board_h"><NavLink to="/kpi">My Dash Board</NavLink></li>
				<li className="InitBase"><NavLink to="/InitBase">Help and Support</NavLink></li>			

			  </ul>
			  <div className="content">
					<React.Suspense fallback={loader_main} >
						<Apply_CSS />

						<Route exact path="/" component={Index}/>
						<Route path="/item_information" component={item_information} />
						<Route path="/kpi" component={kpi}/>
						<Route path="/InitBase" component={InitBase}/>

					</React.Suspense>
			  </div>

			</div>
	
	</HashRouter>
    );
  }
}
 
export default Main;