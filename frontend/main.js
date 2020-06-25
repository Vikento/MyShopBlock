import React, { Component,
useState
 } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import kpi from "./kpi";
import InitBase from "./InitBase";
import item_information from "./item_information";
const Index = React.lazy(() => import('./Index'));
import {loadCSSFromString} from '@airtable/blocks/ui';

import {
    useBase,
    useRecords,
} from '@airtable/blocks/ui';


import { Loader } from "@airtable/blocks/ui";
const loaderExample = <Loader scale={0.5}  fillColor="#33bbaa" />

// importation of the const from myConstClass
// to change some table name, field, dimension, it is possible to change the 
// the file myConstClass
import * as myConstClass from "./myConstClass.js";


// css list for first page
loadCSSFromString('body {padding: 20px;  margin: 0;  color: #011627;} h2, p, ul, li {font-family: sans-serif; } h1 {font-family: sans-serif; text-align: center; }');
loadCSSFromString('ul.header li {  display: inline-block;  list-style-type: none;  margin: auto;  } ul.header { border-radius: 25px; border: 5px solid #E71D36; background-color: #2EC4B6;  padding: 0; text-align: center;}'); 
loadCSSFromString('ul.header li a {  color: #FFF;  font-weight: bold;  text-decoration: none;  padding: 20px;  display: inline-block;  border-radius: 25px; border: 2px solid #2EC4B6 } ');
loadCSSFromString('.content {  background-color:rgba(250,250,250,0.7);  padding: 20px; border-radius: 25px; border: 2px solid #E71D36 ; } .content h2 {  padding: 0;  margin: 0;}');
loadCSSFromString('.content li {  margin-bottom: 10px; text-align: left;} a:hover { background: #FF9F1C; border-radius: 25px; border: 2px solid #FF9F1C } ');
loadCSSFromString('box.tittle {font-size: 25px; text-align: center;  background: #FF9F1C ; border: 15px solid #FF9F1C; border-radius: 25px }' );

loadCSSFromString('body {background-color:' + myConstClass.Couleur_BBC);

//css from index 
// CSS de index.js
loadCSSFromString(' .box_list_item {max-height:50px; max-width: 50px; overflow-y: scroll;}   ');
loadCSSFromString(' box.tittle {font-size: 25px; text-align: center;  background: #FFBE0B ; border: 15px solid #FFBE0B; border-radius: 25px } ');
loadCSSFromString(' v2 { text-align: center; } ');
loadCSSFromString(' .height_defin { max-height:500px; overflow:auto; }');
loadCSSFromString(' a { display: inline;  list-style-type: none;  margin: 0; padding: 0; color: #111;} core_list {pointer-events:none; }  a:hover { background: #FFBE0B ; border: 5px solid #FFBE0B; border-radius: 10px } ');
loadCSSFromString(' div.Select_css { background: rgba(155, 155, 155, 0.3); display: flex; align-items: center ; margin: 0; padding: 0; color: #fff; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); min-height: 30px; border: 2px solid ; border-color: #2EC5B6; border-radius: 5px; text-align: center;} ');
loadCSSFromString(' .Select_css1 { background: rgba(0, 0, 0, 0.3); color: #fff; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); min-height: 30px; border: 2px solid coral; border-radius: 5px;} ');

// CSS KPI
loadCSSFromString(' .column1g{  border-radius: 25px; float: left;   width: 100%;  border: 2px solid #E71D36; padding: 10px;  margin: 20px; position: relative;} .column2g{  border-radius: 25px; float: left;   width: 100%;  border: 2px solid #E71D36; padding: 10px;  margin: 20px; position: relative;}');

// FIN CSS KPI

// CSS de index.js + item information
loadCSSFromString('img.displayed {display: block; margin-left: auto; margin-right: auto;} .row { display : flex;} .column1{  float: left;  width: 60%;} .column2{ width:100%; height:100%; display: inline-block} ' );
loadCSSFromString(' ul.column1{ text-align: left ; display: inline-block; }');
loadCSSFromString(' ul.bloc { word-wrap: break-word; max-width: 95% ; }');
// END CSS de index.js + item information


// CSS for the scrolling menu
loadCSSFromString('#demoFont {list-style-type :none ; position: absolute;  font-family: Arial, Helvetica, sans-serif;font-size: 14px;letter-spacing: 0px;word-spacing: 0px;color: #C2281B;font-weight: 400;text-decoration: none solid rgb(68, 68, 68);font-style: normal;font-variant: normal;text-transform: none; min-width: 300px; max-height: 150px;  overflow-y: auto; background-color : white;}');
// END  CSS for the scrolling menu

// CSS for the input composant 
loadCSSFromString('#donne_enregistre {min-width : 300px; height : 28px; font-size: 14px;}');
//
// END CSS for the input composant


// fonction test to get image from table and put as background picture
function Change_background() {
	const base = useBase()
	const [tableName, setTableName] = useState('Configuration CSS');
	const table_css = base.getTableByNameIfExists(tableName);

	if (table_css){ 
		let records_id = useRecords(table_css, {fields: ['Attachments']});
		let img = records_id[0].getCellValueAsString('Attachments');
		let source_image = "";
			
			for (let i = 0; i < img.length; i++) {
					if (img[i] == "("){
						source_image = "";
						
						while (img[i] != ")") {
							i = i + 1;
							if ((img[i] != ")") && (i < img.length)){
								source_image = source_image + img[i];
							}
						}
					}	
			}	
		loadCSSFromString('body { background-image: url(' + source_image+')');
		
	}
	else {
		// ne rien faire
	}
	return <div> </div>
}
 
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
					<React.Suspense fallback={loaderExample} >
						<Change_background />
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