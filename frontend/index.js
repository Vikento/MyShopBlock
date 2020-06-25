import {
    Box,
    Heading,
    useBase,
    useRecords,
    expandRecord,
} from '@airtable/blocks/ui';
import { NavLink} from "react-router-dom";


// importation of the all my const
// to change some table name, field, dimension, it is possible to change the 
// the file myConstClass
import * as myConstClass from "./myConstClass.js";


//import React from 'react';
import React, {useState} from 'react';
import {session} from '@airtable/blocks';
import { Loader } from "@airtable/blocks/ui";
import { Select } from "@airtable/blocks/ui";

const loaderExample = <Loader scale={0.5}  fillColor="#33bbaa" />;


// FIN CSS


//  Amelioration
//
// - recuperer l'ID du champs a la place du nom
// - correction :
//      - tester avec 1 images, avec 100 image, avec d'autre type de fichier		
//		- meme non d article pour 2 ID differents
//
//
//	Feature :
//  - Dans ItemInformation
//		 1/ dans le fichier item information gerer clicker sur images pour les faire defiler si on en trouve
//
//	- Dans KPI	
//		2/ faire afficher correctement les unites currency et autres pour les dashboard vlookup	
//
//	- dans aide utilisateur GitHub + index
//		1/ check the URLL des images, car elles ne sont valables suelment 30 jours a compter du 15 juin 2020
// 			=> voir comment les lier directement au repertoire media
//
//	- dans une page a part
//		1/ change CSS to apply to all the page + create a specific page for the CSS
//		2/ create CONST for all the field : the goal is to rename in the futur
//
//	- dans le fichier des constante : myConstClass
//			1/ check if we can fix  const "recordFields" from
			//const recordFields = {
			//	'Name KPI' : name_input,
			//	'NameTable' : my_table_list_value,
			//	'NameField' : valuemy_field_list,
			//	'NameField targeted' : valuemy_field_targeted_list,
			//	'SelectCondition' : {name: value_conditionvalue },
			//	'--USER ONLY--' : [user_id],
			//	}

			
// ajout dans l'aide le nom de la table INVENTORY_WAREHOUSE
			// a l interieur de la table on doit avoir le nom de la base Name pour decricre au user facilement le nom de l item
	

// limit : garder les Nom de DashBoard : update dans l'aide

// Test :
// 	- test : ajouter 1000 items : OK
//	- different USER : creator to commenter : Ok 
// 	- une base de donne avec un seul field : OK
// 	- test avec different nom de table
// -  faire un test a vide, sans table, sans base

// KPI Vlookup creation 

//Error: Field 'FIELD_NAME_KPI' does not exist in table 'Dashboard Table VLookup' at Table._  ===> check if we change the name of the table how
// it will react
// Error: Rendered more hooks than during the previous render. ===> after the creation of the new table ===> putting the ErrorBoundary :
//  check in the future if there is another way to solve this issue:


function updateKey(key_value) {

	let session_id;
	
	if (session.currentUser !== null) {
			session_id = session.currentUser.id;
	}
	else alert ("Please identify as an user or you cannot access to the information reauested");

	global.clear_key = key_value;

	// update of my clear key for user 
	for  (let i = 0; i < global.clear_key.length; i++) { 
		if  (global.clear_key[i].user == session_id){
		}
	}
}


function TableStructureBlock() {
    const base = useBase();
	const [tableName, setTableName] = useState(myConstClass.INVENTORY_WAREHOUSE);

	//   '---------------------------------------------------------------------------------'
	//
	//    INITITALISAZION A SUPPRIMER PLUS TARD ET VOIR QUELLE VA ETTRE LA PARAMETTRE DINITIALISAZION
	// 
	//
	// 
	//   '---------------------------------------------------------------------------------'

	const table = base.getTableByNameIfExists(tableName);

	// we check the table exist and we transmit element we need in TableSchema
	if (table) {
        return <TableSchema base={base} table={table} />;
    } else {
        return ( 
				<div>
				<h2> List of Stock : </h2>
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


function Selec_and_show_table({base,table,item_selected}){

//---------------------------  label Select -----------------------------
	const table_warehouse_stock = base.getTableIfExists(myConstClass.INVENTORY_WAREHOUSE);
	const selection_value_picker = [];

	for (let i = 0; i < table_warehouse_stock.fields.length; i++) {
	 selection_value_picker.push({
		value : table_warehouse_stock.fields[i].name, 
		label :  table_warehouse_stock.fields[i].name
	 });
	}
	const [value, setValue] = useState(selection_value_picker[item_selected].value);


//-----------------------END     label Select -----------------------------

//---------------------information selected item------------------------------
// 	it is the information it will see when you select the label with the "Select" button

	let records_desc;
	let doneFieldId = value;

	//
	//
	// 	Change Name by a general value if exist
	// 

	const doneField = table ? table.getFieldIfExists(doneFieldId) : "Name";

    records_desc = useRecords(table, {fields: [doneField]});
	
	let my_item_description = records_desc ? records_desc.map(record => {

	// it is possible to limit select and doesn't authorize some type to be accessibles
	// to do so, please disable to "//" below until the next "//else { //}"  
	//	let type_const = doneField.type;	
	// if (type_const !="multipleAttachments"){

			const my_item_desc_value = record.getCellValueAsString(doneField).substring(0,myConstClass.NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL);
				return(
					<div style={{fontSize: 18, padding: 12, borderBottom: '1px solid #ddd'}}>
						<a
							style={{cursor: 'pointer'}}
							onClick={() => {
								expandRecord(record);
							}}
						>   
					   {my_item_desc_value || "NA"}  
					   </a>
					</div>

				)
		//}
		//else {

		//}

				
		}) : null;
		

	//-----------------END information selected item------------------

	return (
	<div>
		<div>
			<Select
				options={selection_value_picker}
				value={value}
				className ="Select_css1"
				onChange={newValue => setValue(newValue)}
			/>
		</div>
			<div>
				{my_item_description}
			</div>
	</div>
	)
}


function TableSchema({base, table}) {
   
    let records_id;
		
	records_id = useRecords(table);

 
    // Returns all records in the table

	const table_warehouse_stock = base.getTable(myConstClass.INVENTORY_WAREHOUSE);
	

	 // my_item_id get all the ID
     if (records_id) {
	} 
	else {
        return <div>Table is deleted! </div>;
    }
	
    // my_item_id get all of the ID
	const my_item_id = records_id ? records_id.map(record => {
       const my_item_id_value = record.getCellValue(table_warehouse_stock.primaryField.name);
        return(
        
        <div style={{fontSize: 18, padding: 12, borderBottom: '1px solid #ddd'}}>
            <a
                style={{cursor: 'pointer'}}
                onClick={() => updateKey(my_item_id_value)}
            >
            <NavLink to="/item_information" > {my_item_id_value || "NA or no information"}  </NavLink>
           </a>
        </div>

        )
      
    }) : null;
	

       
    return (
		<React.Suspense fallback={loaderExample} >
        <Box>
            <Box padding={3} borderBottom="thick" className="H1">
                <h1 ><Heading size="small" margin={0}>
				<box className="tittle">
                    My Stock
					</box >
                </Heading></h1>
            </Box>
            <Box margin={3} className="core_list">
				<div  class="height_defin">
						<table  width="100%">
							<tr hasThickBorderBottom={true}  >
								<td width={myConstClass.FIELD_ID_WIDTH_PERCENTAGE}>
								<div  className="Select_css">ITEM ID - PRIMARY KEY </div>
									{my_item_id}
								</td>
						
								<td width={myConstClass.FIELD_DESCRIPTION_WIDTH_PERCENTAGE}>	
									<Selec_and_show_table base={base} table={table} item_selected={1} />	
									
								</td>

								<td width={myConstClass.FIELD_QUANTITY_WIDTH_PERCENTAGE}>
									<Selec_and_show_table base={base} table={table} item_selected={2}  />					
								</td>

							</tr>
						</table>
					</div>
                
            </Box>


        </Box>
		</React.Suspense>
    );
}



export default TableStructureBlock;