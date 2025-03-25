function getCookedMessage(name: any, cookedLevel: any) {
    // Clamp cookedLevel to 0-100 and get decile (0-9)
    const decile = Math.floor(Math.min(Math.max(cookedLevel, 0), 100) / 10);

    const messages = [
        // 0-10% (Chill Zone)
        [`You’ve got heaps of time, ${name}, don’t even bother starting!`],
        
        // 10-20% (Barely Moving)
        [`Wouldn’t hurt to start your assignment now, ${name}`, 
         `${name}, you should probably start your assignments!`],
        
        // 20-30% (Low Panic)
        [`Good luck ${name}`],
        
        // 30-40% (Mild Stress)
        [`Please start your assignments, ${name}`, 
         `You should probably start your assignments, ${name}`],
        
        // 40-50% (Halfway Mess)
        [`Wouldn’t hurt to start your assignment now, ${name}`],
        
        // 50-60% (Sweat Time)
        [`${name}, it’s very unlikely you’ll finish on toime!`],
        
        // 60-70% (Danger Lurks)
        [`Its not looking good`, 
         `Please start your assignments, ${name}`],
        
        // 70-80% (Panic City)
        [`Good luck ${name}, you’re gonna need to hurry up!`, 
         `${name}, it’s very unlikely you’ll finish on time—might`],
        
        // 80-90% (Critical)
        [`Your cooked 💀💀💀, ${name}`, 
         `It’s joever, ${name}`],
        
        // 90-100% (Game Over)
        [`${name}, it’s very unlikely you’ll finish on time`, 
         `Your cooked 💀💀💀, ${name}`]
    ];

    // Randomly pick one of the two messages
    const messagesForDecile = messages[decile];
    const randomIndex = Math.floor(Math.random() * messagesForDecile.length);
    return messagesForDecile[randomIndex];
}

export default getCookedMessage