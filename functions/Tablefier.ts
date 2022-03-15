import { table, getBorderCharacters } from 'table'

// TODO: #11 Convert to Module and use local Module imports

const CONFIG = {
	drawHorizontalLine: (lineIndex: number, rowCount: number) => {
		return lineIndex === 1
		// Only draw below heading row
	},
	drawVerticalLine: (lineIndex: number, columnCount: number) => {
		return lineIndex != 0 && lineIndex != columnCount
		// only draw on join elements
	},
	border: getBorderCharacters('norc'),	// set for single dash
	columns: [
		{ paddingLeft: 0, paddingRight: 1 },
		{ paddingLeft: 1, paddingRight: 2, wrapWord: true, width: 15 },
		{ paddingLeft: 1, paddingRight: 2, wrapWord: true, width: 6 }
	]	
}

// export default function toTable(headers: string[][], rows: string[][]): string {
export default function toTable( data: string[][] ): string {
	//const data = headers.concat(rows)
	return table(data, CONFIG);
}

// const sample = [
//  	['ID','Target','Reward'],
//  	['01230', 'Donald Duck', '1M Gala'],
//  	['4567',  'Minnie Mouse', '1M Gala'],
//  	['BCDE',  'Donald Duck', '5M Gala'],
//  	['FGHI', '[Atls] Calus Daiga', '10M Gala'],
// 	['FGHI', '[Atls] Calus Daiga', '10M Gala'],
// ]
// console.log(toTable(sample))
