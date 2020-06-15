# My-Stock-Block
Manage the stock of items for a Shop or a Warehouse utility including creation of alert and personnalized KPI

This block work with Airtable. It is description bellow how to install and configure your block

The Project offer :

-   How to check the stock
-   How to add user, and create personalized KPI for each user
-   Personnalized the design to 

## How to run this block

1. Create a new base using the
   [Digital video production template](https://airtable.com/templates/content-production/expKOGNEdcF0gmFW3/digital-video-production).
   (You can also use an existing base or a different template: this block doesn't depend on any
   specific attributes from that template.)

2. Create a new block in your new base (see
   [Create a new block](https://airtable.com/developers/blocks/guides/hello-world-tutorial#create-a-new-block),
   selecting "Table structure" as your template.

3. Follow the instruction


4. From the root of your new block, run `block run`.

## Utility and User
After seen a lot of message in Airtable on warehouse table and stock management I decide to create a block in order to help the users.
The block was designed for a small business, a store or a warehouse. All of the following users have access to the block and to the database with specific rights. The users are for example:
- the store manager to check the stocks, update the inventory, add the items received and given to the supplier and customer
- the buyer to follow the state of stocks and anticipate an order of material
- the commercial to know the products he can use in his project for his client and his region. He can also configure the tool to know the cost of the product and the margins
- the financier, to monitor the state of stocks and know the value of its assets.
- the manager of the company or project manager, who can configure the application in order to personalize the block according to his teams: give rights to users, follow all movements, coordinate between different users if necessary.


## Dev

The Stock Block was created with the template offered by Airtable : blocks-todo-list : (https://github.com/Airtable/blocks-todo-list) .

## See the block running

![Block that shows information about the selected table and its fields](media/Block creation/PresentationBlock.gif)
