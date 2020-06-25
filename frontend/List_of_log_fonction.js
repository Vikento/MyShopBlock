import {
    useBase,
    useRecords,
} from '@airtable/blocks/ui';

import React from 'react';


const INVENTORY_WAREHOUSE = "Inventory List";



// ---------------  List of constante : name of the table Inventory List
const my_const_Check_Stock = "Check Stock";
const my_const_Threshold_Alarm = "Threshold Alarm";
const my_const_Total_Stock = "Total Stock";
const my_const_Product_Code =  "Product Code Serrial Number";
const my_const_name = "Name";
const my_const_Threshold_total_Value = "Threshold total Value";
const my_const_Total_Value = "Total Value";
const my_const_Check_total_Value = "Check total Value";

// --------------- END List of constante : name of the table Inventory List

// ------------  Const : name of the field to identify the list of users authorize to see the
//-------------    indicator in his session :

//



// implemented indicator base on the "Inventory List" including all the  
// field
// it is a KPI implemented to the root and not flexibla and configurable

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

	// list of var to see if it exist
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
	
		if (table_warehouse_stock.fields[i].name == my_const_Check_Stock){
			check_stock_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == my_const_Threshold_Alarm){
			Threshold_Alarm_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == my_const_Total_Stock){
			Total_Stock_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == my_const_Product_Code){
			Product_Code_Serrial_exist = true;
		}
		if (table_warehouse_stock.fields[i].name == my_const_name){
			Name_exist = true;
		}	
			if (table_warehouse_stock.fields[i].name == my_const_Threshold_total_Value){
			Threshold_total_Value_exist = true;
		}	
			if (table_warehouse_stock.fields[i].name == my_const_Total_Value){
			total_value_exist = true;
		}	
			if (table_warehouse_stock.fields[i].name == my_const_Check_total_Value){
			Check_total_Value_exist = true;
		}	
}

if (check_stock_exist && Threshold_Alarm_exist && Total_Stock_exist && Product_Code_Serrial_exist && Name_exist && Threshold_total_Value_exist  &&  total_value_exist  && Check_total_Value_exist){

 	for (let i = 0; i < my_record_historique.length; i++) {
					// check on the stock limitation
					list_of_log_quantity[compteur_log] = my_record_historique[i].getCellValue(my_const_Check_Stock);
					target_stock_min[compteur_log] = my_record_historique[i].getCellValue(my_const_Threshold_Alarm);
					total_stock[compteur_log] = my_record_historique[i].getCellValue(my_const_Total_Stock);
					
					// name and ID
					id_log_no_ok[compteur_log] = my_record_historique[i].getCellValue(my_const_Product_Code);
					name_log_no_ok[compteur_log] = my_record_historique[i].getCellValue(my_const_name);
					
					// check on the value
					target_nb_item_log_no_ok[compteur_log] = my_record_historique[i].getCellValue(my_const_Threshold_total_Value);
					value_log_no_ok[compteur_log] = my_record_historique[i].getCellValue(my_const_Total_Value);
					list_of_log_value [compteur_log] =  my_record_historique[i].getCellValue(my_const_Check_total_Value);
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

export default List_of_log_fonction;