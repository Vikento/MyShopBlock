import {
    Box,
    Heading,
    useBase,
    useRecords,
    expandRecord,
	FieldPickerSynced,
	useGlobalConfig,
	SelectSynced,
} from '@airtable/blocks/ui';
import { Icon } from "@airtable/blocks/ui";
import {cursor} from '@airtable/blocks';
import { NavLink} from "react-router-dom";
import {FieldType} from '@airtable/blocks/models';

//import React from 'react';
import React, {useState} from 'react';
import {globalConfig} from '@airtable/blocks';
import {session} from '@airtable/blocks';
import { Loader } from "@airtable/blocks/ui";

const loaderExample = <Loader scale={0.5}  fillColor="#33bbaa" />;



// FIN CSS

const FIELD_ID_WIDTH_PERCENTAGE = '35%';
const FIELD_DESCRIPTION_WIDTH_PERCENTAGE = '35%';
const FIELD_QUANTITY_WIDTH_PERCENTAGE = '30%';
const NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL = 10;


var page_choose ="STOCK";


var field_total_Stock = 'Total Stock';


//  Amelioration
//
// - recuperer l'ID du champs a la place du nom
// - un bouton pour affichier une nouvelle pages exhustive
// - correction :
//      - tester avec 1 images, avec 100 image, avec d'autre type de fichier		
//		- meme non d article pour 2 ID differents
// - to be fix : when we load new item, the page didnt redimension the pictures streight
//
//  _ dans le fichier index, limite le nombre de caractere vu par la liste de stock
//
//  - dans le fichier item information gerer les images si on en trouve
//	- dans le fichier item information gerer clicker sur images pour les faire defiler si on en trouve
//
//	- ajout la possibilite de paramettre un alerte en mettant une condition en vlookup.
//
// ajout dans l'aide le nom de la table 'Stock in the warehouse'
			// a l interieur de la table on doit avoir le nom de la base Name pour decricre au user facilement le nom de l item

// limit : garder les Nom de DashBoard
// supprimer les hover sur les party stock Name et quantity
// test : ajouter 1000 items
// changer le currency
// verifier pourquoi l image ne se met pas a la bonne taille directement
// visu de plusieurs photos en cliquant sur la photo  en cours

// check the URLL des images, car elles ne sont valables suelment 30 jours a compter du 15 juin 2020
// 	=> voir comment les lier directement au repertoire media

// Verifier le cas :
// -  une base de donne avec un seul field Ok, mais n'apparait pas dans les KPI
// -  faire un test a vide, sans table, sans base


//
// regrouper les CSS dans un fichier separer
// permettre a l'utilisateur de paramettre le design via une table
//


//
// 		Here you will find 2 solution to get the select field : 
//		1- with select where we can personalize the items to be show
//		2- fieldpicker where all the fields are shower
//



async function updateKey(key_value) {

	let session_name;
	let session_id;	
	
	if (session.currentUser !== null) {
			session_name = session.currentUser.name;
			session_id = session.currentUser.id;
	}
	else alert ("Please identify as an user or you cannot access to the information reauested");

	let key_to_save = "key_primary" + session_id;

    if (globalConfig.hasPermissionToSet(key_to_save, key_value)) {
		console.log("Cle sauvegarde l 48 : " + key_value);
		console.log("Variable de la cle l 49 : " + key_to_save);
        await globalConfig.setAsync(key_to_save, key_value);
    }
}


function TableStructureBlock() {

	
    const base = useBase();
	
	const [tableName, setTableName] = useState('Stock in the warehouse');

	//   '---------------------------------------------------------------------------------'
	//
	//    INITITALISAZION A SUPPRIMER PLUS TARD ET VOIR QUELLE VA ETTRE LA PARAMETTRE DINITIALISAZION
	// 
	//
	// 
	//   '---------------------------------------------------------------------------------'

	const table = base.getTableByNameIfExists(tableName);
	console.log("Ma base : " + table);


	// we check the table exist and we transmit element we need in TableSchema
	
	if (table) {
        return <TableSchema base={base} table={table} />;
    } else {
        return ( 
		
				<div>
				<h2> List of Stock : </h2>
				<p> </p>
				Error : No base with the name 'Stock in the warehouse' . For the full functionnality you have to create a Table with the name of 'Stock in the warehouse' as following :
				<p> </p>
				<img src="https://i.postimg.cc/52P43k6F/Change-Name-Table.gif" width="100%" />
				When you create the 'Stock in the warehouse', you can reload or refresh the page.
				<p> </p>
				If it is still not working, please contact the dev team. Thank you !
	
		</div>
		
		);
    }
}



function Select_table_field_third({table}){
	
    let records_desc;
	const globalConfig = useGlobalConfig();
	let doneFieldId_third;
	
	if (globalConfig.get('X_FIELD_ID_THIRD_COLL')){
		doneFieldId_third = globalConfig.get('X_FIELD_ID_THIRD_COLL');
	}
	else {
		console.log ("l 143 doneFieldId_third : " + doneFieldId_third);
		doneFieldId_third = table.fields[0].name;
	}
	
	console.log (" l 147 doneFieldId_third : " + doneFieldId_third);

// Activate the line bellow to clean the globalConfig
//	const doneFieldId_third = "Name";


	//   '---------------------------------------------------------------------------------'
	//
	//   Change Name with another value (Field if exist ????)
	// 
	let doneField_third;
	if (table.getFieldIfExists(doneFieldId_third)){
		console.log(" cas 160 le cahamps exit: ");
		doneField_third = table.getFieldIfExists(doneFieldId_third);
	}
	else { 
		console.log(" cas 163 PAS de champs , on peut le 1 champs existant: ");
		doneField_third = table.getFieldIfExists(table.fields[0].name);
	}
	console.log(" doneFieldId_third  165: " + doneFieldId_third);
	console.log("doneField_third l 160 : " + doneField_third + " " + doneField_third.name);
	//
	//
	//   '---------------------------------------------------------------------------------'


// Activate the line bellow to clean the globalConfig
// const doneField = table ? table.getFieldByName(doneFieldId) : "Name";
	

    records_desc = useRecords(table, {fields: [doneFieldId_third]});
		let my_item_description = records_desc ? records_desc.map(record => {

			let type_const = doneFieldId_third.type;
			
			// at the begining it was not possible to get the type multipleAttachments
			// and the getCellValue , getCellValueAsString solve the issue
			// So it is possible to take out the condition on type != multipleAttachments
			//
			// 	=> A optimiser
			if (type_const !="multipleAttachments"){
				const my_item_desc_value_third = record.getCellValueAsString(doneFieldId_third).substring(0,NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL);
					return(
						<div style={{fontSize: 18, padding: 12, borderBottom: '1px solid #ddd'}}>
							<a
								style={{cursor: 'pointer'}}
								onClick={() => {
									expandRecord(record);
								}}
							>   
						   {my_item_desc_value_third || "NA"}  
						   </a>
						</div>

					)
			}
			else {
					return(
						<div style={{fontSize: 18, padding: 12, borderBottom: '1px solid #ddd'}}>
							<a
								style={{cursor: 'pointer'}}
								onClick={() => {
									expandRecord(record);
								}}
							>   
						   {"NA : attachement cannot be loaded"}  
						   </a>
						</div>

					)
					
			}
					
			}) : null;
			
	return (my_item_description);
}




function Select_table_field({table}){
	
    let records_desc;

	const globalConfig = useGlobalConfig();
	let doneFieldId ;
	
	if (globalConfig.get('X_FIELD_ID')){
		doneFieldId = globalConfig.get('X_FIELD_ID');
		console.log ("l 226 doneFieldId : " + doneFieldId);
	}
	else {
		console.log ("before l 229 doneFieldId : " + doneFieldId);
		doneFieldId = table.fields[0].name;
	}

	console.log ("after l 233 doneFieldId : " + doneFieldId);

	console.log("l 214 X_FIELD_ID " + globalConfig.get('X_FIELD_ID'));
	console.log("l 215 doneFieldId " + doneFieldId);
	//
	//
	// 	Change Name by a general value if exist
	// 
//	const doneField = table ? table.getFieldByIdIfExists(doneFieldId) : "Name";
	const doneField = table ? table.getFieldIfExists(doneFieldId) : "Name";
	//console.log("l 220 doneField " + doneField);

    records_desc = useRecords(table, {fields: [doneField]});
	
	let my_item_description = records_desc ? records_desc.map(record => {
		let type_const = doneField.type;
		

		if (type_const !="multipleAttachments"){
			const my_item_desc_value = record.getCellValueAsString(doneField).substring(0,NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL);
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
		}
		else {
				return(
					<div style={{fontSize: 18, padding: 12, borderBottom: '1px solid #ddd'}}>
						<a
							style={{cursor: 'pointer'}}
							onClick={() => {
								expandRecord(record);
							}}
						>   
					   {"NA : attachement cannot be loaded"}  
					   </a>
					</div>

				)
		}
				
		}) : null;
		

	return (my_item_description);	
}


function TableSchema({base, table}) {
   
    let records_id;
    let records_qty;
		
	 records_id = useRecords(table);
     records_qty = useRecords(table, {fields: [field_total_Stock]});
 
    // Returns all records in the table

	const table_warehouse_stock = base.getTable("Stock in the warehouse");
	

	 // my_item_id recupere lensemble des ID

     if (records_id) {
        console.error(" l 186 :  " + table.description);
    } else {
        return <div>Table is deleted! </div>;
    }
	
	const IconExample = () => {
	  return <Icon name="chevronDown" size={16} />;
	};
		

	//
	// 	2 solution 2 ---> FieldPickerSyncedcol
	//
	
	const FieldPickerSyncedcol = () => {
	  return (

		<FieldPickerSynced table={table} globalConfigKey="X_FIELD_ID" className="Select_css1" allowedTypes={[FieldType.NUMBER,FieldType.COUNT,FieldType.SINGLE_LINE_TEXT,FieldType.DATE, FieldType.RICH_TEXT]}/>
	  );
	};
	

	const selection_value_picker = [];
	for (let i = 0; i < table_warehouse_stock.fields.length; i++) {
	 selection_value_picker.push({
		value : table_warehouse_stock.fields[i].name, 
		label :  table_warehouse_stock.fields[i].name
	 });
	}

	
	//
	// 	1 solution 1 ---> selectSyncedfieldBase
	//
	const selectSyncedfieldBase = (

	  <SelectSynced
		options={selection_value_picker}
		globalConfigKey="X_FIELD_ID_THIRD_COLL"
		className ="Select_css1"
		tabIndex ="Select a field"
		
	  />
	);	
	


    // my_item_id get all of the ID
	const my_item_id = records_id ? records_id.map(record => {
       const my_item_id_value = record.getCellValue(table_warehouse_stock.primaryField.name);
        return(
        
        <div style={{fontSize: 18, padding: 12, borderBottom: '1px solid #ddd'}}>
            <a
                style={{cursor: 'pointer'}}
                onClick={() => updateKey(my_item_id_value)}
            >
            <NavLink to="/item_information"> {my_item_id_value || "NA or no information"}  </NavLink>
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
				<div >
						<table  width="100%">
							<tr hasThickBorderBottom={true} className="core_list"  >
								<td width={FIELD_ID_WIDTH_PERCENTAGE}>
								<div  className="Select_css">ITEM ID - PRIMARY KEY </div>

								</td>
						
								<td width={FIELD_DESCRIPTION_WIDTH_PERCENTAGE}>		
									<FieldPickerSyncedcol />
								</td>

								<td width={FIELD_QUANTITY_WIDTH_PERCENTAGE}>
									{selectSyncedfieldBase}					
								</td>

							</tr>
						</table>
					</div>
					<div  class="height_defin">
					<table width="100%">
						
						<tr hasThickBorderBottom={true}  >
							<td width={FIELD_ID_WIDTH_PERCENTAGE}>						
								{my_item_id}
							</td>
					   
							<td width={FIELD_DESCRIPTION_WIDTH_PERCENTAGE}>
								<Select_table_field table={table}/>
							</td>

							<td width={FIELD_QUANTITY_WIDTH_PERCENTAGE}>
								<Select_table_field_third table={table} />		
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