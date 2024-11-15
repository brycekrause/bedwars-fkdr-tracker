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
    user = 'luvonox';
    let mojangurl = `https://api.mojang.com/users/profiles/minecraft/${user}`;
    const mojangResponse = await fetch(mojangurl);
    if (!mojangResponse.ok){
        throw new Error("Failed to fetch from Mojang API");
    }
    const mojangData = await mojangResponse.json();

    let ign = mojangData.name;
    let uuid = mojangData.id;

    let hypixelurl = `https://api.hypixel.net/player?key=${api_key}&uuid=${uuid}`;
    const hypixelResponse = await fetch(hypixelurl);
    if (!hypixelResponse.ok){
        throw new Error("Failed to fetch from Hypixel API");
    }
    const hypixelData = await hypixelResponse.json();

    console.log(hypixelData);
}

getStats();