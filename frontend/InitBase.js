import React, { Component } from "react";
 

 
class InitBase extends Component {
  render() {
    return (
      <div>
        <h1> Integration of My Block Stock</h1>
        <h2>I/ Importation of the Block from GitHub </h2>
        <p> </p>
        <p>We will how first how to integrate the module Block Stock from GitHub</p>
        <ul>
         <li> Connect to Airtable, and create a new base clicking "Add a base"</li>
         <li> It is possible to create from scratch or to start with a template. To facilitate the exercice we will assume we start with a template. We will look for the template "Lemonade Stand Inventory". WWe just write Inventory and we can find it.</li>
         <li> Once you have chose your template you can personalize it.</li> 
         <li> Then open you new base. We can already start to use the block. To do so, you need to go at your right and click on "Blocks" </li> 
         <li> Install a Block</li>
         <li> Build a custom block</li> 
         <li> Name your Block</li> 
         <li> Choose the option "Remix from GitHub"</li> 
         <li> Add the GitHub repository : https://github.com/Vikento/MyShopBlock</li> 
         <li> And validate clicking on Create Block</li> 
         <li> You need to follow the instruction :</li> 
           <ul>
         <li> Open a terminal (cmd)</li> 
         <li> Install CLI taping "npm install -g @airtable/blocks-cli"</li> 
         <li> Set up the block on your computer : the commande start by "block init ...."</li> 
         <li> Navigate to your block directory: cd+name_of_your_block</li> 
         <li> Run the block : block Run . </li> 
         <li> When the block is running, you can put the URL shared by your terminal on the airtable windows</li> 
         <li> your block is installed !
           </li> 
           </ul></ul>

        <p> </p>  <p> </p>  <p> </p>
        <h2>II/ Creation of the Table for the best use </h2>
        <p>In this part it is the recommandation that you can follow </p>  <p> </p>  <p> </p>
        <h3>1. List of tables and fields to create</h3>
    
         <p> </p>  <p> </p>  <p> </p>
        <h3>2. Rules to respect</h3>
        
        <p> </p>  <p> </p>  <p> </p>
        <h3>3. Personalyzed the Block</h3>
        <p> </p>  <p> </p>  <p> </p>

        <p> </p>  <p> </p>  <p> </p>
        <h3>3. For further </h3>

        In order to personnalize the block, it is possible to change the line of the code. This part will describe quickly what can be modify easily without damaging th code.

        <p> </p>  
        Color background
        <p> </p>  <p> </p>

      </div>
    );
  }
}
 
export default InitBase;