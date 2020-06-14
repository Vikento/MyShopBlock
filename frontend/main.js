import React, { Component,
useState
 } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import kpi from "./kpi";
import item_information from "./item_information";
const Index = React.lazy(() => import('./Index'));
import {loadCSSFromString} from '@airtable/blocks/ui';

import {
    Box,
    Heading,
    initializeBlock,
    Text,
    useBase,
    useViewMetadata,
    useWatchable,
    useRecords,
    expandRecord,
} from '@airtable/blocks/ui';
import {cursor} from '@airtable/blocks';
import ReactDOM from "react-dom";
//import React from 'react';

import { Button } from "@airtable/blocks/ui";

import { Loader } from "@airtable/blocks/ui";
const loaderExample = <Loader scale={0.5}  fillColor="#33bbaa" />;




const FIELD_ID_WIDTH_PERCENTAGE = '30%';
const FIELD_DESCRIPTION_WIDTH_PERCENTAGE = '55%';
const FIELD_QUANTITY_WIDTH_PERCENTAGE = '15%';
const Couleur_BBC = "#FF9F1C";

// css list for first page
loadCSSFromString('body {padding: 20px;  margin: 0;  color: #011627;} h1, h2, p, ul, li {font-family: sans-serif;text-align: center;  } ');
loadCSSFromString('ul.header li {  display: inline-block;  list-style-type: none;  margin: auto; } ul.header { border-radius: 25px; border: 5px solid #E71D36; background-color: #2EC4B6;  padding: 0;}'); 
loadCSSFromString('ul.header li a {  color: #FFF;  font-weight: bold;  text-decoration: none;  padding: 20px;  display: inline-block;  border-radius: 25px; border: 2px solid #2EC4B6 } ');
loadCSSFromString('.content {  background-color:rgba(250,250,250,0.7);  padding: 20px; border-radius: 25px; border: 2px solid #E71D36 ; } .content h2 {  padding: 0;  margin: 0;}');
loadCSSFromString(' .content li {  margin-bottom: 10px; text-align: left;} a:hover { background: #FF9F1C; border-radius: 25px; border: 2px solid #FF9F1C } ');
loadCSSFromString('box.tittle {font-size: 25px; text-align: center;  background: #FF9F1C ; border: 15px solid #FF9F1C; border-radius: 25px }' );

// personnalized color 
loadCSSFromString('body {background-color:' + Couleur_BBC);

//css from index 
// CSS de index.js
loadCSSFromString(' .box_list_item {max-height:50px; max-width: 50px; overflow-y: scroll;} h1 { text-align: center; }  ');
loadCSSFromString(' box.tittle {font-size: 25px; text-align: center;  background: #FFBE0B ; border: 15px solid #FFBE0B; border-radius: 25px } ');
loadCSSFromString(' v2 { text-align: center; } ');
loadCSSFromString(' .height_defin { max-height:500px; overflow:auto; }');
loadCSSFromString(' a { display: inline;  list-style-type: none;  margin: 0; padding: 0; color: #111;} core_list {pointer-events:none; }  a:hover { background: #FFBE0B ; border: 5px solid #FFBE0B; border-radius: 10px } ');
loadCSSFromString(' div.Select_css { background: rgba(155, 155, 155, 0.3); display: flex; align-items: center ; margin: 0; padding: 0; color: #fff; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); min-height: 30px; border: 2px solid ; border-color: #2EC5B6; border-radius: 5px; text-align: center;} ');
loadCSSFromString(' .Select_css1 { background: rgba(0, 0, 0, 0.3); color: #fff; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); min-height: 30px; border: 2px solid coral; border-radius: 5px;} ');

// CSS KPI
loadCSSFromString(' .column1g{ border-radius: 25px; float: left;   width: 100%;  border: 2px solid #E71D36; padding: 10px;  margin: 20px; position: relative;} .column2g{  border-radius: 25px; float: left;   width: 100%;  border: 2px solid #E71D36; padding: 10px;  margin: 20px; position: relative;} h1 { text-align: center; } ');
// FIN CSS


//CSS item_information
//
// CSS de index.js
loadCSSFromString('img.displayed {display: block; margin-left: auto; margin-right: auto;} .row { display : flex;} .column1{  float: left;   width: 100%;} .column2{ width:100%; height:100%;}  h1 { text-align: center; }  ' );
//
// CSS for the scrolling menu
loadCSSFromString('#demoFont {list-style-type :none ; position: absolute;  font-family: Arial, Helvetica, sans-serif;font-size: 14px;letter-spacing: 0px;word-spacing: 0px;color: #C2281B;font-weight: 400;text-decoration: none solid rgb(68, 68, 68);font-style: normal;font-variant: normal;text-transform: none; min-width: 300px; max-height: 150px;  overflow-y: auto; background-color : white;}');
//
// CSS for the input composant 
loadCSSFromString('#donne_enregistre {min-width : 300px; height : 28px; font-size: 14px;}');
//
// FIN CSS item_information




function Change_background() {
	const base = useBase()
	const [tableName, setTableName] = useState('Configuration CSS');
	const table_css = base.getTableByNameIfExists(tableName);

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
	

		console.log(" l 68 recode " + source_image ); 
	loadCSSFromString('body { background-image: url(' + source_image+')');
	
	return <div> </div>
}
 
class Main extends Component {
	
  render() {
	    return (
	<HashRouter>
			<div >
			  <h1>My Stock Block</h1>
			 
			  <ul className="header">
				<li className="home_h"><NavLink to="/">Home</NavLink></li>
				<li className="stock_h"><NavLink to="/index">My Stock</NavLink></li>
				<li className="iteem_h"><NavLink to="/item_information">Item information</NavLink></li>
				<li className="dash_board_h"><NavLink to="/kpi">My Dash Board</NavLink></li>
				<li className="help_h"><NavLink to="/contact">Contact</NavLink></li>
			  </ul>
			  <div className="content">
					<React.Suspense fallback={loaderExample} >
						<Change_background />
						<Route exact path="/" component={Home}/>
						<Route path="/index" component={Index}/>
						<Route path="/item_information" component={item_information} />
						<Route path="/kpi" component={kpi}/>
						<Route path="/contact" component={Contact}/>
					</React.Suspense>
			  </div>

			</div>
		</HashRouter>
    );
  }
}
 
export default Main;