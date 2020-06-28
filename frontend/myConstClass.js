// All my constant configurable by the user


// Def : % of the 3 columns space
// Usage : Module "My Stock"
// file : index.js
export const FIELD_ID_WIDTH_PERCENTAGE = '35%';
export const FIELD_DESCRIPTION_WIDTH_PERCENTAGE = '35%';
export const FIELD_QUANTITY_WIDTH_PERCENTAGE = '30%';


// Def : Number of Char to limit the size of the string. It will give a better view of the tools
// Usage : Module "My Stock"
// file : index.js
export const NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL = 10;

// Def : name of the table
// Usage : Module "Item Information" and "My Dash Board"
// file : index.js , item_information.js , kpi.js
export const INVENTORY_WAREHOUSE = "Inventory List";

// Def : name of the table
// Usage : Module "Item Information" 
// file : item_information.js
export const History_Movement = "Storage Activities";

// Def : activation of Storage Activities and History of operation
// Usage : Module "Item Information" 
// file : item_information.js
export const STORAGE_ACTIVITY_LOG_ACTIVATED = true;

// Def : activation of Storage Activities and History of operation
// Usage : Module Dash Board / KPI
// file : List_of_log_fonction.js
export const LIST_OF_LOG_FUNCTION_ACTIVATED = false;


// Def : List of fields in the table INVENTORY_WAREHOUSE
// Usage : Module "Item Information" 
// file :  item_information.js
export const my_const_name = "Name";
export const my_const_Product_Code_Serrial_Number = "Product Code Serrial Number";

// Def : List of fields in the table History_Movement
// Usage : Module "Item Information" 
// file :  item_information.js
//export const my_const_Product_Code_Serrial_Number = "Product Code Serrial Number";
export const my_const_Quantity_Before ="Quantity Before";
export const my_const_Quantity_after = "Quantity after";
export const my_const_Date_IN_OUT = "Date IN OUT";
export const my_const_OUT = "OUT";
export const my_const_Received_by_given_to = "Received by / given to";
export const my_const_Supply_name = "Supplier Name";


// def : word used in the field OUT to give the status of the item. It can be material received or material give
// the constant RECEIVED_FROM and GIVEN_TO will be used as a word in the item_information.js , for the list
// of operation and it will give the information if the material is given or taken from the supplier
// Usage : Module "Item Information" 
// file :  item_information.js 
export const MATERIAL_IN = "Material IN";
export const RECEIVED_FROM = "received from";
export const MATERIAL_OUT = "Material OUT";
export const GIVEN_TO = "given to";

// def : List of fields in the KPI table. It will define the User that can see the KPI
// TO BE Modified if you want to personalize the field name of NAME_TABLE_KPI_VLOOKUP
// Usage : Module "My DashBoard" 
// file :  List_of_personalize_indicateur.js , List_of_VlookUp_indicateur.js , Create_KPI_VLOOKUP.js"
export const KPI_USER_AUTORIZE = "--USER ONLY--"; 

// def : Word to take in account for the creation of the KPI
// Usage : Module "My DashBoard" 
// file :  List_of_personalize_indicateur.js 
export const KPI_DASHBOARD_NAME = "DashBoard"; 
export const KPI_IGNORE_FIELD_CHAR = "--"; 

// Def : table name specific to VLookup KPI
// Usage : Module DashBoard 
// file :  List_of_VlookUp_indicateur.js", Create_KPI_VLOOKUP.js
export const NAME_TABLE_KPI_VLOOKUP = "Dashboard Table VLookup";


//--------- const Name of the field for the Dashboard Table Vlookup :
// TO BE Modified if you want to personalize the field name of NAME_TABLE_KPI_VLOOKUP
// /!\ : before to modified check on the function "Create_KPI_VLOOKUP" : const "recordFields" are fixed for now. Issue to be fixed

// Def : field name specific to VLookup KPI and creation of new VLookup KPI
// Usage : Module DashBoard 
// file :  List_of_VlookUp_indicateur.js , Create_KPI_VLOOKUP.js"
export const FIELD_NAME_KPI = "Name KPI";
export const FIELD_NAMETABLE = "NameTable";
export const FIELD_NAMEFIELD = "NameField";
export const FIELD_NAMEFIELD_TARGETED = "NameField targeted";
export const FIELD_SELECTCONDITION = "SelectCondition";
export const FIELD_ID = "ID";


// Def : name of the condition specific to VLookup KPI
// Usage : Module DashBoard 
// file :  List_of_VlookUp_indicateur.js"
export const VALMAX_COND = "ValMax";
export const VALMIN_COND = "ValMin";
export const VALMEDIAN_COND = "Val_Median";
// --------  END   ---------------------------



// Def : field name specific to the table Inventory List
// Usage : Module DashBoard 
// file :  List_of_log_fonction.js
export const my_const_Check_Stock = "Check Stock";
export const my_const_Threshold_Alarm = "Threshold Alarm";
export const my_const_Total_Stock = "Total Stock";
export const my_const_Product_Code =  "Product Code Serrial Number";
//export const my_const_name = "Name";
export const my_const_Threshold_total_Value = "Threshold total Value";
export const my_const_Total_Value = "Total Value";
export const my_const_Check_total_Value = "Check total Value";
// --------------- 


// personnalized color for the background of the Block Stock
// Usage : all the Module 
// file :  load in main.js
export const Couleur_BBC = "#FF9F1C";
// END