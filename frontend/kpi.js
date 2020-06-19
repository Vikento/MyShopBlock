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
const INVENTORY_WAREHOUSE = "Inventory List";


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
		console.log("l 103 - " + table_warehouse_stock.fields[i].name);
	
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
			}
			
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
list_KPI.sort((a, b) => (a.name_variable_indicator > b.name_variable_indicator) ? 1 : -1)


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
	



const all_element = a_renvoyer_enssembe_donnees ? a_renvoyer_enssembe_donnees.map((a_renvoyer_enssembe_donnees,index) => {
	return (
	<div className="column2g">
		<h2> {a_renvoyer_enssembe_donnees.titre}  </h2>
		 
		<ul>
			{a_renvoyer_enssembe_donnees.valeur}
		</ul>
	</div>
		)
}) : null;

		return(<div >
					 {all_element}
				</div>
			)



}

function TableSchema({base, table, item_key_primary}) {

    
    return (
			
            <Box>
                <Box padding={3} borderBottom="thick" className="H1">
                    <h1><Heading size="small" margin={0}>
						<box className="tittle">
							My Dash Board
						</box > 
                    </Heading></h1>

                </Box>
                <Box margin={3}>
                    {
							<table>
								<td>
									<List_of_log_fonction />				
	
									<List_of_personalize_indicateur />
								</td>
							</table>
								
                    }
                                        
                </Box>



            </Box>
	
    );
    
}
 
 
export default kpi;