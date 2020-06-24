# My-Stock-Block
Manage the stock of items for a Shop or a Warehouse utility including creation of alert and personnalized KPI

This block work with Airtable. It is description bellow how to install and configure your block

The Project offer :

-   How to check the stock
-   How to add user, and create personalized KPI for each user
-   Personnalized the design to 

## I How to run my Block Stock

### 1 Integration of My Block Stock

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

   2. Creation of the Table for the best use

   In this part it is the recommandation that you can follow

#### 1 List of tables and fields to create

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