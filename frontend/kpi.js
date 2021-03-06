import {
    Box,
    Heading,
    useBase,
} from '@airtable/blocks/ui';

import React from 'react';
import ErrorBoundary from "./ErrorBoundary";

import Create_KPI_VLOOKUP from "./Create_KPI_VLOOKUP";
import List_of_log_fonction from "./List_of_log_fonction";
import List_of_VlookUp_indicateur from "./List_of_VlookUp_indicateur";
import List_of_personalize_indicateur from "./List_of_personalize_indicateur";

// importation of the all my const
// to change some table name, field, dimension, it is possible to change the 
// the file myConstClass
import * as myConstClass from "./myConstClass.js";

function kpi() {
	
    const base = useBase();

	const table = base.getTableByNameIfExists(myConstClass.INVENTORY_WAREHOUSE);

    if (table) {
        return <TableSchema base={base} />;
    } else {

        return ( 
			<div>
				<h2> My KPI : </h2>
				<p> </p>
				Error : No base with the name "{myConstClass.INVENTORY_WAREHOUSE}". For the full functionnality you have to create a Table with the name of "Inventory List" as following :
				<p> </p>
				<img src="https://i.postimg.cc/52P43k6F/Change-Name-Table.gif" width="100%" />
				When you create the "Inventory List", you can reload or refresh the page.
				<p> </p>
				If it is still not working, please contact the dev team. Thank you !
		</div>
		);
    }
}



function TableSchema({base}) {
 
    return (
		<ErrorBoundary>
            <Box>
                <Box padding={3} borderBottom="thick" className="H1">
                    <h1><Heading size="small" margin={0}>
						<box className="tittle">
							My Dash Board
						</box > 
                    </Heading></h1>
                </Box>
				<Box>
					
                </Box>
				<Box margin={3}>
                    {
						<div>
							<table>
								<tr> 
									<td> </td>
									<td>
										<Create_KPI_VLOOKUP base={base} />
									</td> 
							</tr>
						</table>
						
							<table>
								<td>
									<List_of_log_fonction />				
									
									<List_of_personalize_indicateur />

									<List_of_VlookUp_indicateur />
								</td>
							</table>
						</div>		
                    }              
                </Box>
            </Box>
		</ErrorBoundary>
    );
}
 
export default kpi;