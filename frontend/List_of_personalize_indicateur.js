import {
    useBase,
    useRecords,
} from '@airtable/blocks/ui';

import React from 'react';
import {session} from '@airtable/blocks';



//--------- const Name of the field for the Dashboard Table Vlookup :
// TO BE Modified if you want to personalize the field name of NAME_TABLE_KPI_VLOOKUP
const KPI_USER_AUTORIZE = "--USER ONLY--"; 
//--------- END Const Name of the field for the Dashboard Table Vlookup :



//
// function to check the user is authorized to get indicator
// we parameter that all the user list in field const KPI_USER_AUTORIZE can see the indicator
// except the indicator for all as List_of_log_fonction()
function User_check_for_kpi(table,type_field) {
	let shared_personnalized_kpi = false;
	let query = table.selectRecords();
	
	for (let record of query.records){
		let collaborators = record.getCellValue(KPI_USER_AUTORIZE);
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
			}			
			else {
				alert("you need to be connected to have access to the personalized KPI");
					shared_personnalized_kpi = false;
				}
		}	
		else {

			} 
			
	}
	
	return  shared_personnalized_kpi;
}


// personnalized indicators per user 
// create manually indicator that will be show in the KPI dashboard
// the name of the table is very important and have to start by: "DashBoard"
// the name can not be parameter for now
// some of the field can be mute : just need to add "--" at the begining of the nale if the field name
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
				
				// we check the cosnt KPI_USER_AUTORIZE field exist and if the current user is part of collaborator (user_field_exist):
				let user_field_exist = false;
								
				if (table.fields[j].name == KPI_USER_AUTORIZE){
									
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


		return(<div >
					 {all_element}
				</div>
			)
}



 export default List_of_personalize_indicateur;    