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
        }
    },
    methods: {
        startGame: function(){
            
        },
        attackEvent: function(){
            
        },
        attack: function(player = "player", attackType = ""){
            // Initialize hit
            hit = 0;

            // Determine hit point according to attack type
            if(attackType == "" || attackType == "regular"){
                hit = Math.floor(Math.random() * 10);
            }
            else if(attackType == "specialAttack"){
                hit = Math.floor(Math.random() * 20);
            }

            // Subtract the hit point to the monster's health
            this.monster.health -= hit;
            // Add to Attacker's action
            this.addAction(player, player.toUpperCase() + " HITS MONSTER FOR " + hit);
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