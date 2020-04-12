new Vue({
    el: "#app",
    data: {
        gameEnd: false,
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

            this.gameEnd = false;
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
        attackEvent: function(attackType = 0){
            this.attack("monster", attackType);
            if(this.gameEnd)
                return;
            
            this.attack("player", (Math.random() * 2));

            if(!this.shown.actionLists){
                this.displayActions();
            }
        },
        healEvent: function(){
            this.heal("player");
            this.attack("player", (Math.random() * 2));
        },
        displayActions: function(){
            this.updateShown({actionLists: true});
        },
        attack: function(target = "monster", attackType = 0){
            // Initialize hit
            hit = 0;
            attacker = "player";
            attackName = ".";

            // Determine hit point according to attack type
            switch (attackType){
                case 1:
                    hit = Math.floor(Math.random() * 20);
                    attackName = " USING SPECIAL ATTACK.";
                    break;
                default:
                    hit = Math.floor(Math.random() * 10);
            }

            if(target == "monster"){
                this.monster.health -= hit;
            }
            else{
                this.player.health -= hit;
                attacker = "monster";
            }
            
            // Add to Attacker's action
            this.addAction(attacker, attacker.toUpperCase() + " HITS "+target.toUpperCase()+" FOR " + hit + attackName);
            this.checkScore();
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
        checkScore: function(){
            message = "";

            if(this.monster.health <= 0){
                this.gameEnd = true;
                message += "THE PLAYER WINS! DO YOU WANT TO PLAY AGAIN?";
            }
            else if(this.player.health <= 0){
                this.gameEnd = true;
                message += "THE PLAYER LOSE! DO YOU WANT TO PLAY AGAIN?";
            }

            if(this.gameEnd){
                boolContinue = confirm(message);

                if(boolContinue)
                    this.startEvent();
                else
                    this.updateShown({startMenu: true, actionsMenu: false});
            }

        },
        endGame: function(){
            this.updateShown();
        }
    }
});