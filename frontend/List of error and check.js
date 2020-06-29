
// FIN CSS

//  Amelioration
//
//
//	Feature :
//
//  - Dans index
//		1/ when we delete on line / row, it is create the probleme "Record missing in table "
//
//
//  - Dans ItemInformation
//		 1/ dans le fichier item information gerer clicker sur images pour les faire defiler si on en trouve
//
//	- Dans KPI	
//		2/ faire afficher correctement les unites currency et autres pour les dashboard vlookup	
//		3/ a la creation de de la table : pas de creation de la ligne pour le nouvel indicateur
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
