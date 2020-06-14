import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <div>

        <h2>My Stock Block</h2>
        <p>This block will help to visualize your stock
		quickly and see the main KPI for the follow up ;
        main type of material, output vs input , value of the stock,
        number of  items, </p>
		<p> some configuration have to be done before to start :  </p>
        <ul>
			<li> Rename the data base; </li>
			<li> Create the field with the exact name;  </li>
			<li> Add your stock  in the system; </li>
			<li> Finally visualize and use the KPI; </li>
		</ul>
		<p>It is very usefull for the sourcing or the warehouse manager
			to know and anticipate which items to order and what is the 
			items to be discounted or depreciated </p>
      </div>
    );
  }
}
 
export default Home;