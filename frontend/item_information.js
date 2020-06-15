import {
    Box,
    Heading,
    useBase,
    useWatchable,
    useRecords,
	Button,
	
} from '@airtable/blocks/ui';
import {cursor} from '@airtable/blocks';
import ErrorBoundary from "./ErrorBoundary";
import React, {useState} from 'react';
import {
  Route,
  NavLink,} from "react-router-dom";
import Home from "./Home";
import {globalConfig} from '@airtable/blocks';
import {session} from '@airtable/blocks';
import Downshift from 'downshift'
import NoWarehouseTable from "./NoWarehouseTable";

const my_const_Product_Code_Serrial_Number = "Product Code Serrial Number";
const my_const_Quantity_Before ="Quantity Before";
const my_const_Quantity_after = "Quantity after";
const my_const_Date_IN_OUT = "Date IN OUT";
const my_const_OUT = "OUT";
const my_const_Received_by_given_to = "Received by / given to";
const my_const_Supply_name = "Supplier Name";


function item_information() {

	let session_name;
	let session_id;	
	

	if (session.currentUser !== null) {
		
		const base = useBase();
		console.log("l 29 ma base : " + base.name);
		session_name = session.currentUser.name;
		session_id = session.currentUser.id;
		
		let the_key = "key_primary"+session_id;
		
		
		let key_value ;
		//key 
		if (globalConfig.get(the_key)) {
			console.log("l cle creer et transmise : " + globalConfig.get(the_key));
			key_value = globalConfig.get(the_key);
		}
		else {
			console.log("l 43  pas de cle : " + globalConfig.get(the_key));
			key_value = base.tables[0].fields[0].name;
		}
		

		console.log("l 39 key_value : " + key_value);

 
		// useWatchable is used to re-render the block whenever the active table or view changes.
		useWatchable(cursor, ['activeTableId', 'activeViewId']);
		
		const [tableName, setTableName] = useState('Stock in the warehouse');


		const table = base.getTableByNameIfExists(tableName);

		
		// We fix the table name
		console.log("Ma base : " + table);


		if (table) {
			return <TableSchema base={base} table={table} item_key_primary={key_value} />;
		} 
		
		else {
				return ( 
				<div>
					<h2> Item information : </h2>
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
	else {
		alert ("/!\Please identify as an user or you cannot access to the information reauested");
		return null;
	}
}



// Presentational header row helper component.
function My_Image({pictures_item,nombre_image}){
    
	console.log("nb image : " + nombre_image);
	if (pictures_item){
		let imgArray = new Array();
		let t = 0; 
		let source_image = "";
		
		console.log("pictures_item dans my image : " + pictures_item);
		
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
		console.log("lien : " + imgArray[0].src);


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

function Item_historique({key_primary}) {
	
	const base = useBase();


	const [tableName, setTableName] = useState('Historique');

	
	const table_historique = base.getTableByNameIfExists(tableName);

	if (table_historique){

			let my_record_historique = useRecords(table_historique);
			let quantity_before = new Array();
			let quantity_after = new Array();
			let quantity_in_out_date = new Array();
			let in_out_status = new Array();
			let give_receive_from = new Array();
			let supply_name = new Array();	
			
			let nb_operation_in_out = 0;

			let quantity_before_field_exist = false;
			let quantity_after_field_exist = false;
			let quantity_in_out_date_field_exist = false;
			let in_out_status_field_exist =  false;
			let give_receive_from_field_exist = false;
			let supply_name_field_exist = false;

			// check of the field in Histo are created :

			for (let j = 0; j < table_historique.fields.length; j++) { 
				if (table_historique.fields[j].name == my_const_Quantity_Before){
					quantity_before_field_exist = true;
				}
				if (table_historique.fields[j].name == my_const_Quantity_after){
					quantity_after_field_exist = true;
				}
				if (table_historique.fields[j].name == my_const_Date_IN_OUT){
					quantity_in_out_date_field_exist = true;
				}
				if (table_historique.fields[j].name == my_const_OUT){
					in_out_status_field_exist = true;
				}
				if (table_historique.fields[j].name == my_const_Received_by_given_to){
					give_receive_from_field_exist = true;
				}
				if (table_historique.fields[j].name == my_const_Supply_name){
					supply_name_field_exist = true;
				}
			}

			if (quantity_before_field_exist && quantity_after_field_exist && quantity_in_out_date_field_exist &&
				in_out_status_field_exist && give_receive_from_field_exist && supply_name_field_exist) {
			
				for (let i = 0; i < my_record_historique.length; i++) {
					if (my_record_historique[i].getCellValue(my_const_Product_Code_Serrial_Number) == key_primary){
						quantity_before[nb_operation_in_out] = my_record_historique[i].getCellValue(my_const_Quantity_Before);
						quantity_after[nb_operation_in_out] =  my_record_historique[i].getCellValue(my_const_Quantity_after);
						quantity_in_out_date[nb_operation_in_out] =  my_record_historique[i].getCellValue(my_const_Date_IN_OUT);
						in_out_status[nb_operation_in_out] =  my_record_historique[i].getCellValue(my_const_OUT);
						give_receive_from[nb_operation_in_out] =  my_record_historique[i].getCellValue(my_const_Received_by_given_to);
						supply_name[nb_operation_in_out] = my_record_historique[i].getCellValue(my_const_Supply_name);
						nb_operation_in_out = nb_operation_in_out + 1;
					}
				}


				const list_quantity = [];

				for (let i = 0; i < nb_operation_in_out; i++) {
					console.log("IN out avant : " + in_out_status[i]);
					if (in_out_status[i]=="Material IN"){
						in_out_status[i] = "received from";
					}
					else if (in_out_status[i]=="Material OUT"){
						in_out_status[i]= "given to";
					}
					else {in_out_status[i] = " - "};
					
					list_quantity.push({
						qtity_before : quantity_before[i],
						qtity_after : quantity_after[i],
						the_date : quantity_in_out_date[i],
						supplier : in_out_status[i],
						given_or_received : supply_name[i]
					});
					console.log("IN out apres : " + in_out_status[i]);
				}



				if (nb_operation_in_out != 0) {
					
					return (
								
								<div >
								<h2> Historique {key_primary}  </h2>
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
								<h2> Historique {key_primary}  </h2>
									<ul>
										<v1 color="red" > No data or operation for now </v1>
									</ul>
								</div>
							
								);
				
			}
			else {
				
				return (
								
					<div >
					<h2> Historique component </h2>
						<ul>
							<v1 color="red" > To have a full functionnality with Historique you need to create all the following field in Histoire table </v1>
								<p>{my_const_Product_Code_Serrial_Number}</p>
								<p>{my_const_Quantity_Before}</p>
								<p>{my_const_Quantity_after}</p>
								<p>{my_const_Date_IN_OUT}</p>
								<p>{my_const_Received_by_given_to}</p>
								<p>{my_const_Supply_name}</p>
						</ul>
					</div>
				
					);



			}
		}
			else {

				return ( 
					<div>
						<h2> Historique : </h2>
						<p> </p>
						No historique because : No base with the table name 'Historique' . For the full functionnality you have to create a Table with the name of 'Historique' :
						<p> </p>
						
						When you create the 'Historique', you can reload or refresh the page.
						<p> </p>
						If it is still not working, please contact the dev team. Thank you !
			
				</div>
				)


			}
			
}

async function onSubmit() {
		var item_REF = document.getElementById("donne_enregistre").value;
   


		let session_name;
		let session_id;	
		
		if (session.currentUser !== null) {
				session_name = session.currentUser.name;
				session_id = session.currentUser.id;
		}
		else alert ("Please identify as an user or you cannot access to the information reauested");

		let key_to_save = "key_primary" + session_id;

		if (globalConfig.hasPermissionToSet(key_to_save, item_REF)) {
			console.log("Cle sauvegarde l 48 : " + item_REF);
			console.log("Variable de la cle l 49 : " + key_to_save);
			await globalConfig.setAsync(key_to_save, item_REF);
		}
		
		<NavLink to="/item_information"> {item_REF || "!! - ID vide !!!"}  </NavLink>
		window.location.reload();
    }

	
function Input_list_item({my_record, table}){
		
	const items = [];
	
	console.log("l 289 - my_record : " + my_record + " ma table : " + table);

	//get all the code
	for (let i = 0; i < my_record.length; i++) {
        items.push({
		value : my_record[i].name})
	}
	
	//get the Name of item if the field "Name" is created
	for (let j = 0; j < table.fields.length; j++) { 
		if (table.fields[j].name == "Name"){
			for (let i = 0; i < my_record.length; i++) {
				items.push({
				value : my_record[i].getCellValue("Name") })
			}
		}
	}

	for (let j = 0; j < my_record.length; j++) { 	
		console.log("448 - list_item " + j + " " + items[j].value);
	}
	
	//order by name the list of item name and ID	
	items.sort(function(a, b) {
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

	  // names must be equal
	  return 0;
	});


	let value_imput ="Bonjour";
	
    return (
        <form onSubmit={onSubmit} my_record={my_record}>
            <Box display="flex" padding={3}>
         				
				
				<Downshift itemToString={item => (item ? item.value : '')}>
						{({
						  getInputProps,
						  getItemProps,
						  getLabelProps,
						  getMenuProps,
						  isOpen,
						  inputValue,
						  highlightedIndex,
						  selectedItem,
						  getRootProps,
						}) => (
						  <div>
							<label {...getLabelProps()}> </label>
							<div
									
									style={{display: 'inline-block'  }}
									{...getRootProps({}, {suppressRefError: true})}
							>
								<input {...getInputProps()} id="donne_enregistre" />
							</div>
							<ul {...getMenuProps()} id="demoFont">
							  {isOpen
								? items
									.filter(item => !inputValue || item.value.includes(inputValue))
									.map((item, index) => (
									  <li
										{...getItemProps({
										  key: item.value,
										  index,
										  item,
										  style: {
											backgroundColor:
											  highlightedIndex === index ? 'lightgray' : 'white',
											fontWeight: selectedItem === item ? 'bold' : 'normal',
										  },
										})}
									  >
										{item.value}
									  </li>
									))
								: null}
							</ul>
						  </div>
						)}
					  </Downshift>			
				
				
				
                <Button size="small" variant="primary" marginLeft={2} type="submit" >
                    Search
                </Button>
            </Box>
        </form>
    );

}

function TableSchema({base, table, item_key_primary}) {
    // We read the fields from viewMetadata instead of using table.fields because fields are only
    // ordered in the context of a specific view.
    // Also, this allows us to only show the fields visible within the selected view.
   
		

	// let cle_primaire_a_recuperer = "SOL1520814ED" ;
	// la cle peut etre ID ou le Name
	let cle_primaire_a_recuperer = item_key_primary;
	let name_item;
	let id_item;
	let description_item;
	let color_item;
	let unit_value_item;
	let last_inventory_quantity_item;
	let total_value_last_inventory_item;
	let date_Last_Inventory_item;
	let total_consumption_item;
	let total_stock_item;
	let threshold_alarm_item;
	let check_stock_item;
	let total_value_item;
	let threshold_total_value_item;
	let check_total_value_item;
	let pictures_item;
	
	let my_record = useRecords(table);
	
	
	let list_item = [];


	let my_field_name = table.getFieldByNameIfExists('Name');
	if (my_field_name !== null) {
		// ne rien faire, garder my field comme il est configure			
	} else {
		my_field_name = table.fields[0].name;
	}
	
	if (my_record){ 
		for (let i = 0; i < my_record.length; i++) {

			//
			//
			//   NAME to be change !!
			//
			//
			console.log("l435 my_field_name : " + my_field_name);
			
			
			if ((my_record[i].name == cle_primaire_a_recuperer) || (my_record[i].getCellValueAsString(my_field_name) == cle_primaire_a_recuperer)) {

					for (let j = 0; j < my_record.length; j++) { 	
						console.log("name field " + j + " :" +  table.fields[j].name);
						console.log("name value record i = " + i + " -- j = " + j + "  : " + my_record[i].getCellValueAsString(table.fields[j].name));
						list_item.push({
									name_variable : table.fields[j].name,
									value_variable : my_record[i].getCellValueAsString(table.fields[j].name),
										})	
				}
			}
		
		}
	}
	else {console.log("446 - pas de record"); }
	

		if (list_item.length==0){
		//	list vide
		
		
		return (
						<ErrorBoundary> 
							<Box>
								<Box padding={3} borderBottom="thick" className="H1">
									<h1><Heading size="small" margin={0}>
									  <box  className="tittle">  Item information : no information available </box>
									</Heading></h1>
									
								</Box>

								<Box margin={3}>

									{
									<div>
										<div >
											 
										</div>
										<div class="absolu">
											
											<div class="row" >
												<div class="column1">    
														
														<h2>My items information :  </h2>
														<ul >
															<p>	No item available base on the key : to solve the problem we sugere you go on My Stock and choose an item</p>
															<img src="https://i.postimg.cc/nVkbmF0c/No-Information.gif" width="100%" />
															<p> </p>
															<p>	If the problem persit, please contact the dev team. Thank you</p>
					
														
														</ul>									
														
													</div>
																			
													<div class="column2" display="table-cell" vertical-align="middle" >
														 					
													</div>
												</div>
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
		
		
		for (let j = 0; j < list_item.length; j++) { 
			console.log("name : " + list_item[j].name_variable + " = " + list_item[j].value_variable);
		}
		
		const List_of_variable = list_item?list_item.map((list_item,index) =>
								<li key={index}>{list_item.name_variable} = {list_item.value_variable} </li>
							) : null;




			
			let unit_value_item_string;
			let total_value_last_inventory_item_string ;
			let threshold_total_value_item_string;
			let total_value_item_string;

			// convert currency in string to format them 
			if (unit_value_item) {
				unit_value_item_string = unit_value_item.toLocaleString();
			}
			if (total_value_last_inventory_item){
				total_value_last_inventory_item_string = total_value_last_inventory_item.toLocaleString();
			}
			if (threshold_total_value_item){
				threshold_total_value_item_string = threshold_total_value_item.toLocaleString();
			}
			if (total_value_item){
				total_value_item_string =total_value_item.toLocaleString();
			}
			
			
			let nombre_image = 0;
			
			if (pictures_item){
					for (let i = 0; i < (pictures_item.length); i++) {
						if (pictures_item[i] == "("){
						nombre_image = (nombre_image + 1);
						}
					}
				}
			else console.error("Element image empty : " + pictures_item);
			
			
			
			
			return (
			
					<Box>
						<Box padding={3} borderBottom="thick" className="H1">
							<h1><Heading size="small" margin={0}>
							  <box  className="tittle">  Item information : {name_item} </box>
							</Heading></h1>
							
						</Box>

						<Box margin={3}>

							{
							<div>
								<div >
									<Input_list_item my_record={my_record} table={table} /> 
								</div>
								<div class="absolu">
									
									<div class="row" >
										<div class="column1">    
												
												<h2>My items information :  </h2>
												<ul>	{List_of_variable}								
			
												</ul>									
												
											</div>
																	
											<div class="column2" display="table-cell" vertical-align="middle" >
												< My_Image pictures_item={pictures_item} nb_imag={nombre_image} /> 					
											</div>
										</div>
										<div class="row"  >
										<p></p>
											<Item_historique key_primary={cle_primaire_a_recuperer}/>	
										
									</div>
								</div>
							</div>
							
							}
												
						</Box>

					</Box>
			
			);
			window.location.reload();
	}
}

export default item_information;