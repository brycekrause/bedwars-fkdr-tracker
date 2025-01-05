// 300 requests / 5 minutes
// expires in 24 hours

document.getElementById("player_name").addEventListener('keydown', function(event){
    if (event.key === "Enter"){
        document.getElementById('go_button').click();
    }
})

button = document.getElementById("go_button");
button.addEventListener('click', function(){
    getStats();
    button.disabled = true;

    setTimeout(() => {
        button.disabled = false;
    }, 2000);
})

async function getStats(){
    let api_key = document.getElementById('key').value;
    // delete old instance of information if it exists
    old_data = document.getElementById("info");
    if (old_data){
        old_data.remove();
    }
    error_element = document.getElementById("error");
    if (error_element){
        error_element.remove();
    }
    

    let user = document.getElementById("player_name").value;
    let mojangurl = `https://api.ashcon.app/mojang/v2/user/${user}`;
    try{
        const mojangResponse = await fetch(mojangurl);

        if (!mojangResponse.ok){
            throw new Error("Invalid User");
        }
        const mojangData = await mojangResponse.json();
        let uuid = mojangData.uuid;

        let hypixelurl = `https://api.hypixel.net/player?key=${api_key}&uuid=${uuid}`;
        const hypixelResponse = await fetch(hypixelurl);
        if (!hypixelResponse.ok){
            throw new Error("Failed to fetch from Hypixel API");
        }
        const hypixelData = await hypixelResponse.json();

        let head = `https://skins.danielraybone.com/v1/render/head/${uuid}`;

        try{
            var ign = hypixelData.player.displayname;
            var star = hypixelData.player.achievements.bedwars_level;            
        }
        catch (error){
            var ign = user;
            var star = 0;
        }

        try{
            var overall_fkills = hypixelData.player.stats.Bedwars.final_kills_bedwars;
        }
        catch(TypeError){
            var overall_fkills = 0;
        }
        try{
            var overall_fdeaths = hypixelData.player.stats.Bedwars.final_deaths_bedwars;
        }
        catch(TypeError){
            var overall_fdeaths = 0;
        }
        try{
            var overall_fkdr = (overall_fkills/overall_fdeaths).toFixed(2);
        }
        catch(error){
            var overall_fkdr = overall_fkills;
        }
        try{
            var overall_wins = hypixelData.player.stats.Bedwars.wins
        }
        catch(error){
            var overall_wins = 0;
        }
        try{
            var overall_losses = hypixelData.player.stats.Bedwars.losses
        }
        catch(error){
            var overall_losses = 0;
        }
        try{
            var overall_wlr = overall_wins/overall_losses;
        }
        catch(error){
            overall_wlr = overall_wins;
        }
        let nextFKDR = Math.floor(overall_fkdr) + 1;
        FinalsTo_nextFKDR = overall_fdeaths * nextFKDR - overall_fkills;
/*
        try{
            var solo_fkills = hypixelData.player.stats.Bedwars.solo_final_kills_bedwars
        }
        catch(error){var solo_fkills = 0;}
        try{
            var solo_fdeaths = hypixelData.player.stats.Bedwars.solo_final_deaths_bedwars
        }
        catch(error){var solo_fdeaths = 0;}
        try{
            var solo_fkdr = (solo_fkills / solo_fdeaths).toFixed(2);
        }
        catch(error){var solo_fkdr = solo_fkills;}
        let solo_nextFKDR = Math.floor(solo_fkdr) + 1;
        soloFinalsTo_nextFKDR = solo_fdeaths * solo_nextFKDR - solo_fkills;
        */

        // put the data on the screen
        container = document.getElementById("container");

        info_div = document.createElement('div');
        info_div.className = 'info';
        info_div.id = 'info';   

        info_name = document.createElement('h1');
        info_name.innerHTML = `<span>[${star}★]</span> ${ign}`;
        info_fkdr = document.createElement('h1');
        info_fkdr.innerHTML = `<span>${overall_fkdr}</span> FKDR`;

        info_fkdrcalc = document.createElement('h2');
        info_fkdrcalc.innerHTML = `<span>${FinalsTo_nextFKDR}</span> finals to <span>${nextFKDR}</span> FKDR`;

        info_head = document.createElement('img');
        info_head.src = head;


        text_div = document.createElement('div');
        text_div.appendChild(info_name);
        text_div.appendChild(info_fkdr);
        text_div.appendChild(info_fkdrcalc);     

        info_div.appendChild(text_div);
        info_div.appendChild(info_head);
        container.append(info_div);
    }catch (error){
        container = document.getElementById("container");
        error_element = document.createElement('h1');
        error_element.id = 'error';
        error_element.textContent = `${error}`;
        error_element.style.color = 'red';
        container.appendChild(error_element)

    }
}

async function extend(){
    
}