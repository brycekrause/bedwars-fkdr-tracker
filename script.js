/* get final kills
# get final deaths
# fkdr = fkills/fdeaths
# round fkdr down and add 1 to get the next int

# 300 requests / 5 minutes
# expires in 24 hours*/
let api_key = '6c8d67e6-45b4-4665-bcbc-35dc0ff54d3e';
//let mojangurl = `https://api.mojang.com/users/profiles/minecraft/${user}`;
//let hypixelurl = `https://api.hypixel.net/player?key=${api_key}&uuid=`;

async function getStats(){
    let user = document.getElementById("player_name").value;
    let mojangurl = `https://api.ashcon.app/mojang/v2/user/${user}`;
    try{
        const mojangResponse = await fetch(mojangurl);

        if (!mojangResponse.ok){
            throw new Error("Failed to fetch from Mojang API");
        }
        const mojangData = await mojangResponse.json();
        let uuid = mojangData.uuid;

        let hypixelurl = `https://api.hypixel.net/player?key=${api_key}&uuid=${uuid}`;
        const hypixelResponse = await fetch(hypixelurl);
        if (!hypixelResponse.ok){
            throw new Error("Failed to fetch from Hypixel API");
        }
        const hypixelData = await hypixelResponse.json();

        let ign = hypixelData.player.displayname;
        let star = hypixelData.player.achievements.bedwars_level;
        let fkills = hypixelData.player.stats.Bedwars.final_kills_bedwars;
        let fdeaths = hypixelData.player.stats.Bedwars.final_deaths_bedwars;
        let fkdr = (fkills/fdeaths).toFixed(2);
        let nextFKDR = Math.floor(fkdr) + 1;
        FinalsTo_nextFKDR = fdeaths * nextFKDR - fkills;
        document.writeln(`${star} ${ign} has ${fkdr} FKDR and needs ${FinalsTo_nextFKDR} to ${nextFKDR}`);
    }catch (error){
        document.writeln(error);
    }
}