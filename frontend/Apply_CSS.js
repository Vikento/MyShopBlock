import {
    useBase,
    useRecords,
} from '@airtable/blocks/ui';


import {loadCSSFromString} from '@airtable/blocks/ui';

// importation of the all my const
// to change some table name, field, dimension, it is possible to change the 
// the file myConstClass
import * as myConstClass from "./myConstClass.js";



// CSS Africa
// css list for first page
loadCSSFromString('body {padding: 20px;  margin: 0;  color: #011627;} h2, p, ul, li {font-family: sans-serif; } h1 {font-family: sans-serif; text-align: center; }');
loadCSSFromString('ul.header li {  display: inline-block;  list-style-type: none;  margin: auto;  } ul.header { border-radius: 25px; border: 5px solid #E71D36; background-color: #2EC4B6;  padding: 0; text-align: center;}'); 
loadCSSFromString('ul.header li a {  color: #FFF;  font-weight: bold;  text-decoration: none;  padding: 20px;  display: inline-block;  border-radius: 25px; border: 2px solid #2EC4B6 } ');
loadCSSFromString('.content {  background-color:rgba(250,250,250,0.7);  padding: 20px; border-radius: 25px; border: 2px solid #E71D36 ; } .content h2 {  padding: 0;  margin: 0;}');
loadCSSFromString('.content li {  margin-bottom: 10px; text-align: left;} ');
loadCSSFromString('a:hover { background: #FF9F1C; border-radius: 25px; border: 2px solid #FF9F1C }');
loadCSSFromString('box.tittle {font-size: 25px; text-align: center;  background: #FF9F1C ; border: 15px solid #FF9F1C; border-radius: 25px }' );

// Background color :
loadCSSFromString('body {background-color:' + myConstClass.Couleur_BBC + '}');


//css from index 
// CSS de index.js
loadCSSFromString(' .box_list_item {max-height:50px; max-width: 50px; overflow-y: scroll;}   ');

// Title in the middle of the screen - My Dash Board or Item information or My Stock
loadCSSFromString(' box.tittle {font-size: 25px; text-align: center;  background: #FFBE0B ; border: 15px solid #FFBE0B; border-radius: 25px } ');

loadCSSFromString(' v2 { text-align: center; } ');
loadCSSFromString(' .height_defin { max-height:500px; overflow:auto; }');
loadCSSFromString(' a { display: inline;  list-style-type: none;  margin: 0; padding: 0; color: #111;} core_list {pointer-events:none; } ');

// Primary Key - in module My Stock for the item ID , first column
loadCSSFromString(' div.Select_css { background: rgba(155, 155, 155, 0.3); display: flex; align-items: center ; margin: 0; padding: 0; color: #222; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); min-height: 30px; border: 2px solid ; border-color: #2EC5B6; border-radius: 5px; text-align: center;} ');

// Select - in module My Stock for the second and third colum
loadCSSFromString(' .Select_css1 { background: rgba(0, 0, 0, 0.3); color: #fff; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); min-height: 30px; border: 2px solid coral; border-radius: 5px;} ');

// Select 
loadCSSFromString(' .Select_css2 { background: rgba(255, 190, 11, 0.9); align-items: center ; margin: 10px; ; padding: 0; color: #222; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4); min-height: 30px; border: 2px solid ; border-color: #C2281B; border-radius: 5px; text-align: center;} ');



// CSS KPI
loadCSSFromString(' .column1g{  border-radius: 25px; float: left;   width: 100%;  border: 2px solid #E71D36; padding: 10px;  margin: 20px; position: relative;} .column2g{  border-radius: 25px; float: left;  width: 100%;  border: 2px solid #E71D36; padding: 10px;  margin: 20px; position: relative;}');

// FIN CSS KPI

// CSS de index.js + item information
loadCSSFromString('img.displayed {display: block; margin-left: auto; margin-right: auto;  max-width: 95%; max-height: 300px; } .row { display : flex;} .column1{  float: left;  width: 60%;} .column2{ width:100%; height:100%; display: inline-block} ' );
loadCSSFromString(' ul.column1{ text-align: left ; display: inline-block; }');
loadCSSFromString(' ul.bloc { word-wrap: break-word; max-width: 95% ; }');
//loadCSSFromString(' ul.bloc_image { word-wrap: break-word; max-width: 150px; max-height: 150px; }');
//loadCSSFromString(' ul.bloc { word-wrap: break-word; max-width: 95% ; }');
// END CSS de index.js + item information


// CSS for the scrolling menu
loadCSSFromString('#demoFont {list-style-type :none ; position: absolute;  font-family: Arial, Helvetica, sans-serif;font-size: 14px;letter-spacing: 0px;word-spacing: 0px;color: #C2281B;font-weight: 400;text-decoration: none solid rgb(68, 68, 68);font-style: normal;font-variant: normal;text-transform: none; min-width: 300px; max-height: 150px;  overflow-y: auto; background-color : white;}');
// END  CSS for the scrolling menu

// CSS for the input composant 
loadCSSFromString('#donne_enregistre {min-width : 300px; height : 28px; font-size: 14px;}');
//
// END CSS for the input composant



//
// function to check the user is authorized to get indicator
// we parameter that all the user list in field const KPI_USER_AUTORIZE can see the indicator
// except the indicator for all as List_of_log_fonction()



function Apply_CSS(){



    return null;

}


 export default Apply_CSS;    