new Vue({
    el: "#app",
    data: {
        player: {
            health: 100,
            actions: []
        },
        monster: {
            health: 100,
            actions: []
        },
        shown: {
            startMenu: true,
            actionsMenu: false,
            actionLists: false
        }
    },
    methods: {
        startEvent: function(){
            // Reset the players
            this.player.health = 100;
            this.player.actions = [];
            this.monster.health = 100;
            this.monster.actions = [];

            this.updateShown({
                startMenu: false,
                actionsMenu: true,
                actionLists: false
            });
        },
        updateShown: function(shownValue = "default"){
            if(shownValue == "default"){
                shownValue = {
                    startMenu: true,
                    actionsMenu: false,
                    actionLists: false
                };
            }

            if(shownValue.hasOwnProperty("startMenu"))
                this.shown.startMenu = shownValue.startMenu;
            
            if(shownValue.hasOwnProperty("actionsMenu"))
                this.shown.actionsMenu = shownValue.actionsMenu;
            
            if(shownValue.hasOwnProperty("actionLists"))
                this.shown.actionLists = shownValue.actionLists;
        },
        attackEvent: function(){
            this.attack("player");
            this.attack("monster");

            if(!this.shown.actionLists){
                this.displayActions();
            }
        },
        displayActions: function(){
            this.updateShown({actionLists: true});
        },
        attack: function(target = "monster", attackType = ""){
            // Initialize hit
            hit = 0;
            attacker = "player"

            // Determine hit point according to attack type
            if(attackType == "" || attackType == "regular"){
                hit = Math.floor(Math.random() * 10);
            }
            else if(attackType == "specialAttack"){
                hit = Math.floor(Math.random() * 20);
            }

            if(target == "monster"){
                this.monster.health -= hit;
            }
            else{
                this.player.health -= hit;
                attacker = "monster";
            }
            
            // Add to Attacker's action
            this.addAction(attacker, attacker.toUpperCase() + " HITS "+target.toUpperCase()+" FOR " + hit);
        },
        addAction: function(player = "player", action){
            if(player == "player"){
                this.player.actions.push(action);
            }
            else{
                this.monster.actions.push(action);
            }
        },
        heal: function(player = "player"){
            healPoints = Math.floor(Math.random() * 10);

            if(player == "player"){
                this.player.health += healPoints;
            }
            else{
                this.monster.health += healPoints;
            }

            this.addAction(player, player.toUpperCase() + " HEALS FOR " + healPoints);
        },
        endGame: function(){

        }
    }
});