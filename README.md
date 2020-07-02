# My-Stock-Block
Manage the stock of items for a Shop or a Warehouse utility including creation of alert and personalized KPI

This block works with Airtable. The language used for the development of the tools is Javascript with REACt.

The Blocks offer the possibility :
-   To check your stocks
-   To get items information
-   To follow the movement
-   To create and check the personalized KPI
-   To manage user based on his ability and position

You have also the possibility to personalized the design of your Blocks. 

## I/ Why My-Stock-Block ? Who can be interested ?
After seeing messages and messages in Airtable on warehouse table and stock/store management I decided to create a block that will help the users.

The block was designed for a small and medium business, a store or a warehouse. All of the following users have access to the block and to the database with specific rights. The users are for example:
- the store manager to check the stocks, update the inventory, add the items received and given to the supplier and customer
- the buyer to follow the state of stocks and anticipate an order of material
- the commercial to know the products he can use in his project for his client and his region. He can also configure the tool to know the cost of the product and the margins
- the financier, to monitor the state of stocks and know the value of its assets.
- the manager of the company or project manager, who can configure the application in order to personalize the block according to his teams: give rights to users, follow all movements, coordinate between different users if necessary.
This block is build for the Storage Activities or Store activities, or any place managed by the store responsible and where all the items are kept. The items can be received or distributed to a third party.

## II/ How to run my Block Stock

### 1 Integration of My Block Stock in Airtable

   1. Importation of the Block from GitHub
  - First how to integrate the module Block Stock from GitHub
  - Connect to Airtable, and create a new base clicking "Add a base"
  - It is possible to create from scratch or to start with a template. Let see the two options :
  

  | Option 1 : start with a template  | Option 2 : start from scratch |
  | ------------- | ------------- |
  | We look for the template "Lemonade Stand Inventory". We just write "Inventory" and we can find it.  | - We create two new tables for instances *"Inventory List"*, where we will list all the existing items , and *"Storage activities"* where we will follow the activities of our store. We will see why those two tables are important in the next chapter. |
  |  |  |
  | Once you have chose your template you can personalize it : create new fields, add your own items, create your description and information for each items... | You can add the fields we need. To facilitate you can import a spreadsheet : click on the "+" at the level of the table name, import a spreadsheet, CSV file, choose CSV file. The CSV file with the field is in the https://github.com/Vikento/MyShopBlock/tree/master/media/CSV%20Table . When you import the CSV file, you will need to change the type based on the data |
  
  - The two options continue in the same way
  - Open your new base. We can already start to use the block. To do so, you need to go at your right and click on "Blocks"
  - Install a Block . You can also check : [Digital video production template](https://airtable.com/templates/content-production/expKOGNEdcF0gmFW3/digital-video-production).
  - Build a custom block
  - Give a name to your Block
  - Choose the option "Remix from GitHub"
  - Add the GitHub repository : https://github.com/Vikento/MyShopBlock
  - And validate clicking on Create Block
  - You need to follow the instruction :
  - Open a terminal
  - Install CLI taping 
  ```bash
  "npm install -g @airtable/blocks-cli"
  ```
  - Set up the block on your computer : the command starts by 
  ```bash
  "block init " ....
  ```
  - Navigate to your block directory: 
  ```bash
  cd name_of_your_block
  ```
  - Run the block : 
  ```bash
  block Run 
  ```
  - When the block is running, you can put the URL shared by your terminal on the airtable windows browser
  - Congrats :-) , your block is installed !

### 2. Creation of the Tables and Fields

   It is possible to personalize the table : name the table, the base and the fields. But some of the table and field name have to be
   configurated with the exactly name, as we need to identify the fonctionnality of each of them. Of course, as we will see in the constant part, it is possible to modify the constant name and give the personalized name which the code you understand. This part is little more complexe, but not impossible ;-) 
   
  Before to start : there are two different tables very important for the management of the stock : **"Inventory List"** and **"Storage Activities"**
  
   - "Inventory List" : list all the items existing in the stock. It describe the type of items you can have

   - "Storage Activities" : list of movement of all the items. It can be received or delivery. It uselly fill by the warehouse manager when he received or give a items from the store. 

   - it is not mandatory, but the two table can be linked. For instance to get the information on the total stock available in table **"Inventory List"** the quantity should be linked to all the operation done for one item in the table **"Storage Activities"**.

![Tables Needed](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/Table_Name.jpg?raw=true)

### 3. Installation and configuration of your block

   In the following part we will describe the creation of the different tables and fields in order to optimize your table .
   We assume that the step 1 Integration of My Block Stock in Airtable is done and works.

 #### a. List of tables and fields to create 

If you have choosen the option 1 above *Start with a template* you should have 3 tables : Inventory List , Sales and Suppliers. We will configure the Inventory list. If you have choosen the option 2 *start from scratch* you should have 2 tables Inventory List and Storage activities

> :warning: if you have not created your block with one of the two options, you need at least to name one of the table **"Inventory List"**.

- **"Inventory List" table** :
   - With the option 2 follow during the installation (**1 Integration of My Block Stock in Airtable**), you have all the fields created . Be sure the type of the fields matchs to your need. With option 1 - the template **"Lemonade Stand Inventory"** - the fields *"Items"*, *"Quantity in stock"*, *"Unit Price"*, *"Next Delivery"*, *"Notes"*, *"Pictures"* are created. You need to create the others listed below. 
   - It is possible to add more fields to get more information. For instance : name, color, size, description, total value, last inventory date, last inventory quantity, last inventory, weight, List of provider, contract ID... 
   - You are free to create any additional fields you need. All the fields you have will be automatically reachable in the different modules :
         - the Stock
         - Item information 
         - KPI 
   - For the full usage of some the modules it is recommanded to create the following field in "Inventory List" :  
      1. **"Items"** : it is the primary key to define an item. It is an unique ID that can help to get the exact items. It is not mandatory but you need the primary Key for the KPI module : function List_of_log_fonction. The field name will not create issue but it is important to use the same primary key in your table *"Inventory List" table* and *"Storage activities" table*. 

      2. **"Name"**: he will describe your item (simple line text). It is different from the fields "Items" which is the primary key. For instance some items can have the same name, but the color can change. So the field "Items" will have 2 differents values. The Name of the field will be used by the function "List_items__usestate" and will autosuggest the items with the name when the user start typing the item. If no field Name exist, the reference will be the primary key (here "Items" for the template choosen). All the following fields are not mandatory but it will give more powerfull to your Block Stock : it will permit to create KPI alarm if the stock is low or alarm if the value for one item is high . It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "name" to personalized
      export const my_const_name = "Name";
      ```

      3. **"Threshold Alarm"** : it is the threshold on the quantity of items and it will trigger the warning. It is a number defined by the managers to have in time the information that the level of a specific item is low. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the  "Threshold Alarm" to personalize
      export const my_const_Threshold_Alarm = "Threshold Alarm";
      ```

      4. **"Threshold total Value"** :  it is the threshold on the value of items and it will trigger the warning. It is a number defined by the managers to have in time the information that the value of a specific item is high. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Threshold total Value" to personalize
      export const my_const_Threshold_total_Value = "Threshold total Value";
      ```

      5. **"Total Stock"** : it is the stock total for one item . It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Total Stock" to personalize
      export const  my_const_Total_Stock = "Total Stock";
      ```

      6. **"Total Value"** : it is the total value in the stock for a specific item. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Total Value" to personalize
      export const my_const_Total_Value = "Total Value";
      ```

      7. **"Check Stock"** : he give indicator in the state of the stock : low stock, stock OK... It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Check Stock" to personalize
      export const my_const_Check_Stock = "Check Stock";
      ```

      7. **"Check total Value"** : he give indicator in the value of the stock : value ok, stock high... It helps the warehouse manager and finance team that the stock value of the items are high. It will help to take decision and mitigate the risk of lost if something happen in the warehouse. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Check total Value" to personalize
      export const my_const_Check_total_Value = "Check total Value";
      ```
 
      ![Inventory List Fields](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/Fields_Inventory_List.JPG?raw=true)


- **"Storage activities" table** :
   - The table **"Storage Activities"** will record all the mouvements of the items to and from the warehouse. It is an item tracker which helps the Warehouse Manager on the actities of the warehouse stock. With formula it is possible to link the **"Inventory List" table** to **"Storage Activities" table** : then you can see the current stock based on the activities
   - In the primaryField, you need to add the same primary field identification of Inventory List table. The date will recognize the names are identical to show the information on the activities

   - In order to get the history of items in the module "Item information" and to see the KPI in the module Dashboard, it is recommanded to create the specific fields in Storage activities. As it is the case for the table **"Inventory List"**, all the following fields are not mandatory but it will give more powerfull to your Block Stock : it will create a part in Item information with all the activites for a specific item (function **item_information.js**). 
     
      1. **"Quantity Before"** : it is the quantity of one specific item counted during the inventory or the quantity get before any move. It must be always positive. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Quantity Before" to personalize
      export const my_const_Quantity_Before ="Quantity Before";
      ```

      2. **"Quantity after"** : it is the quantity count for one specific item after any move. It must be always positive. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Quantity after" to personalize
      export const my_const_Quantity_after ="Quantity after";
      ```

      3. **"Date IN OUT"** : it is the date of the move of the specified items. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "Date IN OUT" to personalize
      export const my_const_Date_IN_OUT = "Date IN OUT";
      ```

      4. **"OUT"** : it is the field indicated if the items went in or out for a specific items. It can be personalized in the `myConstClass.js` :
      ```javascript
        // change the "OUT" to personalize
      export const my_const_OUT = "OUT";
      ```

      5. **"Supplier Name"** : this field will give the supplier name. It must be always positive. It can be personalized in the `myConstClass.js` :
      ```javascript
      // change the "Supplier Name" to personalize
      export const my_const_Supply_name = "Supplier Name";
      ```
 You can add some data now. You should have something like that :
   ![Storage activities Fields](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/Fields_Store_Activities_List.JPG?raw=true)


- **"KPI" table** :
   It is possible to create your own table to give KPI information. Currently you can have 2 types of KPI table : 
    - one table personallized where all the informations will be showed how it is. Only the first line is taken in account
    - one table with VLookup rule which permit to give information based on 3 conditions : the value maximum, the value minimum and the median value

   > The KPI table is described in the next chapter (in **4. Using your block under Dash Board**)

 #### b. Customizing

  Once you have created the table and field, it is time to customize and add all the missing table and field that you feel you will need.

  1. create user with authorization : not all the functionnalities are reachable by all type of users. So when the table and fields are created, you can give access to the users. 
      - The *read only user* and *commenter user* can have access to the list of items (module *"My Stock"*), the description of the items (Module *"Items Information"*) and some KPI (Module *"My DashBoard"*). 
      - the *Editor user* and *the creator* have access to all the module and they have the possibility to create Vlookup KPI. It is the responsability to the creator and editor user to update the table

  2. update all the items : when the previous fine tunning is done, it is time to update all the items in your table *"Inventory List"*

![Add Data](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/Add_Data.gif?raw=true)


  3. adapt color and css : to match with your company, it is possible to modify the code and modify the CSS information. The current version was created for the Store BijouMax. It is free to use. All CSS information are in **Apply_CSS.js**.


![Adapt Color](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/Adapt_CSS.gif?raw=true)

  


### 4. Using your block
There is 3 modules created : *My Stock*, *Item Information*, *My Dash Board*. They have all a specific usage and can be accessible to all the users.
  1. My Stock :

  - It is the list of all the items in the stock. It is create with 3 colums : the primary Key and 2 others column showing 2 fields from the table **"Inventory List"**. 

![Module My Stock ](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/My_Stock_module_1.gif?raw=true)

  - To get access to more information on the item it is possible to click on the item (ITEM ID - PRIMARY KEY // first column). It will open the second module : **"Item Information"**. If you want to update information, you can click on the second or the third column. It will open a window with summary information of the items.
  - The items are ordered by the creation order. It is not possible for now to order by alphabetic order. It will be a feature if requested
  - You can chose the fields of your need. To avoid table not adapted the name and information of the items were limited and truncated. It will write 10 chars if you have not changed anything . It is possible to change the numbner of char keep to have optimized view of your table changing the default value of **"NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL"** . This constant is in the file `myConstClass.js` :
    ```javascript
        // change the value to the number of char you want to print in the table
      export const NUNBER_OF_CHAR_SEEN_IN_STOCK_PER_COLL = 10;
    ```

![Change size char ](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/ChangeSizeName.gif?raw=true)


 2. Item Information : 
    
    - this module show all the information relative to a specific item.

![Item Information Module ](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/My_Item_Information_module.gif?raw=true)


   - If you have clicked on the item ID from the module **"My Stock"**, it will show the information from this item. If you need to look for another item you can click on the input field, be sure there is not item already writen (you can delete), and type the item you are looking for. The search will target the *"Items"* field. If you have create *"Name"* field, it will all check on this part. In order to facilitate, it will autosuggest the list of item during you write the name or ID of the item. With this version the Item Information will show you on the right part the picture you added in your table. The format .gif, .png, .bmp and .jpg are supported. 
    - Ignore some items if needed : add **"--"** in front of the fields name will result to ignore the item. You will not see this specific item in the Module Item Information. You can as well change **"--"** with another string from `myConstClass.js` .  
   
```javascript
    // change "--" if you want to adapt to your need.
    export const KPI_IGNORE_FIELD_CHAR = "--"; 
  ```

   - Order your items if needed : in the module Item information you will see the field information ordered by alphabetic. So to have a better classication, you need to rename the field. For instance you can use 1/ , 2/, 3/ ... to get the exact order need.

![Change Order ](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/Change_order.gif?raw=true)

   - If the table **"Storage Activities"** is created with all the information fields listed in the previous chapter, it will list all the operations : item received and given from the store. If the fields or the table doesn't exist, you will get message it is not created. If you don't create the table and all the fields needed, you will get a message to inform you need the data cannot be show. To avoid this message, you have the constante **"STORAGE_ACTIVITY_LOG_ACTIVATED"** that you can change the value (in myConstClass.js) to false :
  
  ```javascript
        // change the value to true if you want to activate the log or false if not
      export const STORAGE_ACTIVITY_LOG_ACTIVATED = true;
  ```


  3. My Dash Board 
  
      - This module will show all the KPI you are authorize to see. The user is detected and the KPI is shower base on the user ID. There is 3 types of KPI that can be seen :
      

      1. **KPI on the alert** : it is a fixed KPI which depend on the recommanded fields name configurated in the previous chapter. It is important to have all the fields in **"Inventory List" table** (check chap **3. Installation and configuration of your block** and **a. List of tables and fields to create**). The KPI will list all the alerts on the quantity, when it is lower than the threshold. Also alert on the total value for an item when it is higher than the value configurated. So it will show 2 alerts by items. If one of the fields or the tables are not presents, the KPi will not show. If you need to see all the table and fields, but you dont want to have the KPI, you can desastivated the option in myConstClass puting false in front of constant **"LIST_OF_LOG_FUNCTION_ACTIVATED"**.


  ![Activation Log KPI ](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/Activation_Log_KPI.gif?raw=true)
      
     2. **personalized KPI** : the module **"My Dash Board"** will check all the table starting by **"DashBoard"** and it will show the information for each field. 
      - all the take which doesn't start by **"DashBoard"** will not take in account in the Dash Board module
        - The field name will be the name of the KPI, and in the first line, the value filled will be the value. 
        - If you plan to add column to link the others tables or if you don't need to show some fields, it is possible to ignore them. On the field name, you add "--" (const KPI_IGNORE_FIELD_CHAR) and it will ignore the field.
        - the field is accessible to the user only if the field "--USER ONLY--" (const KPI_USER_AUTORIZE) is created. In this field (first row), all the users need to see the field have to be added. 
        - only the first row is taken in account for the creation of the KPI.
        - the name of the KPI can be give : in the name of the table , after **"DashBoard"** you can add the name of your field. For instance, you can name it : **"DashBoard My best Sales"** and the KPI **"My best Sales will"** be added


  ![KPI creation ](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/KPI_Creation_TYPE_1.gif?raw=true)


    3. **VLook Up KPI** : this KPI is usefull to create indicor which is relative the highest, the lowest or the medium value. 
      - It will give the value based on what you need (max value, min value or median value) and will apply to the field of your selection. Then based on your need it will show which field relative to the result you want to show. For instance you need to check the item name of the highest stocks from all the items : you will choose the table where you have the field *"number of stock"*, you choose the condition (Value maximum), and the field you want to see *"Name of the item"*. 
      - Only for numeric field it is applicable (Types : COUNT, CURRENCY, DATE, DATE_TIME, DURATION, FORMULA, NUMBER, PERCENT, RATING
      - The field you want to show should be in the same table
      - Only Creator user and Editor user can create  **VLook Up KPI** .
      - the creation can be done directly with the button **"Create Vlookup indicator"** . The user who creates the table will be added automatically. To add more users, it is possible to do it using the field **"--USER ONLY--"** : you add the collaborators line by line where you want the user get access to the **VLook Up KPI**
      - the creation of this type of KPI can be also done using the field **"Dashboard Table VLookup"**. All the KPI relative to the "Create Vlookup indicator" are listed in this table. The risk to do it manually is to make a mistake on the name of the table and fields. At this moment you will get alert and you will not see the KPI desired
      - it is recommended to not change the type of the field
      - to delete one *VLook Up KPI* go on the table **"Dashboard Table VLookup"** . Select the row of the KPI you don't need and delete it. All the user will not have access to the KPI. 


![KPI creation ](https://github.com/Vikento/MyShopBlock/blob/master/media/Block_creation/KPI_Creation_TYPE_3.gif?raw=true)


## III/ Dev

The Stock Block was created with the template offered by Airtable like blocks-todo-list and accessible in (https://github.com/Airtable/blocks-todo-list) .


### Modification of the 3 modules
  The 3 modules are managed by **main.js**. It will pass from one module to another. It load the CSS file at the begining 

#### Module My Stock
  - The module is managed by **index.js**

#### Module Item Information
  - The module is managed by **item_information.js**

#### Module Dash Board
  - The module is managed by **kpi.js**. KPI need :
      - **List_of_log_fonction.js** : manage the implemented KPI Log depending of some field you must create
      - **List_of_personalize_indicateur.js** : manage the possibility for the user to create any KPI
      - **Create_KPI_VLOOKUP.js** : manage the creation of the KPi Vlookup indicator
      - **List_of_VlookUp_indicateur.js** : manage the KPi Vlookup indicator

### Constantes
  - All the main constant, specially the one to personalize the user interface are in **myConstClass.js**

### CSS 
  - All the CSS loaded are in the file **Apply_CSS.js** . It is loaded by **main.js** when the block is started

## IV/ See the block running

![Block that shows information about the selected table and its fields](media/Block creation/PresentationBlock.gif)

