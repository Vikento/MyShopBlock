import {
    useBase,
    useRecords,
} from '@airtable/blocks/ui';
import {cursor} from '@airtable/blocks';
import React, {useState} from 'react';
import {session} from '@airtable/blocks';
import {FieldType} from '@airtable/blocks/models';


// importation of the all my const
// to change some table name, field, dimension, it is possible to change the 
// the file myConstClass
import * as myConstClass from "./myConstClass.js";



// function used for List_of_VlookUp_indicateur
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
    
    
    // function used for List_of_VlookUp_indicateur
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
        
        return ([min , name_field_targeted]);
        
    }
    
    // function used for List_of_VlookUp_indicateur
    // get the value in the middle of the list of value 
    function ConditionMedian(table, field_value_median, field_target){
    
        let med;
        let name_field_targeted;
        
        const my_records_field = useRecords(table, {fields: [field_value_median, field_target]});
        
        // initialisation of max and name_field_targeted
        let temporary_list = [];

        for (let i = 0; i < my_records_field.length; i++) {
            temporary_list.push({
                value_figure : my_records_field[i].getCellValue(field_value_median),
                name_figure : my_records_field[i].getCellValue(field_target),
            });
        }

        temporary_list.sort((a, b) => (a.value_figure > b.value_figure) ? 1 : -1);

        for (let i = 0; i < temporary_list.length; i++) {
             console.log("l 110 valeur : " + i + " " + temporary_list[i].value_figure);
         
        }
        console.log("l 110 taille  : " + temporary_list.length);

        med = temporary_list[Math.round((temporary_list.length)/2-1)].value_figure;
        name_field_targeted = temporary_list[Math.round((temporary_list.length)/2-1)].name_figure;

        return ([med , name_field_targeted]);        
    }
    
    
    // personnalized indicators per user
    // possible to do simple Vlook up with 3 type of condition
    // max , min, and nedian
    function List_of_VlookUp_indicateur() {
        const base = useBase();
        let table_Vlookup ;
    
        const list_VlookUp_KPI = [];
        let table_Vlookup_KPI_exist = false;
            
        // 1 - check if the special field for Vlookup exist
        // 1.1 - chcek user session exist and the user is autorize to see the Vlookup KPI
        // 2 - get the information from Vlookup
        // 3 - check line by line all the Vlookup before to create the KPI
        //		3.1 - check if the name of table indicate in the Vlookup table exist. If not STOP
        // 		3.2 - check if the field of table indicate
    
        for (let i = 0; i < base.tables.length; i++) {
    
            if (base.tables[i].name == myConstClass.NAME_TABLE_KPI_VLOOKUP){
                table_Vlookup = base.getTableByNameIfExists(base.tables[i].name);
                table_Vlookup_KPI_exist = true;
            }
        }
    
        if (!table_Vlookup_KPI_exist){
            // do nothing if table doesn't exit
            return <div> </div>;
                }
        else{
            // 1 - check if the special field for Vlookup exist
            //
    
            let FIELD_NAME_KPI_exist = false;
            let FIELD_NAMETABLE_exist = false;
            let FIELD_NAMEFIELD_exist = false;
            let FIELD_NAMEFIELD_TARGETED_exist = false;
            let FIELD_SELECTCONDITION_exist = false;
            let FIELD_USER_ID_exist = false;
    
            for (let i = 0; i < table_Vlookup.fields.length; i++) {
                if (table_Vlookup.fields[i].name == myConstClass.FIELD_NAME_KPI) {
                    FIELD_NAME_KPI_exist = true;
                }
                if (table_Vlookup.fields[i].name == myConstClass.FIELD_NAMETABLE) {
                    FIELD_NAMETABLE_exist = true;
                }
                if (table_Vlookup.fields[i].name == myConstClass.FIELD_NAMEFIELD) {
                    FIELD_NAMEFIELD_exist = true;
                }
                if (table_Vlookup.fields[i].name == myConstClass.FIELD_NAMEFIELD_TARGETED) {
                    FIELD_NAMEFIELD_TARGETED_exist = true;
                }
                if (table_Vlookup.fields[i].name == myConstClass.FIELD_SELECTCONDITION) {
                    FIELD_SELECTCONDITION_exist = true;
                }
                if (table_Vlookup.fields[i].name == myConstClass.KPI_USER_AUTORIZE) {
                    FIELD_USER_ID_exist = true;
    
                }
    
            }
            // all the fields exist
            if (FIELD_NAME_KPI_exist && FIELD_NAMETABLE_exist &&  FIELD_NAMEFIELD_exist &&
                FIELD_NAMEFIELD_TARGETED_exist && FIELD_SELECTCONDITION_exist && FIELD_USER_ID_exist){
    
                // 1.1 - check user session exist and the user is autorize to see the Vlookup KPI
                    //1.1.a get the user session and user id :
                    let user_id;
                    if (session.currentUser) {
                        user_id = session.currentUser.id;
                        
                
                        const my_records_field = useRecords(table_Vlookup, {fields: [myConstClass.FIELD_NAME_KPI, myConstClass.FIELD_NAMETABLE, myConstClass.FIELD_NAMEFIELD, myConstClass.FIELD_NAMEFIELD_TARGETED,myConstClass.FIELD_SELECTCONDITION,myConstClass.KPI_USER_AUTORIZE]});
                        const myRecord_USER = useRecords(table_Vlookup, {fields: [myConstClass.KPI_USER_AUTORIZE]});
                    
                        // 3 - check line by line all the Vlookup before to create the KPI
                        for (let i = 0; i < my_records_field.length; i++) {
                        
                            let user_authorize = false;
    
                            // the type of KPI_USER_AUTORIZE can be MULTIPLE_COLLABORATORS or SINGLE_COLLABORATOR
                            // case 1 MULTIPLE_COLLABORATORS, we check one among the set is the user id
                            if (table_Vlookup.getFieldIfExists(myConstClass.KPI_USER_AUTORIZE).type == FieldType.MULTIPLE_COLLABORATORS) {
                                if (myRecord_USER[i].getCellValue(myConstClass.KPI_USER_AUTORIZE) != null){
                                    for (let k = 0; k < myRecord_USER[i].getCellValue(myConstClass.KPI_USER_AUTORIZE).length; k++){
                                        if (session.currentUser.id== myRecord_USER[i].getCellValue(myConstClass.KPI_USER_AUTORIZE)[k].id){
                                            user_authorize = true;
                                        }
                                    }
                                }
                            }
                            // case 2 SINGLE_COLLABORATOR, we check the id correspond to the User
                            else if (table_Vlookup.getFieldIfExists(myConstClass.KPI_USER_AUTORIZE).type == FieldType.SINGLE_COLLABORATOR) {
                                    if (session.currentUser.id== myRecord_USER[i].getCellValue(myConstClass.KPI_USER_AUTORIZE).id){
                                        user_authorize = true;
                                }
                            }
    
                            if (user_authorize)
                            {
    
                                if (base.getTableByNameIfExists(my_records_field[i].getCellValue(myConstClass.FIELD_NAMETABLE))){
                                    let table_selected_ok = base.getTableByNameIfExists(my_records_field[i].getCellValue(myConstClass.FIELD_NAMETABLE));
                                    
                                    //		3.1 - check if the name of table indicate in the Vlookup table exist. If not STOP
                                    let FIELD_FIELD_NAMEFIELD_exist = false;
                                    let FIELD_NAMEFIELD_TARGETED_exist = false;
                                        for (let j = 0; j < table_selected_ok.fields.length; j++) {
    
                                            if (table_selected_ok.fields[j].name == my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD)){
                                                FIELD_FIELD_NAMEFIELD_exist = true;
                                            }
                                            if (table_selected_ok.fields[j].name == my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD_TARGETED)){
                                                FIELD_NAMEFIELD_TARGETED_exist = true;
                                            }
                                        }
                                            if (FIELD_FIELD_NAMEFIELD_exist && FIELD_NAMEFIELD_TARGETED_exist){
    
                                                //we check case by case depend on the value of condition
                                                //
                                                // 3 types of condition :
                                                //		-- Max of all the value : myConstClass.VALMAX_COND
                                                //		-- Min of all the value : myConstClass.VALMIN_COND
                                                //		-- Middle value of all the value : myConstClass.VALMEDIAN_COND
                                                if (my_records_field[i].getCellValue(myConstClass.FIELD_SELECTCONDITION).name == myConstClass.VALMAX_COND){
                                                
                                                    let val_max_target = ["nothingValMax" ,"nothingValMax"];
                                                    val_max_target = ConditionValMax(table_selected_ok,my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD),  my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD_TARGETED));
                                                    
                                                    list_VlookUp_KPI.push({
                                                        name_KPI : my_records_field[i].getCellValue(myConstClass.FIELD_NAME_KPI),
                                                        condition_selected : my_records_field[i].getCellValue(myConstClass.FIELD_SELECTCONDITION).name,
                                                        table_checked : my_records_field[i].getCellValue(myConstClass.FIELD_NAMETABLE),
                                                        field_checked : my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD),
                                                        value_cond : val_max_target[0],
                                                        field_targeted : val_max_target[1]
                                                        });
    
                                                }
                                                else if (my_records_field[i].getCellValue(myConstClass.FIELD_SELECTCONDITION).name == myConstClass.VALMIN_COND){
    
                                                    let val_min_target = ["nothingValMin" ,"nothingValMin"];
                                                    val_min_target = ConditionValMin(table_selected_ok,my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD),  my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD_TARGETED));
                                                                                        
                                                    list_VlookUp_KPI.push({
                                                        name_KPI : my_records_field[i].getCellValue(myConstClass.FIELD_NAME_KPI),
                                                        condition_selected : my_records_field[i].getCellValue(myConstClass.FIELD_SELECTCONDITION).name,
                                                        table_checked : my_records_field[i].getCellValue(myConstClass.FIELD_NAMETABLE),
                                                        field_checked : my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD),
                                                        value_cond : val_min_target[0],
                                                        field_targeted : val_min_target[1]
                                                        });
                                                }
                                                else if (my_records_field[i].getCellValue(myConstClass.FIELD_SELECTCONDITION).name == myConstClass.VALMEDIAN_COND){	
                                                
                                                    let val_med_target = ["nothingMed" ,"nothingMed"];
                                                    val_med_target = ConditionMedian(table_selected_ok,my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD),  my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD_TARGETED));
                                                                                        
                                                    list_VlookUp_KPI.push({
                                                        name_KPI : my_records_field[i].getCellValue(myConstClass.FIELD_NAME_KPI),
                                                        condition_selected : my_records_field[i].getCellValue(myConstClass.FIELD_SELECTCONDITION).name,
                                                        table_checked : my_records_field[i].getCellValue(myConstClass.FIELD_NAMETABLE),
                                                        field_checked : my_records_field[i].getCellValue(myConstClass.FIELD_NAMEFIELD),
                                                        value_cond : val_med_target[0],
                                                        field_targeted : val_med_target[1]
                                                        });							
    
                                                }
                                                else {
                                                    alert("The field " + myConstClass.FIELD_SELECTCONDITION + " row " + i + 
                                                " hasn't a good value. You need to have in the field " + myConstClass.FIELD_SELECTCONDITION + " the selected Value " +
                                                myConstClass.VALMAX_COND + " or " + myConstClass.VALMIN_COND + " or " + myConstClass.VALMEDIAN_COND + " . Thank you");
                                                }
                                            }
                                            else {
                                                alert("One or both field " + myConstClass.FIELD_NAMEFIELD + " and " +  myConstClass.FIELD_NAMEFIELD_TARGETED + " row " + i + 
                                                " doesn't exist. You need to change and put a correct field name in the table " + 
                                                myConstClass.NAME_TABLE_KPI_VLOOKUP + " in the fields : " + myConstClass.FIELD_NAMEFIELD + " and " 
                                                +  myConstClass.FIELD_NAMEFIELD_TARGETED + " . Thank you !");
                                            }
                                }
                                else {
                                    alert("The table " + myConstClass.FIELD_NAMETABLE + " row " + i + " doesn't exist. You need to change and put a correct table in the table " + 
                                    myConstClass.NAME_TABLE_KPI_VLOOKUP + " in the field : " + myConstClass.FIELD_NAMETABLE);
                                }
                            }
                            else{
                                // nothing to do :
                                // the user is not in the list of user to see the KPI
                                //
                            }
                        } 
                    }
                    else {
                        // nothing to do :
                        // the user is not logged
                        //
                    }
                }
    
            else {
        	alert("Some fields in your table " + myConstClass.NAME_TABLE_KPI_VLOOKUP + " doesn't exist. We suggest you put the correct name or to delete the complete table of " + myConstClass.NAME_TABLE_KPI_VLOOKUP + " and create new KPI Vlookup. Thank you");
    
            }
        
    
        // list of my VKoolup KPI
        const data_to_show_all_VLOOKUP_KPI =[];
    
            for (let k = 0; k < list_VlookUp_KPI.length; k++) {
                data_to_show_all_VLOOKUP_KPI.push({
                titre : (list_VlookUp_KPI[k].name_KPI),
                valeur_title : <li >  {list_VlookUp_KPI[k].condition_selected} of {list_VlookUp_KPI[k].field_checked} in {list_VlookUp_KPI[k].table_checked} </li>,
                valeur_unit : <li >  {list_VlookUp_KPI[k].field_targeted} : {list_VlookUp_KPI[k].value_cond} </li>		
                });	
            }
    
            // regroup all the element of VLook up to be rendered
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
    }
    
    export default List_of_VlookUp_indicateur;    