import {
    Box,
    Heading,
	useBase,
    useRecords,
	
} from '@airtable/blocks/ui';
import ErrorBoundary from "./ErrorBoundary";
import React, {useState} from 'react';
import {session} from '@airtable/blocks';
import {FieldType} from '@airtable/blocks/models';

// importation of the all my const
// to change some table name, field, dimension, it is possible to change the 
// the file myConstClass
import * as myConstClass from "./myConstClass.js";



function item_information() {

	let session_name;
	let session_id;	

	if (session.currentUser !== null) {
		
		const base = useBase();

		session_name = session.currentUser.name;
		session_id = session.currentUser.id;
	 
		
		const [tableName, setTableName] = useState(myConstClass.INVENTORY_WAREHOUSE);
		const table = base.getTableByNameIfExists(tableName);

		if (table) {
			return <TableSchema table={table} />;
		} 
		
		else {
				return ( 
				<div>
					<h2> Item information : </h2>
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
	else {
		alert (" !!! Please identify as an user or you cannot access to the information requested !!!");
		return null;
	}
}


// My image not used here
function My_Image({pictures_item,nombre_image}){
    
//	console.log("nb image : " + nombre_image);
	if (pictures_item){
		let imgArray = new Array();
		let t = 0; 
		let source_image = "";
		
//		console.log("pictures_item dans my image : " + pictures_item);
		
		for (let i = 0; i < pictures_item.length; i++) {
				if (pictures_item[i] == "("){
					imgArray[t] = new Image();
					let source_image = "";
					
					while (pictures_item[i] != ")") {
						i = i + 1;
						if ((pictures_item[i] != ")") && (i < pictures_item.length)){
							source_image = source_image + pictures_item[i];
						}
					}
					imgArray[t].src = source_image;
					t = t + 1;	
					console.log("image " + t + " " + source_image);
				}		
		}
	//	console.log("lien : " + imgArray[0].src);


		if ((imgArray[0].width > imgArray[0].height) && (imgArray[0].width > 300)) {
		
			return (<img src={imgArray[0].src} class="displayed" width="300" />);	
		}
		else if ((imgArray[0].width > imgArray[0].height) && (imgArray[0].width <= 300)) {
		
			return (<img src={imgArray[0].src} class="displayed" />);	
		}
		else if ((imgArray[0].width <= imgArray[0].height) && (imgArray[0].height > 300)) {
		
			return (<img src={imgArray[0].src} class="displayed" height="300" />);	
		}
		else if ((imgArray[0].width <= imgArray[0].height) && (imgArray[0].height < 300)) {
		
			return (<img src={imgArray[0].src} class="displayed" />);	
		}
	}
	else return null;
	
}

// this function list all the operation order from History_Movement
// and show them for specific item selected
function Item_historique({key_primary,table}) {
	
	const base = useBase();

	const table_historique = base.getTableByNameIfExists(myConstClass.History_Movement);
	const my_record_historique = useRecords(table_historique);

	let my_field_name = table.getFieldByNameIfExists(myConstClass.my_const_name);
	let my_field_primary_key = table.getFieldByNameIfExists(table.primaryField.name);
	const my_record_inventory = useRecords(table, {fields: [my_field_name,my_field_primary_key]});


	if (table_historique){
			let quantity_before = new Array();
			let quantity_after = new Array();
			let quantity_in_out_date = new Array();
			let in_out_status = new Array();
			let supply_name = new Array();	
			
			let nb_operation_in_out = 0;
			let quantity_before_field_exist = false;
			let quantity_after_field_exist = false;
			let quantity_in_out_date_field_exist = false;
			let in_out_status_field_exist =  false;
			let supply_name_field_exist = false;

			// check of the field in Histo are created :
			for (let j = 0; j < table_historique.fields.length; j++) { 

				if (table_historique.fields[j].name == myConstClass.my_const_Quantity_Before){
					quantity_before_field_exist = true;
				}
				if (table_historique.fields[j].name == myConstClass.my_const_Quantity_after){
					quantity_after_field_exist = true;
				}
				if (table_historique.fields[j].name == myConstClass.my_const_Date_IN_OUT){
					quantity_in_out_date_field_exist = true;
				}
				if (table_historique.fields[j].name == myConstClass.my_const_OUT){
					in_out_status_field_exist = true;
				}
				if (table_historique.fields[j].name == myConstClass.my_const_Supply_name){
					supply_name_field_exist = true;
				}
			}

			if (quantity_before_field_exist && quantity_after_field_exist && quantity_in_out_date_field_exist &&
				in_out_status_field_exist && supply_name_field_exist) {


			// ------ check the key : it can be "Name" or "Primary Key"; if it is from "Name", we need to transform as "Primary Key"
			// we check if the Name field exist
			if (my_field_name !== null) {	
				
				for (let i = 0; i < my_record_inventory.length; i++) {
					if (my_record_inventory[i].getCellValue(my_field_name) == key_primary){
						key_primary = my_record_inventory[i].getCellValue(my_field_primary_key) ;
					}
				}
			}		
			// ------ END key transformed--------------
			
				for (let i = 0; i < my_record_historique.length; i++) {
					if (my_record_historique[i].getCellValue(table_historique.primaryField.name) == key_primary){
						quantity_before[nb_operation_in_out] = my_record_historique[i].getCellValue(myConstClass.my_const_Quantity_Before);
						quantity_after[nb_operation_in_out] =  my_record_historique[i].getCellValue(myConstClass.my_const_Quantity_after);
						quantity_in_out_date[nb_operation_in_out] =  my_record_historique[i].getCellValue(myConstClass.my_const_Date_IN_OUT);
						in_out_status[nb_operation_in_out] =  my_record_historique[i].getCellValue(myConstClass.my_const_OUT);
						supply_name[nb_operation_in_out] = my_record_historique[i].getCellValue(myConstClass.my_const_Supply_name);
						nb_operation_in_out = nb_operation_in_out + 1;
					}
				}

				const list_quantity = [];

				for (let i = 0; i < nb_operation_in_out; i++) {
					if (in_out_status[i] == myConstClass.MATERIAL_IN){
						in_out_status[i] = myConstClass.RECEIVED_FROM;
					}
					else if (in_out_status[i] == myConstClass.MATERIAL_OUT){
						in_out_status[i] = myConstClass.GIVEN_TO;
					}
					else {in_out_status[i] = " - "};
					
					list_quantity.push({
						qtity_before : quantity_before[i],
						qtity_after : quantity_after[i],
						the_date : quantity_in_out_date[i],
						supplier : in_out_status[i],
						given_or_received : supply_name[i]
					});
				}

				// case we have operation activities
				if (nb_operation_in_out != 0) {
					
					return (
								
								<div >
								<h2> Store Activities - {key_primary}  </h2>
									<ul>
										{list_quantity.map((list_quantity,index) =>
											<li key={index}>Date : {list_quantity.the_date} - Initial quantity Stock : {list_quantity.qtity_before} {list_quantity.supplier} {list_quantity.given_or_received} - New quantity stock : {list_quantity.qtity_after} </li>
										)}
									</ul>
								</div>
							
								);

					}
				else 	return (
								
								<div >
								<h2> Store Activities - {key_primary}  </h2>
									<ul>
										<v1 color="red" > No data or operation for now </v1>
									</ul>
								</div>
							
								);
			}
			else {
				
				return (								
					<div >
					<h2> Activities component </h2>
						<ul>
							<v1 color="red" > To have a full functionnality with Storage Activities you need to create all the following field in Histoire table </v1>
								<p>{myConstClass.my_const_Product_Code_Serrial_Number}</p>
								<p>{myConstClass.my_const_Quantity_Before}</p>
								<p>{myConstClass.my_const_Quantity_after}</p>
								<p>{myConstClass.my_const_Date_IN_OUT}</p>
								<p>{myConstClass.my_const_Supply_name}</p>
						</ul>
					</div>
				
					);
			}
		}
			else {

				return ( 
					<div>
						<h2> Storage Activities : </h2>
						<p> </p>
						No storage activitis because : No base with the table name "{myConstClass.History_Movement}" . For the full functionnality you have to create a Table with the name of "{myConstClass.History_Movement}" :
						<p> </p>
						
						When you create the "{myConstClass.History_Movement}", you can reload or refresh the page.
						<p> </p>
						If it is still not working, please contact the dev team. Thank you !
			
				</div>
				)

			}		
}

//
// function which show all the description for a specific item
// it will ordered by alphabetic order
// it will render also a input where it is possible to write the name of the items
function List_items__usestate({table,my_record}){

	const [my_key, setMy_Key] = useState(global.clear_key);

	//-----------------------------------------------------------------------------------
	//					LIST data in the option - datalist
	//					List data will be used to input  form
	const items = [];

	//list of picture from attachment
	let my_images_items ;

	//get all the code
	for (let i = 0; i < my_record.length; i++) {
        items.push({
		value : my_record[i].name})
	}

	//get the Name of item if the field "Name" is created
	// if exist
	for (let j = 0; j < table.fields.length; j++) { 
		if (table.fields[j].name == myConstClass.my_const_name){

			for (let i = 0; i < my_record.length; i++) {
				items.push({
				value : my_record[i].getCellValue(myConstClass.my_const_name) })
			}
		}
	}


	//order by name the list of item name and ID	
	items.sort(function(a, b) {
		if (a.value==null){
			var nameA =" ";
		}
		else var nameA = a.value.toUpperCase(); // ignore upper and lowercase
		
		if (b.value==null){
			var nameA =" ";
		}
		else var nameB = b.value.toUpperCase(); // ignore upper and lowercase
	
		  if (nameA < nameB) {
			return -1;
		  }
		  if (nameA > nameB) {
			return 1;
		  }

	  // names must be equal
	  return 0;
	});

	const my_data_list = items?items.map((items,index) =>
	<option key={index} value={items.value} />
	 ) : null;

	//				END of update the LIST data in the option - datalist
	//--------------------------------------------------------------------------------------


	//--------------------------------------------------------------------------------------
	//				List of information of my Key item. The key is in my_key, initiate in the global variable

	let list_item = [];
	let list_picture = [];

	let my_field_name = table.getFieldByNameIfExists(myConstClass.my_const_name);

	// we check if the Name field exist
	if (my_field_name !== null) {
		// do nothing, keep my as it is			
	} 
	else {
		my_field_name = table.fields[0].name;
		}
	
	if (my_record){ 
		for (let i = 0; i < my_record.length; i++) {
		
			if ((my_record[i].name == my_key) || (my_record[i].getCellValueAsString(my_field_name) == my_key)) {

					for (let j = 0; j < table.fields.length; j++) { 	
						list_item.push({
									name_variable : table.fields[j].name,
									value_variable : my_record[i].getCellValueAsString(table.fields[j].name),
						});

						// we collect the attachement and we save in the list_picture
						// we will use it after to show the pictures
						if (table.fields[j].type == FieldType.MULTIPLE_ATTACHMENTS){
							let picture_address = my_record[i].getCellValueAsString(table.fields[j].name);
							let temp_picture_address = "";
							let start = false ;

							for (let k = 0; k < picture_address.length; k++) { 
								if ((picture_address[k] == "(" ) && (start == false)) {
									start = true ;
								}
								if ((start == true ) && (picture_address[k] != ")" ) && (picture_address[k] != "(")) {
									temp_picture_address = temp_picture_address + picture_address[k];
								}
								if (picture_address[k] == ")" ){
									start = false ;

									// check the format JPG, BMP, GIF and PNG
									if (
										(((temp_picture_address[temp_picture_address.length-3]).toUpperCase() == "J") &&		
										((temp_picture_address[temp_picture_address.length-2]).toUpperCase() == "P") && 			
										((temp_picture_address[temp_picture_address.length-1]).toUpperCase() == "G")) 										
										||
										(((temp_picture_address[temp_picture_address.length-3]).toUpperCase() == "G") &&		
										((temp_picture_address[temp_picture_address.length-2]).toUpperCase() == "I") && 			
										((temp_picture_address[temp_picture_address.length-1]).toUpperCase() == "F")) 
										||
										(((temp_picture_address[temp_picture_address.length-3]).toUpperCase() == "B") &&		
										((temp_picture_address[temp_picture_address.length-2]).toUpperCase() == "M") && 			
										((temp_picture_address[temp_picture_address.length-1]).toUpperCase() == "P")) 
										||
										(((temp_picture_address[temp_picture_address.length-3]).toUpperCase() == "P") &&		
										((temp_picture_address[temp_picture_address.length-2]).toUpperCase() == "N") && 			
										((temp_picture_address[temp_picture_address.length-1]).toUpperCase() == "G")) 
										)					
										{
											list_picture.push({
												img : temp_picture_address	});
										};
									
										// once it done, we reset the temp where it save the adrress of the picture
										temp_picture_address = "" ;
									}		

							}
						}
				}
			}
		
		}
	}
	else {
		console.log("No record"); 

	}
	
	//				END ---> My list of information for my key is upto date (if not empty)	
	//--------------------------------------------------------------------------------------


	// case there is no field and information for my items 

		if (list_item.length==0){
			//	list vide
			
			return (
				<div>
					<form>
						<label>
						Item needed : 

							<input
								type="text"
								value={my_key}
								list="data"
								onChange={e => setMy_Key(e.target.value)}
							/>
										
							<datalist id="data">
								{my_data_list}
							</datalist>

						</label>
						<p></p>
					</form>

					<div class="column1">    										
						<h2>My items information  </h2>
							<ul>	No data : items not found in the list			
							</ul>									
					</div>
				</div> 
						);
					
			}

	//------------------ END case there is no field and information for my items 

	//--------------- case there IS field and ALL the information for my items 
		else {
			
				//order by name the list of item name and ID
				list_item.sort(function(a, b) {
					if (a.name_variable==null){
						var nameA =" ";
					}
					else var nameA = a.name_variable.toUpperCase(); // ignore upper and lowercase
					
					if (b.name_variable==null){
						var nameA =" ";
					}
					else var nameB = b.name_variable.toUpperCase(); // ignore upper and lowercase
				
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}

				return 0;
					});
					
			// we collecte the pictures
			if ((list_picture) && (list_picture.length > 0)){
	
				let imgArray = new Image();

				for (let j = 0; j <list_picture.length; j++) { 
					imgArray[j] = new Image();
					imgArray[j].src = list_picture[j].img;
				}

				// we show the first picture for now 
				my_images_items = <img src={imgArray[0].src} class="displayed" width="90%" vertical-align="middle" />;	
			}
			
			const List_of_variable = list_item?list_item.map((list_item,index) =>
									<li key={index}>{list_item.name_variable} : {list_item.value_variable|| 'No data'} </li>
								) : null;						
							
		return (
			<div>
						<form>
							<label>
							My items needed : 
									<input
								type="text"
								value={my_key}
								list="data"
								onChange={e => setMy_Key(e.target.value)}
							/>
							<datalist id="data">
								{my_data_list}
							</datalist>

							</label>
							<p></p>
						</form>
							<div class="row" >
								<div class="column1">    																	
										<h2>My items information :  </h2>
											<ul class="bloc">	{List_of_variable}	</ul>									
								</div>
								<div  class="bloc" display="table-cell" vertical-align="middle" >
									{my_images_items}

								</div>
							</div>
						<div>
							<p></p>
							<Item_historique key_primary={my_key} table={table}/>	
						</div>
			</div>
		)
	}
}




function TableSchema({table}) {

    // ordered in the context of a specific view.
    // Also, this allows us to only show the fields visible within the selected view.

	let pictures_item;
	let my_record = useRecords(table);
		

//-----------------------------------------------------------------------				
		// for the futur for the pictures
		// Get the pictures of the table 

			let nombre_image = 0;
			
			if (pictures_item){
					for (let i = 0; i < (pictures_item.length); i++) {
						if (pictures_item[i] == "("){
						nombre_image = (nombre_image + 1);
						}
					}
				}
			
		// End of the pictures 
//-----------------------------------------------------------------------		

			return (
				<ErrorBoundary>
					<Box>
						<Box padding={3} borderBottom="thick" className="H1">
							<h1><Heading size="small" margin={0}>
							  <box  className="tittle">  Item information </box>
							</Heading></h1>
						</Box>

						<Box margin={3}>
							{
							<div>
								<div class="absolu">								
										
										<List_items__usestate  table={table} my_record={my_record} />
										<p></p>																						
										
										<div class="row"  >

										<p></p>									
									</div>
								</div>

							</div>	
							}					
						</Box>
					</Box>
			</ErrorBoundary>
			);

}

export default item_information;