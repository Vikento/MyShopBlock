import {
    Box,
    Heading,
    useBase,
    useRecords,
    expandRecord,
} from '@airtable/blocks/ui';
import { NavLink} from "react-router-dom";


//import React from 'react';
import React, {useState} from 'react';
import {session} from '@airtable/blocks';
import { Loader } from "@airtable/blocks/ui";
import { Select } from "@airtable/blocks/ui";

const loaderExample = <Loader scale={0.5}  fillColor="#33bbaa" />;


// FIN CSS

const FIELD_ID_WIDTH_PERCENTAGE = '35%';
const FIELD_DESCRIPTION_WIDTH_PERCENTAGE = '35%';
const FIELD_QUANTITY_WIDTH_PERCENTAGE = '30%';
const NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL = 10;
const INVENTORY_WAREHOUSE = "Inventory List";



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
// ajout dans l'aide le nom de la table INVENTORY_WAREHOUSE
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


// 		Here you will find 2 solution to get the select field : 
//		1- with select where we can personalize the items to be show
//		2- fieldpicker where all the fields are shower
//



function updateKey(key_value) {

	let session_name;
	let session_id;	
	let user_exist_in_the_global_var = false;
	
	if (session.currentUser !== null) {
			session_name = session.currentUser.name;
			session_id = session.currentUser.id;
	}
	else alert ("Please identify as an user or you cannot access to the information reauested");


	global.clear_key = key_value;
	console.log("Key save !!!");

		
	console.log("l 128 taille base de cle : " + global.clear_key.length + " ma cle : " + global.clear_key);
	// update of my clear key for user 
	for  (let i = 0; i < global.clear_key.length; i++) { 
		if  (global.clear_key[i].user == session_id){
			console.log("l127 My user : " + global.clear_key[i].user + " item chosen : " + global.clear_key[i].key);
		}
	}


}


function TableStructureBlock() {

	
    const base = useBase();
	
	const [tableName, setTableName] = useState(INVENTORY_WAREHOUSE);

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
	const table_warehouse_stock = base.getTable(INVENTORY_WAREHOUSE);
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

	const table_warehouse_stock = base.getTable(INVENTORY_WAREHOUSE);
	

	 // my_item_id recupere lensemble des ID

     if (records_id) {
        console.error(" l 186 :  " + table.description);
    } else {
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
								<td width={FIELD_ID_WIDTH_PERCENTAGE}>
								<div  className="Select_css">ITEM ID - PRIMARY KEY </div>
									{my_item_id}
								</td>
						
								<td width={FIELD_DESCRIPTION_WIDTH_PERCENTAGE}>	
									<Selec_and_show_table base={base} table={table} item_selected={1} />	
									
								</td>

								<td width={FIELD_QUANTITY_WIDTH_PERCENTAGE}>
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