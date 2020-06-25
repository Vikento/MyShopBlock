import {
    Heading,
    useBase,
} from '@airtable/blocks/ui';
import React, {useState} from 'react';
import {session} from '@airtable/blocks';
import ErrorBoundary from "./ErrorBoundary";
import { Button, Dialog, Text } from "@airtable/blocks/ui";
import { Select } from "@airtable/blocks/ui";
import { Input } from "@airtable/blocks/ui";
import {FieldType} from '@airtable/blocks/models';


// importation of the all my const
// to change some table name, field, dimension, it is possible to change the 
// the file myConstClass
import * as myConstClass from "./myConstClass.js";



 // fonction Create_KPI_VLOOKUP to create a new VLookup indicator
 // 
 // this functionnality only accessible to the creator User
 function Create_KPI_VLOOKUP({base}){

    // we check if the user is connected
    if (session.currentUser) {
       // if the user is connected, we check the user is a creator.
       const createRecordsCheckResult = session.checkPermissionsForCreateRecords();
   
       // if he has the permission to create, we can show the buttom, else we wil not propose to create 
       // the Vlookup KPI and we hidde the buttom
        if (createRecordsCheckResult.hasPermission){
   
           // const to manage the dialogue durng the creation of the new KPI:
           // close the dialogue when set to false
           const [isDialogOpen, setIsDialogOpen] = useState(false);
   
           base = useBase();
           const table_Lookup = base.getTableByNameIfExists(myConstClass.NAME_TABLE_KPI_VLOOKUP);
   
   
           // KPI name
           let name_input ;
   
           //-----------------------fill the 1nd select button with table name create in Airtable------------------- 
           //
           const my_table_list = [];
           for  (let i = 0; i < base.tables.length; i++) { 
               my_table_list.push({
                   value : base.tables[i].name, 
                   label : base.tables[i].name
               });
           }
           //
           //-----------------------END fill the 1nd select button with table name create in Airtable------------------- 
   
   
           const [my_table_list_value, setmy_table_list_value] = useState(my_table_list[0].value);
           
   
           //-----------------------fill the 2nd select button for the field name base on the previous table name-------------------
           //
           const my_field_list = [];
           for  (let i = 0; i < base.tables.length; i++) { 
               if (base.tables[i].name == my_table_list_value){
                   for (let j = 0; j < base.tables[i].fields.length; j++) { 
                       my_field_list.push({
                           value : base.tables[i].fields[j].name, 
                           label : base.tables[i].fields[j].name
                       });
                       }
                   }
               }
           //
           //----------------------- END fill the 2 select button-------------------
   
   
           //-----------------------fill the 2nd select button for the field name base on the previous table name-------------------
           // ------------ same lit of fiel of my_field_list, but limited with COUNT, CURRENCY , DATE , DATE_TIME , DURATION , FORMULA 
           // NUMBER , PERCENT , RATING type
           // This is to avoid to apply numeric condition when the field is no numeric 
           const my_field_list_numeric = [];
           for  (let i = 0; i < base.tables.length; i++) { 
           if (base.tables[i].name == my_table_list_value){
               for (let j = 0; j < base.tables[i].fields.length; j++) { 
   
                   if ((base.tables[i].fields[j].type == FieldType.COUNT) || (base.tables[i].fields[j].type == FieldType.CURRENCY) || (base.tables[i].fields[j].type == FieldType.DATE)||
                   (base.tables[i].fields[j].type == FieldType.DATE_TIME)||(base.tables[i].fields[j].type == FieldType.DURATION)||(base.tables[i].fields[j].type == FieldType.FORMULA)||
                   (base.tables[i].fields[j].type == FieldType.NUMBER)||(base.tables[i].fields[j].type == FieldType.PERCENT)||(base.tables[i].fields[j].type == FieldType.RATING)){
                       my_field_list_numeric.push({
                           value : base.tables[i].fields[j].name, 
                           label : base.tables[i].fields[j].name
                           });
                           }
                       }
                   }
           }
           //
           //----------------------- END fill the 2 select button-------------------
   
           const [valuemy_field_list, setmy_field_list] = useState(my_field_list[0].value);
           const [valuemy_field_targeted_list,setvaluemy_field_targeted_list]= useState(my_field_list[0].value);
   
   
           // ------------------------  List of condition possible :------------------------
           // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - -- -- - - - //
           //   In the futur possible to create new condition.
           const condition_list = [
               { value: myConstClass.VALMAX_COND, label: myConstClass.VALMAX_COND },
               { value: myConstClass.VALMIN_COND, label: myConstClass.VALMIN_COND },
               { value: myConstClass.VALMEDIAN_COND, label: myConstClass.VALMEDIAN_COND }
           ];
           //
           // ------------------------ End  List of condition possible :------------------------
   
           const [value_conditionvalue, setCondition] = useState(condition_list[0].value);
   
           //----------------- function to update the value select.
           // this function is call in Select_table on Change; It help to have the initial value with th first field name if exist
           function Update_select_field_for_new_table_selected(newValue){
               let mytable_selected = base.getTableByNameIfExists(newValue);
                   if (mytable_selected){
                   setmy_field_list(mytable_selected.fields[0].name);
                   setvaluemy_field_targeted_list(mytable_selected.fields[0].name);
               }
           }
           //----------------- END function to update the value select.
   
           // --------------- Const Select table where the table where the field for the condtion is :
           //
           const Select_table = () => {
               return (
               <Select
                   options={my_table_list}
                   value={my_table_list_value}
                   onChange={newValue => (setmy_table_list_value(newValue), Update_select_field_for_new_table_selected(newValue),console.log("l newValue : " + valuemy_field_list))}
               />
               );
           };
           //
           // --------------- END Const Select table where the table where the field for the condtion is ----------
   
           // --------------- Const Select Field where the field for the condition is : --------------------
           const Select_field = () => {
               return (
               <Select
                   options={my_field_list_numeric}
                   value={valuemy_field_list}
                   onChange={newValue => setmy_field_list(newValue)}
               />
               );
           };
   
           //--------------- END Const Select Field where the field for the condition is : --------------------
   
           // --------------- Const Select Field targeted : the one we will select to see the KPI : --------------------
           //
           const Select_field_targeted = () => {
               return (
               <Select
                   options={my_field_list}
                   value={valuemy_field_targeted_list}
                   onChange={newValue_field_targeted => setvaluemy_field_targeted_list(newValue_field_targeted)}
               />
               );
           };
           //
           //--------------- END  Const Select Field targeted : the one we will select to see the KPI : --------------------
   
   
           // --------------- Const condition is : --------------------
           //
           const Selectcondition = () => {
               return (
               <Select
                   options={condition_list}
                   value={value_conditionvalue}
                   onChange={newValueSelection => setCondition(newValueSelection)}
               />
               );
           };
           //
           // --------------- END Const condition is : --------------------
   
           //------------- fct to update the imput name  --------------
           function Update_new_name(newValueSelection){
           name_input = newValueSelection.target.value;
           }
           //
           //------------- END fct to update the imput name  --------------
   
           // -----------------  Input_Name_KPI description :
           //
           const Input_Name_KPI = () => {
   
                   return (
                       <Input
                       type="text"
                       onChange={e => (Update_new_name(e))}
                       placeholder="Name : "
                       />
                   );
               };
           //
           // -----------------  END Input_Name_KPI description --------------
           
               // create of the KPI vlookup-----------------------------------------------------------------------------------------------
               // 1- creation of the table if not exist
               //	1-1 : check if the user can create the table
               //  1-2 : check if the user is connected, if yes get the user id
               // 2-if table exist, we check the field exist with the exact name
               //	2-1 : we check the field ok and type of field Ok : if it is not exist the type of field change, we request to fix it before to create the new KPI
               //  2-2 : we check the name of the KPI is filled correctly
               //	2-3 : we check the permission to update the table (= to create the KPI), if Ok, we create the KPi
               async function CreateVlookup_Indicator(){
   
                   // 1- creation of the table if not exist
                   if(!table_Lookup){
                       CreateNewTable();
                   }
   
                   //  1-2 : check if the user is connected, if yes get the user id
   
                   // USER id :
                   let user_id;
   
   
                   if (session.currentUser) {
                       
                       // User exist :
                       user_id = session.currentUser; 
   
                       // 2-if table exist, we check the field exist with the exact name
                       if(table_Lookup){
                           const recordFields = {
                               'Name KPI' : name_input,
                               'NameTable' : my_table_list_value,
                               'NameField' : valuemy_field_list,
                               'NameField targeted' : valuemy_field_targeted_list,
                               'SelectCondition' : {name: value_conditionvalue },
                               '--USER ONLY--' : [user_id],
                               }
   
                           //	2-1 : we check the field ok and type of field Ok : if it is not exist the type of field change, we request to fix it before to create the new KPI
   
                           let field_Name_KPI_table_Lookup_exist = false;
                           let field_NameTable_table_Lookup_exist = false;
                           let field_NameField_table_Lookup_exist = false;
                           let field_NameField_targeted_table_Lookup_exist = false;
                           let field_SelectCondition_table_Lookup_exist = false;
                           let field_user_id_exist = false;
                           
   
                           for  (let i = 0; i < table_Lookup.fields.length; i++) {
                                   if (table_Lookup.fields[i].name == myConstClass.FIELD_NAME_KPI){
                                       if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
                                           field_Name_KPI_table_Lookup_exist = true;
                                       }
                                       else {
                                           alert("Warning the type of Name_KPI field in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
                                           setIsDialogOpen(false);
                                           }
                                   }
                                   if (table_Lookup.fields[i].name == myConstClass.FIELD_NAMETABLE){
                                       if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
                                           field_NameTable_table_Lookup_exist = true;
                                       }
                                       else {
                                           alert("Warning the type of NameTable field in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
                                           setIsDialogOpen(false);
                                           }
                                   }
                                   if (table_Lookup.fields[i].name == myConstClass.FIELD_NAMEFIELD){
                                       if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
                                           field_NameField_table_Lookup_exist = true;
                                       }
                                       else {
                                           alert("Warning the type of NameField field in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
                                           setIsDialogOpen(false);
                                           }
                                   }
                                   if (table_Lookup.fields[i].name == myConstClass.FIELD_NAMEFIELD_TARGETED){
   
                                       if (table_Lookup.fields[i].type == FieldType.SINGLE_LINE_TEXT){
                                           field_NameField_targeted_table_Lookup_exist = true;
                                       }
                                       else {
                                           alert("Warning the type of the field NameField targeted in your table is not a SINGLE_LINE_TEXT. Please change it before to create a Vlookup KPI. Thank you! ");
                                           setIsDialogOpen(false);
                                           }
                                   }
                                   if (table_Lookup.fields[i].name == myConstClass.FIELD_SELECTCONDITION){
                                       if (table_Lookup.fields[i].type == FieldType.SINGLE_SELECT){
                                           field_SelectCondition_table_Lookup_exist = true;
                                       }
                                       else {
                                           alert("Warning the type of SelectCondition field in your table is not a SINGLE_SELECT. Please change it before to create a Vlookup KPI. Thank you! ");
                                           setIsDialogOpen(false);
                                           }
                                       }
                                   if (table_Lookup.fields[i].name == myConstClass.KPI_USER_AUTORIZE){
   
                                       if ((table_Lookup.fields[i].type == FieldType.MULTIPLE_COLLABORATORS) || 
                                           (table_Lookup.fields[i].type == FieldType.SINGLE_COLLABORATOR)){
                                           field_user_id_exist = true;
                                       }
                                       else {
                                           alert("Warning the type of user_id field in your table is not a MULTIPLE_COLLABORATORS or SINGLE_COLLABORATOR. Please change it before to create a Vlookup KPI. Thank you! ");
                                           setIsDialogOpen(false);
                                           }
                                       }
                                       else {
                                       //	console.log("l  960 field name " + i + " : " + table_Lookup.fields[i].name + " - type "  + table_Lookup.fields[i].type);
                                       }
                               }
                               
                               if (field_Name_KPI_table_Lookup_exist && field_NameTable_table_Lookup_exist && field_user_id_exist &&
                                   field_NameField_table_Lookup_exist && field_SelectCondition_table_Lookup_exist && field_NameField_targeted_table_Lookup_exist )
                               {
                                   
                                   //  2-2 : we check the name of the KPI is filled correctly
                                   if ((!name_input) || (name_input=="")){
                                       alert(`Please give a name to the KPI you are creating. Thank you`);
                                       setIsDialogOpen(true);
                                   }
                                   else {
                                   //	2-3 : we check the permission to update the table (= to create the KPI), if Ok, we create the KPi
                                       if (table_Lookup.hasPermissionToCreateRecord(recordFields)) {
                                                   const newRecordId = await table_Lookup.createRecordAsync(recordFields);
                                                   // New record has been saved to Airtable servers.
                                                   alert(`new record with ID ${newRecordId} has been created`);
                                                   setIsDialogOpen(false);
                                               }
                                       else 
                                           {
                                               alert(`No permission to create a new record`);
                                               setIsDialogOpen(false);
                                           }
                                       }
                               }
                               else {
                                   alert(`One of the field doesnt exist in the table Table VLookup or the type of the field is not correct. Please be sure you have the following table Name_KPI, NameTable, NameField, SelectCondition`);	
                               }
                               
                       }
   
   
                   }
                   else {
                       // user not connected : 
   
                       user_id="";
                       alert("You need to be connected to create the KPI. ")
                   }
                   
               }
               //--------------------------- END create of the KPI vlookup-----------------------------------------------------------------------------------------------
   
               //---------------  function to create the base if is it not exist------------------------
               async function CreateNewTable() {
                   const name = myConstClass.NAME_TABLE_KPI_VLOOKUP;
                   const fields = [
                       // Name will be the primary field of the table.
                       {name: myConstClass.FIELD_ID, type: FieldType.NUMBER, options: {
                           precision: 1,
                       }},
                       {name: myConstClass.FIELD_NAME_KPI, type: FieldType.SINGLE_LINE_TEXT},
                       {name: myConstClass.FIELD_NAMETABLE, type: FieldType.SINGLE_LINE_TEXT},
                       {name: myConstClass.FIELD_NAMEFIELD, type: FieldType.SINGLE_LINE_TEXT},
                       {name: myConstClass.FIELD_NAMEFIELD_TARGETED, type: FieldType.SINGLE_LINE_TEXT},
                       {name: myConstClass.FIELD_SELECTCONDITION, type: FieldType.SINGLE_SELECT, options: {
                           choices: [
                               {name: myConstClass.VALMAX_COND},
                               {name: myConstClass.VALMIN_COND},
                               {name: myConstClass.VALMEDIAN_COND},
                           ],
                       }},
                       {name: myConstClass.KPI_USER_AUTORIZE, type: FieldType.MULTIPLE_COLLABORATORS}
                   ];
                   //	1-1 : check if the user can create the table
                   if (base.unstable_hasPermissionToCreateTable(name, fields)) {
                       await base.unstable_createTableAsync(name, fields);
                   }
                   else {
                       alert("You have not the right to create a new KPI, please check with a creator user ");
                   setIsDialogOpen(false);
                   }
               }
               //--------------- END  function to create the base if is it not exist------------------------	
   
           return (
                   <React.Fragment>
                       <Button onClick={() => setIsDialogOpen(true)}>Create VLookup indicator</Button>
                       {isDialogOpen && (
                           <Dialog onClose={() => setIsDialogOpen(false)} width="600px" position="fixed" bottom="-100" right="0">
                           <Dialog.CloseButton />
   
                           <Heading>Create new indicator</Heading>
                           <Text variant="paragraph">
                               Fill the information to create a new indicator Vlookup
                           </Text>
                           <table>
                               <tr>
                                   <td>
                                       <p>Table choosen : </p>
                                   </td>
                                   <td>	
                                       <Select_table /> 
                                   </td>
                               </tr>
                               <tr>
                                   <td>
                                           <p>The condition to apply to the field : </p>
                                   </td>
                                       <td>	<Selectcondition/>
                                   </td>
                               </tr>
                               <tr>
                                   <td>
                                           <p>Field to apply Condition :  </p>
                                   </td>
                                       <td>	<Select_field/> 
                                       </td>
                               </tr>
                               <tr>	
                                   <td>
                                           <p>Field correspondant : </p>
                                   </td>
                                   <td>	<Select_field_targeted />
                                   </td>
                               </tr>
                               <tr>
                                       <td>	
                                           <p>Name KPI :  </p>
                                       </td>
                                           <td>	<Input_Name_KPI />
                                       </td>
                               </tr>
                               </table>
                           <p> </p>
                           <div >
                               <Button onClick={() => setIsDialogOpen(false)} text-align= "center"  margin=" 0 auto" >Cancel</Button>
                               <Button onClick={() => CreateVlookup_Indicator()}  text-align= "center"  margin=" 0 auto">Create KPI</Button>
                           </div>
                           </Dialog>
                       )}
                   </React.Fragment>
               );
           }
           else {
   
               return <div>  </div> ;			
               // case user not authorized to create
               // nothing to do , nothing to show
           }
       }
       else {
           // case the usr is not conneced
           // nothing to do , nothing to show
           return <div>  </div> ;
       }
   }
   
export default Create_KPI_VLOOKUP;