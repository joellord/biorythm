#!env /bin/node
const args = process.argv.splice(2);
let today = args[1] ? new Date(args[1]) : new Date();
let birthdate = new Date(args[0]);
const height = 10;

const getBiorythm = (birthdate, target, unit = 5) => {
    const diff = target.getTime() - birthdate.getTime();
    const days = diff/(1000*60*60*24);
    const physical = Math.round(Math.sin(2 * Math.PI * days / 23)*unit);
    const emotional = Math.round(Math.sin(2 * Math.PI * days / 28)*unit);
    const intellectual = Math.round(Math.sin(2 * Math.PI * days / 33)*unit);
    return {
        physical,
        emotional,
        intellectual
    }
};

let graph = [];
for (let i = 0 ; i < 60; i++) {
    let target = new Date(today.getTime());
    target.setDate(target.getDate() + i - 20);
    let bioValues = getBiorythm(birthdate, target, height / 2);
    bioValues.intellectual *= -1;
    bioValues.physical *= -1;
    bioValues.emotional *= -1;
    let bioCol = [];
    for (let j = -1 * ((height / 2) + 1); j <= (height / 2) + 1; j++) {
        let val = (target.getTime() == today.getTime()) ? "|" : " ";
        let char = (target.getTime() == today.getTime()) ? "|" : "O";
        if (bioValues.physical == j) val = `\u001b[31m${char}\u001b[0m`;
        if (bioValues.emotional == j) val = `\u001b[34m${char}\u001b[0m`;
        if (bioValues.intellectual == j) val = `\u001b[33m${char}\u001b[0m`;
        if (bioValues.physical == j && bioValues.emotional == j) val = `\u001b[35m${char}\u001b[0m`;
        if (bioValues.physical == j && bioValues.intellectual == j) val = `\u001b[36m${char}\u001b[0m`;
        if (bioValues.emotional == j && bioValues.intellectual == j) val = `\u001b[32m${char}\u001b[0m`;
        if (bioValues.physical === j && bioValues.emotional == j && bioValues.intellectual == j) val = `\u001b[97m\u001b[1m${char}\u001b[0m`;
        bioCol.push(val);
    }
    process.stdout.write(`Values for ${target.toLocaleDateString()} -- \u001b[31mPhysical: ${bioValues.physical}\u001b[0m, \u001b[34mEmotional: ${bioValues.emotional}\u001b[0m, \u001b[33mIntellectual: ${bioValues.intellectual}\u001b[0m`)

    graph.push(bioCol);
}


process.stdout.write(`\u001b[2J`);
process.stdout.write(`\u001b[1;1H`);
process.stdout.write(`\u001b[36mBiorythm\u001b[0m\n`);
process.stdout.write(`--------\n`);
process.stdout.write(`by Joel Lord <joelphy@gmail.com> https://github.com/joellord/biorythm\n`);
process.stdout.write(`---------------------------------------------------------------------\n`);
process.stdout.write(`Data for DOB: ${birthdate.toLocaleDateString()}, target date: ${today.toLocaleDateString()}\n\n`);

const headerRows = 6;

graph.map((col, colIndex) => {
    col.map((row, rowIndex) => {
        process.stdout.write(`\u001b[${rowIndex+1+headerRows};${colIndex+1}H${row}`); 
    });
});

process.stdout.write("\n\n");
let todayVals = getBiorythm(birthdate, today, 5);
process.stdout.write(`Values for ${today.toLocaleDateString()} -- \u001b[31mPhysical: ${todayVals.physical}\u001b[0m, \u001b[34mEmotional: ${todayVals.emotional}\u001b[0m, \u001b[33mIntellectual: ${todayVals.intellectual}\u001b[0m\n`)

