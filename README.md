# My-Stock-Block
Manage the stock of items for a Shop or a Warehouse utility including creation of alert and personnalized KPI

This block works with Airtable. The language used for the development of the tools is Javascript with REACt.

The Blocks offer the possibility :
-   To check your stocks
-   To get items information
-   To follow the movement
-   To create and check the personnalized KPI
-   To manage user based on his ability and position

You have also the possibility to personnalized the design of your Blocks. 

## I How to run my Block Stock

### 1 Integration of My Block Stock in Airtable

   1. Importation of the Block from GitHub
  - First how to integrate the module Block Stock from GitHub
  - Connect to Airtable, and create a new base clicking "Add a base"
  - It is possible to create from scratch or to start with a template. To facilitate the exercice we will assume we start with a template. We will look for the template "Lemonade Stand Inventory". WWe just write Inventory and we can find it.
  - Once you have chose your template you can personalize it.
  - Then open you new base. We can already start to use the block. To do so, you need to go at your right and click on "Blocks"
  - Install a Block (you can check : [Digital video production template](https://airtable.com/templates/content-production/expKOGNEdcF0gmFW3/digital-video-production). You can also use an existing base or a different template: this block doesn't depend on any specific attributes from that template. Or Create a new block in your new base (see
   [Create a new block](https://airtable.com/developers/blocks/guides/hello-world-tutorial#create-a-new-block),    selecting "Table structure" as your template.
  - Build a custom block
  - Name your Block
  - Choose the option "Remix from GitHub"
- Add the GitHub repository : https://github.com/Vikento/MyShopBlock
- And validate clicking on Create Block
- You need to follow the instruction :
- Open a terminal
- Install CLI taping 
```bash
"npm install -g @airtable/blocks-cli"
```
- Set up the block on your computer : the commande start by 
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
- When the block is running, you can put the URL shared by your terminal on the airtable windows
- your block is installed !

### 2. Best Practices : creation of the Tables

   It is possible to personnalize the table : name the table, the base and the fields. Some of the table and field name have to be
   configurated directly in the code.
   
#### A/ Table usefull
   
   There is 2 different table very important for the management of the stock : "Inventory List" and "Storage activities"
   
   - "Inventory List" : list all the items existing in the stock.
   - "Storage activities" : is the list of movement of all the items. It can be received or delivery.

### 3. Installation and configuration of your block

   In the follwing part we will describe the creation of the different tables and fields in order to optimize your table .
   We assume that the step 1 Integration of My Block Stock in Airtable is done and work.

 #### a. List of tables and fields to create 

Currently you have 3 tables : Inventory List , Sales and Suppliers. We will configure the Inventory list.

***/!\ *** If you have not created your block with the template "Lemonade Stand Inventory" , you need to name one of the table **"Inventory List"**.

- **"Inventory List" table** :
   - The fields *"Items"*, *"Quantity in stock"*, *"Unit Price"*, *"Next Delivery"*, *"Notes"*, *"Pictures"* are alreaday created with the template **"Lemonade Stand Inventory"**. 
   - It is possible to add more fields to get more information. For instance : name, color, size, description, total value, last inventory date, last inventory quantity, last inventory 
   value...
   - You are free to create any additional field you need. All the fields you have will be automaticaly reach in the different modules :
         - the Stock
         - Item information 
         - KPI 
   - For the full usage of some the modules it is recommanded to create the following field in "Inventory List" :  
      - **"Name"**: he will describe your item (simple line text). It is different from the fields "Items" which is also the primary key. For instance some items can have the same name, but the color can change. So the field "Items" will have 2 differents values. The Name of the field will be used by the function "List_items__usestate" and will autosuggest the items with the name when the user start typing the item. If no field Name exist, the reference will be the primary key (here "Items" for the template choosen). All the following field are not mandatory but it will give more powerfull to your Block Stock. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "name" to personnalized
      export const my_const_name = "Name";
      ```

      - **"Product Code Serrial Number"** : it is the primary key to define a item. It is a unique ID that can help to get the exact items. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Product Code Serrial Number" to personnalize
      export const my_const_Product_Code =  "Product Code Serrial Number";
      ```

      - **"Threshold Alarm"** : it is the threshold on the number of item and it will trigger the warning. It is a number defined by the managers to have in time the information that the level of a specific item is low. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the  "Threshold Alarm" to personnalize
      export const my_const_Threshold_Alarm = "Threshold Alarm";
      ```

      - **"Threshold total Value"** :  it is the threshold on the value of items and it will trigger the warning. It is a number defined by the managers to have in time the information that the value of a specific item is high. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Threshold total Value" to personnalize
      export const my_const_Threshold_total_Value = "Threshold total Value";
      ```

      - **"Total Stock"** : it is the stock total for one item . It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Total Stock" to personnalize
      export const  my_const_Total_Stock = "Total Stock";
      ```

      - **"Total Value"** : it is the total value in the stock for a specific item. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Total Value" to personnalize
      export const my_const_Total_Value = "Total Value";
      ```

      - **"Check Stock"** : he give indicator in the state of the stock : low stock, stock OK... It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Check Stock" to personnalize
      export const my_const_Check_Stock = "Check Stock";
      ```

      - **"Check total Value"** : he give indicator in the value of the stock : value ok, stock high... It helps the warehouse manager and finance team that the stock value of the items are high. It will help to take decision and mitigate the risk of lost if something happen in the warehouse. It is an option for the KPI module : it will permit to activate the KPI on the alarm on the stock (function List_of_log_fonction). Others indicators mention here are needed. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Check total Value" to personnalize
      export const my_const_Check_total_Value = "Check total Value";
      ```
 

- **"Storage activities" table** :
   - The table **"Storage activities"** will record all the mouvement of the items to and from the warehouse. It is a item tracker which help the Warehouse Manager on the actities of the warehouse stock. With formula it is possible to link the **"Inventory List" table** to **"Storage activities" table** : then you can see the current stock based on the activities
   - In order to get the history of items in the module "Item information" and to see the KPI in the module Dashboard, it is recommanded the create specific fields in Storage activities. As it is the case for the table **"Inventory List"**, all the following fields are not mandatory but it will give more powerfull to your Block Stock
     
      - **"Quantity Before"** : it is the quantity of one specific item counted during the inventory or the quantity get before any move. It must be always positive. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Quantity Before" to personnalize
      export const my_const_Quantity_Before ="Quantity Before";
      ```

      - **"Quantity after"** : it is the quantity count for one specific item after any move. It must be always positive. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Quantity after" to personnalize
      export const my_const_Quantity_after ="Quantity after";
      ```

      - **""Date IN OUT"** : it is the date of the move of the specified items. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "Date IN OUT" to personnalize
      export const my_const_Date_IN_OUT = "Date IN OUT";
      ```

      - **"OUT"** : it is the field indicated if the items went in or or for a specific items. It can be personnalized in the myConstClass.js :
      ```javascript
        // change the "OUT" to personnalize
      export const my_const_OUT = "OUT";
      ```

      - **"Supplier Name"** : this field will give the supplier name. It must be always positive. It can be personnalized in the myConstClass.js :
      ```javascript
      // change the "Supplier Name" to personnalize
      export const my_const_Supply_name = "Supplier Name";
      ```


- **"KPI" table** :
   It is possible to create your own table to give KPI information. Currently you can have 2 type of KPI table : 
    - one personallized where all the information will be show how it is
    - one with VLookup rule which permet to give information based on 3 conditions : the value maximum, the value minimum and the median value

    The KPI table is describe in the next chapter.


#### 2 Rules to respect

#### 3 Personalyzed the Block   
    
### For further

  In order to personnalize the block, it is possible to change the line of the code. This part will describe quickly what can be modify easily without damaging th code.

1. Personalized Color background


## II Utility and User
After seen a lot of message in Airtable on warehouse table and stock management I decide to create a block in order to help the users.
The block was designed for a small business, a store or a warehouse. All of the following users have access to the block and to the database with specific rights. The users are for example:
- the store manager to check the stocks, update the inventory, add the items received and given to the supplier and customer
- the buyer to follow the state of stocks and anticipate an order of material
- the commercial to know the products he can use in his project for his client and his region. He can also configure the tool to know the cost of the product and the margins
- the financier, to monitor the state of stocks and know the value of its assets.
- the manager of the company or project manager, who can configure the application in order to personalize the block according to his teams: give rights to users, follow all movements, coordinate between different users if necessary.


## III Dev

The Stock Block was created with the template offered by Airtable : blocks-todo-list : (https://github.com/Airtable/blocks-todo-list) .

## IV See the block running

![Block that shows information about the selected table and its fields](media/Block creation/PresentationBlock.gif)


## V Definition

- Storage Activities or Store activities : place managed by the store responsible and where all the items are kept. The items can be received or distributed to a third party.