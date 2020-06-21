import {
    Box,
    Heading,
    useBase,
    useWatchable,
    useRecords,
} from '@airtable/blocks/ui';
import {cursor} from '@airtable/blocks';
import React, {useState} from 'react';
import {globalConfig} from '@airtable/blocks';
import {session} from '@airtable/blocks';
import ErrorBoundary from "./ErrorBoundary";
import { Button, Dialog, Text } from "@airtable/blocks/ui";
import { Select } from "@airtable/blocks/ui";
import { Input } from "@airtable/blocks/ui";
import {FieldType} from '@airtable/blocks/models';

const INVENTORY_WAREHOUSE = "Inventory List";
const NAME_TABLE_KPI_VLOOKUP = "Dashboard Table VLookup";

//--------- const Name of the field for the Dashboard Table Vlookup :
// TO BE Modified if you want to personalize the field name of NAME_TABLE_KPI_VLOOKUP
const FIELD_NAME_KPI = "Name KPI";
const FIELD_NAMETABLE = "NameTable";
const FIELD_NAMEFIELD = "NameField";
const FIELD_NAMEFIELD_TARGETED = "NameField targeted";
const FIELD_SELECTCONDITION = "SelectCondition";

//--------- END Const Name of the field for the Dashboard Table Vlookup :

// --------   Condition possible for now : ---------------------------
const VALMAX_COND = "ValMax";
const VALMIN_COND = "ValMin";
const VALMEDIAN_COND = "Val_Median";
// --------   Condition possible for now : ---------------------------

//--------- Constant to limit the number of caracter of the name of KPI
const MAX_NB_CHAR_KPI_NAME = 15;
//------------------------

function kpi() {
	
	const my_key = globalConfig.get('key_primary');
	
	console.log("Key my_key " + my_key);

    const base = useBase();

 
    // useWatchable is used to re-render the block whenever the active table or view changes.
    useWatchable(cursor, ['activeTableId', 'activeViewId']);


	const [tableName, setTableName] = useState(INVENTORY_WAREHOUSE);


	const table = base.getTableByNameIfExists(tableName);


    if (table) {
        return <TableSchema base={base} table={table} item_key_primary={my_key} />;
    } else {


        return ( 
			<div>
				<h2> My KPI : </h2>
				<p> </p>
				Error : No base with the name "Inventory List" . For the full functionnality you have to create a Table with the name of "Inventory List" as following :
				<p> </p>
				<img src="https://i.postimg.cc/52P43k6F/Change-Name-Table.gif" width="100%" />
				When you create the "Inventory List", you can reload or refresh the page.
				<p> </p>
				If it is still not working, please contact the dev team. Thank you !
		</div>
		);
    }
}

// implemented indicator base on the "Inventory List" including all the  
// field 
function List_of_log_fonction() {
	
	const base = useBase();
	

	const table_warehouse_stock = base.getTable(INVENTORY_WAREHOUSE);
	let my_record_historique = useRecords(table_warehouse_stock);

	let compteur_log = 0;
	let list_of_log_quantity = new Array();
	let id_log_no_ok = new Array();
	let name_log_no_ok = new Array();
	let value_log_no_ok = new Array();
	let target_nb_item_log_no_ok = new Array();
	let target_stock_min = new Array();
	let total_stock = new Array();
	let list_of_log_value = new Array();
		let check_stock_exist = false;
		let Threshold_Alarm_exist = false;
		let Total_Stock_exist  = false;
		let Product_Code_Serrial_exist = false;
		let Name_exist = false;
		let Threshold_total_Value_exist = false;
		let total_value_exist = false;
		let Check_total_Value_exist = false ;
		let alert_logv2 ;
	

for (let i = 0; i < table_warehouse_stock.fields.length; i++) {
	
		if (table_warehouse_stock.fields[i].name == "Check Stock"){
			check_stock_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == "Threshold Alarm"){
			Threshold_Alarm_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == "Total Stock"){
			Total_Stock_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == "Product Code Serrial Number"){
			Product_Code_Serrial_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == "Name"){
			Name_exist = true;
		}	
			if (table_warehouse_stock.fields[i].name == "Threshold total Value"){
			Threshold_total_Value_exist = true;
		}	
			if (table_warehouse_stock.fields[i].name == "Total Value"){
			total_value_exist = true;
		}	
			if (table_warehouse_stock.fields[i].name == "Check total Value"){
			Check_total_Value_exist = true;
		}	
}

if (check_stock_exist && Threshold_Alarm_exist && Total_Stock_exist && Product_Code_Serrial_exist && Name_exist && Threshold_total_Value_exist  &&  total_value_exist  && Check_total_Value_exist){

 	for (let i = 0; i < my_record_historique.length; i++) {
					// check on the stock limitation
					list_of_log_quantity[compteur_log] = my_record_historique[i].getCellValue("Check Stock");
					target_stock_min[compteur_log] = my_record_historique[i].getCellValue("Threshold Alarm");
					total_stock[compteur_log] = my_record_historique[i].getCellValue("Total Stock");
					
					// name and ID
					id_log_no_ok[compteur_log] = my_record_historique[i].getCellValue("Product Code Serrial Number");
					name_log_no_ok[compteur_log] = my_record_historique[i].getCellValue("Name");
					
					// check on the value
					target_nb_item_log_no_ok[compteur_log] = my_record_historique[i].getCellValue("Threshold total Value");
					value_log_no_ok[compteur_log] = my_record_historique[i].getCellValue("Total Value");
					list_of_log_value [compteur_log] =  my_record_historique[i].getCellValue("Check total Value");
					compteur_log = compteur_log + 1;
	}

	
	// list of personnalized indicators
	  const list_log_KO = [];

		for (let i = 0; i < compteur_log; i++) {
		
			if ((total_stock[i] < target_stock_min[i])){
				list_log_KO.push({
					my_name_log_no_ok : name_log_no_ok[i],
					my_id_log_no_ok : id_log_no_ok[i],
					my_message_log_no_ok : list_of_log_quantity[i] ,
					my_nb_item_log_no_ok : total_stock[i],
					my_target : target_stock_min[i]
				});
			}
			
			if ((value_log_no_ok[i] > target_nb_item_log_no_ok[i])){
				list_log_KO.push({
					my_name_log_no_ok : name_log_no_ok[i],
					my_id_log_no_ok : id_log_no_ok[i],
					my_message_log_no_ok : list_of_log_value[i],
					my_nb_item_log_no_ok : value_log_no_ok[i],
					my_target : target_nb_item_log_no_ok[i]			
				});
			
			}
		}
		

	alert_logv2 = list_log_KO?list_log_KO.map((list_log_KO,index) =>
								<li key={index}>ID : {list_log_KO.my_id_log_no_ok} - {list_log_KO.my_name_log_no_ok} alarm : {list_log_KO.my_message_log_no_ok} current value : {list_log_KO.my_nb_item_log_no_ok} and limit is {list_log_KO.my_target} </li>
							) : null;

}

if (compteur_log != 0) {	
	
	return (	
				<tr>
					<div className="column2g"> 	
						<h2>Current alert :  </h2>
							<div >
								<ul>
									{alert_logv2}
								</ul>
							</div>
				  	</div>
				</tr>
			
				);
	}
else 	return null;

}

//
// function to check the user is authorized to get indicator
function User_check_for_kpi(table,type_field) {
	let shared_personnalized_kpi = false;
	let query = table.selectRecords();
	
	for (let record of query.records){
		let collaborators = record.getCellValue("--USER ONLY--");
		if (collaborators){
			if (session.currentUser) {

					if (type_field == "multipleCollaborators"){
						for (let collaborator of collaborators) {
							if (collaborator.id == session.currentUser.id) {
								shared_personnalized_kpi = true;
								}
							}       
						}
					else if (type_field == "singleCollaborator" ){
						if (collaborators.id == session.currentUser.id){
							shared_personnalized_kpi = true;
						}
					}
					else console.log("type : " + type_field);	
			}			
			else {
				alert("you need to be connected to have access to the personalized KPI");
					shared_personnalized_kpi = false;
				}
		}	
		else {
			//console.log("No collaborator - error l 199 in the field"); 
			} 
			
	}
	
	//console.log("204 shared_personnalized_kpi = " + shared_personnalized_kpi);
	
	return  shared_personnalized_kpi;
}

// get the maximum value of field_value_max in table and 
// return the max and the value for the field_value_max linked to the field_value_max
function ConditionValMax(table, field_value_max, field_target){

let max;
let name_field_targeted;

const my_records_field = useRecords(table, {fields: [field_value_max, field_target]});

// initialisation of max and name_field_targeted
max	= my_records_field[0].getCellValue(field_value_max);
name_field_targeted = my_records_field[0].getCellValue(field_target);

	for (let i = 0; i < my_records_field.length; i++) {
		{
			if ( max < (my_records_field[i].getCellValue(field_value_max))){
				max = my_records_field[i].getCellValue(field_value_max);
				name_field_targeted = my_records_field[i].getCellValue(field_target);
			}
		}
	}
	

return ([max , name_field_targeted]);

}

// get the minimum value of field_value_min in table and 
// return the max and the value for the field_value_min linked to the field_value_min
function ConditionValMin(table, field_value_min, field_target){

	let min;
	let name_field_targeted;
	
	const my_records_field = useRecords(table, {fields: [field_value_min, field_target]});
	
	// initialisation of max and name_field_targeted
	min	= my_records_field[0].getCellValue(field_value_min);
	name_field_targeted = my_records_field[0].getCellValue(field_target);
	
		for (let i = 0; i < my_records_field.length; i++) {
			{
				if ( min > (my_records_field[i].getCellValue(field_value_min))){
					min = my_records_field[i].getCellValue(field_value_min);
					name_field_targeted = my_records_field[i].getCellValue(field_target);
				}
			}
		}
		
	console.log("l 269 - Val Max pour " + field_value_min + " = "  + min + " nom du champ correspondant = " + name_field_targeted);
	
	return ([min , name_field_targeted]);
	
}

// get the value in the middle of the list of value 
function ConditionMedian(table, field_value_median, field_target){

	let med;
	let name_field_targeted;
	
	const my_records_field = useRecords(table, {fields: [field_value_median, field_target]});
	
	// initialisation of max and name_field_targeted
	med	= my_records_field[0].getCellValue(field_value_median);
	name_field_targeted = my_records_field[0].getCellValue(field_target);
	
		for (let i = 0; i < my_records_field.length; i++) {
			{
				if ( med > (my_records_field[i].getCellValue(field_value_median))){
					med = my_records_field[i].getCellValue(field_value_median);
					name_field_targeted = my_records_field[i].getCellValue(field_target);
				}
			}
		}
		
	console.log("l 269 - Val Max pour " + field_value_median + " = "  + med + " nom du champ correspondant = " + name_field_targeted);
	
	return ([med , name_field_targeted]);
	
}

	
// personnalized indicators per user 
function List_of_VlookUp_indicateur() {
	const base = useBase();
	let table_Vlookup ;

	const list_VlookUp_KPI = [];
	let table_Vlookup_KPI_exist = false;
	
	
	// 1 - check if the special field for Vlookup exist
	// 2 - get the information from Vlookup
	// 3 - check line by line all the Vlookup before to create the KPI
	//		3.1 - check if the name of table indicate in the Vlookup table exist. If not STOP
	// 		3.2 - check if the field of table indicate

	for (let i = 0; i < base.tables.length; i++) {

		if (base.tables[i].name == NAME_TABLE_KPI_VLOOKUP){
			table_Vlookup = base.getTableByNameIfExists(base.tables[i].name);
			table_Vlookup_KPI_exist = true;

		}
	}

	if (!table_Vlookup_KPI_exist){
		console.log("Pas de table au Nom de " + NAME_TABLE_KPI_VLOOKUP)

			}
	else{
		// 1 - check if the special field for Vlookup exist

		//

		let FIELD_NAME_KPI_exist = false;
		let FIELD_NAMETABLE_exist = false;
		let FIELD_NAMEFIELD_exist = false;
		let FIELD_NAMEFIELD_TARGETED_exist = false;
		let FIELD_SELECTCONDITION_exist = false;

		for (let i = 0; i < table_Vlookup.fields.length; i++) {
			if (table_Vlookup.fields[i].name == FIELD_NAME_KPI) {
				FIELD_NAME_KPI_exist = true;
			}
			if (table_Vlookup.fields[i].name == FIELD_NAMETABLE) {
				FIELD_NAMETABLE_exist = true;
			}
			if (table_Vlookup.fields[i].name == FIELD_NAMEFIELD) {
				FIELD_NAMEFIELD_exist = true;
			}
			if (table_Vlookup.fields[i].name == FIELD_NAMEFIELD_TARGETED) {
				FIELD_NAMEFIELD_TARGETED_exist = true;
			}
			if (table_Vlookup.fields[i].name == FIELD_SELECTCONDITION) {
				FIELD_SELECTCONDITION_exist = true;
			}
		}

		// tous les champs existent
		if (FIELD_NAME_KPI_exist && FIELD_NAMETABLE_exist &&  FIELD_NAMEFIELD_exist &&
			FIELD_NAMEFIELD_TARGETED_exist && FIELD_SELECTCONDITION_exist){

				const my_records_field = useRecords(table_Vlookup, {fields: [FIELD_NAME_KPI, FIELD_NAMETABLE, FIELD_NAMEFIELD, FIELD_NAMEFIELD_TARGETED,FIELD_SELECTCONDITION]});
				
			
				// 3 - check line by line all the Vlookup before to create the KPI
				for (let i = 0; i < my_records_field.length; i++) {

					if (base.getTableByNameIfExists(my_records_field[i].getCellValue(FIELD_NAMETABLE))){
						let table_selected_ok = base.getTableByNameIfExists(my_records_field[i].getCellValue(FIELD_NAMETABLE));
						
						//		3.1 - check if the name of table indicate in the Vlookup table exist. If not STOP
						let FIELD_FIELD_NAMEFIELD_exist = false;
						let FIELD_NAMEFIELD_TARGETED_exist = false;
							for (let j = 0; j < table_selected_ok.fields.length; j++) {


								if (table_selected_ok.fields[j].name == my_records_field[i].getCellValue(FIELD_NAMEFIELD)){
									FIELD_FIELD_NAMEFIELD_exist = true;
								}
								if (table_selected_ok.fields[j].name == my_records_field[i].getCellValue(FIELD_NAMEFIELD_TARGETED)){
									FIELD_NAMEFIELD_TARGETED_exist = true;
								}
							}

								if (FIELD_FIELD_NAMEFIELD_exist && FIELD_NAMEFIELD_TARGETED_exist){

									//we check case by case depend on the value of condition
									if (my_records_field[i].getCellValue(FIELD_SELECTCONDITION).name == VALMAX_COND){
									
										let val_max_tagret = ["nothing" ,"nothing"];
										val_max_tagret = ConditionValMax(table_selected_ok,my_records_field[i].getCellValue(FIELD_NAMEFIELD),  my_records_field[i].getCellValue(FIELD_NAMEFIELD_TARGETED));
										
										list_VlookUp_KPI.push({
											name_KPI : my_records_field[i].getCellValue(FIELD_NAME_KPI),
											condition_selected : my_records_field[i].getCellValue(FIELD_SELECTCONDITION).name,
											table_checked : my_records_field[i].getCellValue(FIELD_NAMETABLE),
											field_checked : my_records_field[i].getCellValue(FIELD_NAMEFIELD),
											value_cond : val_max_tagret[0],
											field_targeted : val_max_tagret[1]
											});

									}
									else if (my_records_field[i].getCellValue(FIELD_SELECTCONDITION).name == VALMIN_COND){

										let val_max_tagret = ["nothing" ,"nothing"];
										val_max_tagret = ConditionValMin(table_selected_ok,my_records_field[i].getCellValue(FIELD_NAMEFIELD),  my_records_field[i].getCellValue(FIELD_NAMEFIELD_TARGETED));
																			
										list_VlookUp_KPI.push({
											name_KPI : my_records_field[i].getCellValue(FIELD_NAME_KPI),
											condition_selected : my_records_field[i].getCellValue(FIELD_SELECTCONDITION).name,
											table_checked : my_records_field[i].getCellValue(FIELD_NAMETABLE),
											field_checked : my_records_field[i].getCellValue(FIELD_NAMEFIELD),
											value_cond : val_max_tagret[0],
											field_targeted : val_max_tagret[1]
											});
					

									}
									else if (my_records_field[i].getCellValue(FIELD_SELECTCONDITION).name == VALMEDIAN_COND){
										

									}
									else {
										alert("The field " + FIELD_SELECTCONDITION + 
									" hasn't a good value. You need to have in the field " + FIELD_SELECTCONDITION + " the selected Value " +
									VALMAX_COND + " or " + VALMIN_COND + " or " + VALMEDIAN_COND + " . Thank you");

									}

								}
								else {
									alert("One or both field " + FIELD_NAMEFIELD + " and " +  FIELD_NAMEFIELD_TARGETED + 
									"doesn't exist. You need to change and put a correct field name in the table " + 
									NAME_TABLE_KPI_VLOOKUP + " in the fields : " + FIELD_NAMEFIELD + " and " 
									+  FIELD_NAMEFIELD_TARGETED + " . Thank you !");




								}

					
					}
					else {
						alert("The table " + FIELD_NAMETABLE + " doesn't exist. You need to change and put a correct table in the table " + 
						NAME_TABLE_KPI_VLOOKUP + " in the field : " + FIELD_NAMETABLE);

					}






					}
			}

			else {
			console.log("l 317 : champs manquant");
			alert("Some field in " + NAME_TABLE_KPI_VLOOKUP + " doesn't exist. We suggest to delete the complete table of " + NAME_TABLE_KPI_VLOOKUP + " and create new KPI Vlookup. Thank you");
			
			}


	}


	const data_to_show_all_VLOOKUP_KPI =[];


		for (let k = 0; k < list_VlookUp_KPI.length; k++) {
			data_to_show_all_VLOOKUP_KPI.push({
			titre : (list_VlookUp_KPI[k].name_KPI),
			valeur_title : <li >  {list_VlookUp_KPI[k].condition_selected} of {list_VlookUp_KPI[k].field_checked} in {list_VlookUp_KPI[k].table_checked} </li>,
			valeur_unit : <li >  {list_VlookUp_KPI[k].field_targeted} : {list_VlookUp_KPI[k].value_cond} </li>
			
			});	

		}


		const all_element_vlookup = data_to_show_all_VLOOKUP_KPI ? data_to_show_all_VLOOKUP_KPI.map((data_to_show_all_VLOOKUP_KPI,index) => {
	
				return (
			<div className="column2g">
			<h2> {data_to_show_all_VLOOKUP_KPI.titre}  </h2>

			<ul>
				{data_to_show_all_VLOOKUP_KPI.valeur_title}
				{data_to_show_all_VLOOKUP_KPI.valeur_unit}
			</ul>
			</div>
			)
			}) : null;

		return(<div >
				{all_element_vlookup}
			</div>
		)


}
	


// personnalized indicators per user 
function List_of_personalize_indicateur() {
	const base = useBase();	
	
	let table ;
	let my_record;
	let nb_table_DashBoard_perso = 0;
	

// regroupe all the value we got and show to the KPI indicator
const list_KPI = [];

  for (let i = 0; i < base.tables.length; i++) {
  
	 // We look for the Table name starting by DashBoard :
 	 // then we save the table
 
	  if ((base.tables[i].name[0] == "D") && (base.tables[i].name[1] == "a") && (base.tables[i].name[2] == "s") && (base.tables[i].name[3] == "h") && (base.tables[i].name[4] == "B") 
		  && (base.tables[i].name[5] == "o") && (base.tables[i].name[6] == "a") && (base.tables[i].name[7] == "r")&& (base.tables[i].name[8] == "d")) {
			  table = base.getTableByNameIfExists(base.tables[i].name);
			  my_record = useRecords(table);	

			
			for (let j = 0; j < table.fields.length; j++) {
				
				// we check the "--USER ONLY--" field exist and if the current user is part of collaborator (user_field_exist):
				let user_field_exist = false;
								
				if (table.fields[j].name == "--USER ONLY--"){
									
					if (User_check_for_kpi(table,table.fields[j].type)){
						user_field_exist = true;
					
						for (let j = 0; j < table.fields.length; j++) {
								if (((base.tables[i].fields[j].name[0])!= "-") && ((base.tables[i].fields[j].name[1])!= "-") && (user_field_exist == true)){
									list_KPI.push({
										name_variable_indicator : table.fields[j].name,
										am_variable_indicator : my_record[0].getCellValueAsString(table.fields[j].name),
										name_table : table.name
										})
										;					
							 }
							
							
						}
						
					}
				}
			}
		
			nb_table_DashBoard_perso = nb_table_DashBoard_perso + 1;
		}
  }
  
	
	
// order the item by alphebetic order
list_KPI.sort((a, b) => (a.name_variable_indicator > b.name_variable_indicator) ? 1 : -1);


let indicateur_perso_a_visualiser = [];
let a_renvoyer_enssembe_donnees = [];
let name_table_ref = "";

	
	for (let i = 0; i < list_KPI.length; i++) {
		
		if ((i>0) && (name_table_ref == list_KPI[i-1].name_table)) {
			//ne rien faire
		}
		else if (i == 0){
				name_table_ref = list_KPI[i].name_table;
				indicateur_perso_a_visualiser = [];
				
				for (let k = 0; k < list_KPI.length; k++) {
			
						if (list_KPI[k].name_table == name_table_ref)
							{
								indicateur_perso_a_visualiser.push({
									name_variable_indicator : list_KPI[k].name_variable_indicator,
									am_variable_indicator : list_KPI[k].am_variable_indicator
							});
							
							}	
				}
					a_renvoyer_enssembe_donnees.push({
					titre : name_table_ref.substr(9),
					valeur : indicateur_perso_a_visualiser?indicateur_perso_a_visualiser.map((indicateur_perso_a_visualiser,index) =>			
						<li key={index}>  {indicateur_perso_a_visualiser.name_variable_indicator} = {indicateur_perso_a_visualiser.am_variable_indicator} </li>
					) : null
					});	
			
		}
		else {
			
			name_table_ref = list_KPI[i].name_table;
			indicateur_perso_a_visualiser = [];
			
			for (let k = 0; k < list_KPI.length; k++) {

					if (list_KPI[k].name_table == name_table_ref)
						{
						indicateur_perso_a_visualiser.push({
							name_variable_indicator : list_KPI[k].name_variable_indicator,
							am_variable_indicator : list_KPI[k].am_variable_indicator
						});
						}
											
			}
			
				a_renvoyer_enssembe_donnees.push({
				titre : name_table_ref.substr(9),
				valeur : indicateur_perso_a_visualiser?indicateur_perso_a_visualiser.map((indicateur_perso_a_visualiser,index) =>			
					<li key={index}>  {indicateur_perso_a_visualiser.name_variable_indicator} = {indicateur_perso_a_visualiser.am_variable_indicator} </li>
				) : null
				});	
	
		  }
	}	
	
console.log("670 - Taille de a_renvoyer_enssembe_donnees : " + a_renvoyer_enssembe_donnees.length);

for (let k = 0; k < a_renvoyer_enssembe_donnees.length; k++) { 
	console.log("673 - titre  : " + k + " - " +  a_renvoyer_enssembe_donnees[k].titre);
	console.log("673 - valeur  : " + k + " - " +  a_renvoyer_enssembe_donnees[k].valeur);
}

const all_element = a_renvoyer_enssembe_donnees ? a_renvoyer_enssembe_donnees.map((a_renvoyer_enssembe_donnees,index) => {
	return (
	<div className="column2g" >
		<h2> {a_renvoyer_enssembe_donnees.titre}  </h2>
		 
		<ul>
			{a_renvoyer_enssembe_donnees.valeur}
		</ul>
	</div>
		)
}) : null;

console.log("670 -all_element : " + all_element.length);
console.log("670 -all_element : " + all_element[0]);

		return(<div >
					 {all_element}
				</div>
			)
}


function Create_KPI_VLOOKUP({base}){

// const to manage the dialogue durng the creation of the new KPI:
// close the dialogue when set to false
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  base = useBase();
  const table_Lookup = base.getTableByNameIfExists(NAME_TABLE_KPI_VLOOKUP);

  // const with table the name create for the KPI (INPUT)
  const [name_KPI, setNameKPI] = useState("");

  // KPI name
  let name_input ;

   //-----------------------fill the 1nd select button with table name create in Airtable------------------- 
  const my_table_list = [];
  for  (let i = 0; i < base.tables.length; i++) { 
	my_table_list.push({
		value : base.tables[i].name, 
		label : base.tables[i].name
	 });
  }

   
  //-----------------------END fill the 1nd select button with table name create in Airtable------------------- 

  const [my_table_list_value, setmy_table_list_value] = useState(my_table_list[0].value);
 
 

  //-----------------------fill the 2nd select button for the field name base on the previous table name-------------------
  const my_field_list = [];
  for  (let i = 0; i < base.tables.length; i++) { 
	if (base.tables[i].name == my_table_list_value){
		for (let j = 0; j < base.tables[i].fields.length; j++) { 
			my_field_list.push({
				value : base.tables[i].fields[j].name, 
				label : base.tables[i].fields[j].name
	 		});
  			}
		}
	}
  //----------------------- END fill the 2 select button-------------------



 //-----------------------fill the 2nd select button for the field name base on the previous table name-------------------
 // ------------ same lit of fiel of my_field_list, but limited with COUNT, CURRENCY , DATE , DATE_TIME , DURATION , FORMULA 
 // NUMBER , PERCENT , RATING type
 // This is to avoid to apply numeric condition when the field is no numeric 
 const my_field_list_numeric = [];
 for  (let i = 0; i < base.tables.length; i++) { 
   if (base.tables[i].name == my_table_list_value){
	   for (let j = 0; j < base.tables[i].fields.length; j++) { 

		if ((base.tables[i].fields[j].type == FieldType.COUNT) || (base.tables[i].fields[j].type == FieldType.CURRENCY) || (base.tables[i].fields[j].type == FieldType.DATE)||
		(base.tables[i].fields[j].type == FieldType.DATE_TIME)||(base.tables[i].fields[j].type == FieldType.DURATION)||(base.tables[i].fields[j].type == FieldType.FORMULA)||
		(base.tables[i].fields[j].type == FieldType.NUMBER)||(base.tables[i].fields[j].type == FieldType.PERCENT)||(base.tables[i].fields[j].type == FieldType.RATING)){
			my_field_list_numeric.push({
				value : base.tables[i].fields[j].name, 
				label : base.tables[i].fields[j].name
				});
				}
			}
		}
   }
 //----------------------- END fill the 2 select button-------------------



 const [valuemy_field_list, setmy_field_list] = useState(my_field_list[0].value);
 const [valuemy_field_targeted_list,setvaluemy_field_targeted_list]= useState(my_field_list[0].value);

 // ------------------------  List of condition possible :------------------------
 // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - -- -- - - - //
 //   In the futur possible to create new condition.
  const condition_list = [
	{ value: VALMAX_COND, label: VALMAX_COND },
	{ value: VALMIN_COND, label: VALMIN_COND },
	{ value: VALMEDIAN_COND, label: VALMEDIAN_COND }
  ];

// ------------------------ End  List of condition possible :------------------------

  const [value_conditionvalue, setCondition] = useState(condition_list[0].value);

  //----------------- function to update the value select.
  // this function is call in Select_table on Change; It help to have the initial value with th first field name if exist
  function Update_select_field_for_new_table_selected(newValue){
	let mytable_selected = base.getTableByNameIfExists(newValue);
		if (mytable_selected){
		setmy_field_list(mytable_selected.fields[0].name);
		setvaluemy_field_targeted_list(mytable_selected.fields[0].name);
	}
  }
//----------------- END function to update the value select.

// --------------- Const Select table where the table where the field for the condtion is :
  const Select_table = () => {
	return (
	  <Select
		options={my_table_list}
		value={my_table_list_value}
		onChange={newValue => (setmy_table_list_value(newValue), Update_select_field_for_new_table_selected(newValue),console.log("l 444 newValue : " + valuemy_field_list))}
	  />
	);
  };
// --------------- END Const Select table where the table where the field for the condtion is ----------

// --------------- Const Select Field where the field for the condition is : --------------------
  const Select_field = () => {
	return (
	  <Select
		options={my_field_list_numeric}
		value={valuemy_field_list}
		onChange={newValue => setmy_field_list(newValue)}
	  />
	);
  };

//--------------- END Const Select Field where the field for the condition is : --------------------

// --------------- Const Select Field targeted : the one we will select to see the KPI : --------------------
const Select_field_targeted = () => {
	return (
	  <Select
		options={my_field_list}
		value={valuemy_field_targeted_list}
		onChange={newValue_field_targeted => setvaluemy_field_targeted_list(newValue_field_targeted)}
	  />
	);
  };
//--------------- END  Const Select Field targeted : the one we will select to see the KPI : --------------------


// --------------- Const condtion is : --------------------
  const Selectcondition = () => {
	return (
	  <Select
		options={condition_list}
		value={value_conditionvalue}
		onChange={newValueSelection => setCondition(newValueSelection)}
	  />
	);
  };

// --------------- END Const condtion is : --------------------

  function Update_new_name(newValueSelection){
  name_input = newValueSelection.target.value;
}

  const Input_Name_KPI = () => {

		return (
			<Input
			type="text"
			onChange={e => (Update_new_name(e))}
			placeholder="Name : "
			/>
		);
	};

	// create of the KPI vlookup-----------------------------------------------------------------------------------------------
	// 1- creation of the table if not exist
	//	1-1 : check if the user can create the table
	// 2-if table exist, we check the field exist with the exact name
	//	2-1 : we check the field ok and type of field Ok : if it is not exist the type of field change, we request to fix it before to create the new KPI
	//  2-2 : we check the name of the KPI is filled correctly
	//	2-3 : we check the permission to update the table (= to create the KPI), if Ok, we create the KPi
	async function CreateVlookup_Indicator(){

		// 1- creation of the table if not exist
		if(!table_Lookup){
			CreateNewTable();
		}
		
		// 2-if table exist, we check the field exist with the exact name
		if(table_Lookup){
			const recordFields = {
				'Name KPI' : name_input,
				'NameTable' : my_table_list_value,
				'NameField' : valuemy_field_list,
				'NameField targeted' : valuemy_field_targeted_list,
				'SelectCondition' : {name: value_conditionvalue },
				}


		//	2-1 : we check the field ok and type of field Ok : if it is not exist the type of field change, we request to fix it before to create the new KPI
	
			let field_Name_KPI_table_Lookup_exist = false;
			let field_NameTable_table_Lookup_exist = false;
			let field_NameField_table_Lookup_exist = false;
			let field_NameField_targeted_table_Lookup_exist = false;
			let field_SelectCondition_table_Lookup_exist = false;
			

			for  (let i = 0; i < table_Lookup.fields.length; i++) { 
				if (table_Lookup.fields[i].name == FIELD_NAME_KPI){
					if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
						field_Name_KPI_table_Lookup_exist = true;
						console.log("l 758 OK  name found : " + table_Lookup.fields[i].name + " name target : " + FIELD_NAME_KPI );
					}
					else {
						alert("Warning the type of Name_KPI field in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
						setIsDialogOpen(false);
						}
				}
				if (table_Lookup.fields[i].name == FIELD_NAMETABLE){
					if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
						field_NameTable_table_Lookup_exist = true;
					}
					else {
						alert("Warning the type of NameTable field in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
						setIsDialogOpen(false);
						}
				}
				if (table_Lookup.fields[i].name == FIELD_NAMEFIELD){
					if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
						field_NameField_table_Lookup_exist = true;
					}
					else {
						alert("Warning the type of NameField field in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
						setIsDialogOpen(false);
						}
				}
				if (table_Lookup.fields[i].name == FIELD_NAMEFIELD_TARGETED){

					if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
						field_NameField_targeted_table_Lookup_exist = true;
					}
					else {
						alert("Warning the type of the field NameField targeted in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
						setIsDialogOpen(false);
						}
				}
				if (table_Lookup.fields[i].name == FIELD_SELECTCONDITION){
					if (table_Lookup.fields[i].type == FieldType.SINGLE_SELECT){
						field_SelectCondition_table_Lookup_exist = true;
					}
					else {
						alert("Warning the type of SelectCondition field in your table is not a SINGLE_SELECT. Please change it before to create a Vlookup KPI. Thank you! ");
						setIsDialogOpen(false);
						}
				}
			}

			if (field_Name_KPI_table_Lookup_exist && field_NameTable_table_Lookup_exist &&
				field_NameField_table_Lookup_exist && field_SelectCondition_table_Lookup_exist && field_NameField_targeted_table_Lookup_exist )
			{
				console.log("l 807 all field exist : ");
		//  2-2 : we check the name of the KPI is filled correctly
				if ((!name_input) || (name_input=="")){
					alert(`Please give a name to the KPI you are creating. Thank you`);
					setIsDialogOpen(true);
				}
				else {
				//	2-3 : we check the permission to update the table (= to create the KPI), if Ok, we create the KPi
					if (table_Lookup.hasPermissionToCreateRecord(recordFields)) {
						
								const newRecordId = await table_Lookup.createRecordAsync(recordFields);
								// New record has been saved to Airtable servers.
								alert(`new record with ID ${newRecordId} has been created`);
								setIsDialogOpen(false);
							}
					else 
						{
							alert(`No permission to create a new record`);
							setIsDialogOpen(false);
						}
					}
			}
			else {
				alert(`One of the field doesnt exist in the table Table VLookup or the type of the field is not correct. Please be sure you have the following table Name_KPI, NameTable, NameField, SelectCondition`);	
			}
		}
	}
	//--------------------------- END create of the KPI vlookup-----------------------------------------------------------------------------------------------

	//---------------  function to create the base if is it not exist------------------------
	async function CreateNewTable() {
		const name = NAME_TABLE_KPI_VLOOKUP;
		const fields = [
			// Name will be the primary field of the table.
			{name: 'ID', type: FieldType.NUMBER, options: {
				precision: 1,
			}},
			{name: FIELD_NAME_KPI, type: FieldType.SINGLE_LINE_TEXT},
			{name: FIELD_NAMETABLE, type: FieldType.SINGLE_LINE_TEXT},
			{name: FIELD_NAMEFIELD, type: FieldType.SINGLE_LINE_TEXT},
			{name: FIELD_NAMEFIELD_TARGETED, type: FieldType.SINGLE_LINE_TEXT},
			{name: FIELD_SELECTCONDITION, type: FieldType.SINGLE_SELECT, options: {
				choices: [
					{name: VALMAX_COND},
					{name: VALMIN_COND},
					{name: VALMEDIAN_COND},
				],
			}},
		];
		//	1-1 : check if the user can create the table
		if (base.unstable_hasPermissionToCreateTable(name, fields)) {
			await base.unstable_createTableAsync(name, fields);
		}
		else {
			alert("You have not the right to create a new KPI, please check with a creator user ");
		setIsDialogOpen(false);
		}
	}
	//--------------- END  function to create the base if is it not exist------------------------	

  return (
		<React.Fragment>
			<Button onClick={() => setIsDialogOpen(true)}>Create VLookup indicator</Button>
			{isDialogOpen && (
				<Dialog onClose={() => setIsDialogOpen(false)} width="600px" position="fixed" bottom="-100" right="0">
				<Dialog.CloseButton />

				<Heading>Create new indicator</Heading>
				<Text variant="paragraph">
					Fill the information to create a new indicator Vlookup
				</Text>
				<table>
					<tr>
						<td>
							<p>Table choosen : </p>
						</td>
						<td>	
							<Select_table /> 
						</td>
					</tr>
					<tr>
						<td>
								<p>The condition to apply to the field : </p>
						</td>
							<td>	<Selectcondition/>
						</td>
					</tr>
					<tr>
						<td>
								<p>Field to apply Condition :  </p>
						</td>
							<td>	<Select_field/> 
							</td>
					</tr>
					<tr>	
						<td>
								<p>Field correspondant : </p>
						</td>
						<td>	<Select_field_targeted />
						</td>
					</tr>
					<tr>
							<td>	
								<p>Name KPI :  </p>
							</td>
								<td>	<Input_Name_KPI />
							</td>
					</tr>
					</table>
				<p> </p>
				<div >
					<Button onClick={() => setIsDialogOpen(false)} text-align= "center"  margin=" 0 auto" >Cancel</Button>
					<Button onClick={() => CreateVlookup_Indicator()}  text-align= "center"  margin=" 0 auto">Create KPI</Button>
				</div>
				</Dialog>
			)}
		</React.Fragment>
	);

}



function TableSchema({base, table, item_key_primary}) {

    
    return (
		<ErrorBoundary>
            <Box>
                <Box padding={3} borderBottom="thick" className="H1">
                    <h1><Heading size="small" margin={0}>
						<box className="tittle">
							My Dash Board
						</box > 
                    </Heading></h1>
                </Box>
				<Box>
					
                </Box>
				<Box margin={3}>
                    {
						<div>
							<table>
								<tr> 
									<td> </td>
									<td>
										<Create_KPI_VLOOKUP base={base} />
									</td> 
							
							</tr>
						</table>
						
							<table>
								<td>
									<List_of_log_fonction />				
									
									<List_of_personalize_indicateur />

									<List_of_VlookUp_indicateur />
								</td>
							</table>
						</div>		
                    }              
                </Box>
            </Box>
		</ErrorBoundary>
    );
}
 
 
export default kpi;