	
/////////////////////////////Begin system class///////////////////////////////////////////////////////////////////////////////////////////////////////////////
class System{
	constructor(index, name, x, y){
		this.index = index; //integer identifying system 
		this.name = name; //name of system for display
		this.planets = []; //list of planets (to be generated)
		this.ships = []; //list of ships (to be generated)
		this.botbombs = []; //list of bombs used in system
		this.outposts = []; //list of outposts in system
		this.difficulty = 1; //Scales ship generation attributes
		this.x = x;
		this.y = y;
	}
	draw(viewx,viewy){ //no filter draws everything
		var i= this.ships.length;
		while  (i>0){
			i=i-1;
			this.ships[i].drawship(viewx,viewy);
			}
		var i= this.planets.length;
		while  (i>0){
			i=i-1;
			this.planets[i].drawplanet(viewx,viewy);
			}
		var i= this.botbombs.length;
		while  (i>0){
			i=i-1;
			this.botbombs[i].drawbomb(viewx,viewy);
			}
		}
	draw2(viewx,viewy){ //linear filtered instead of by distance, maybe computationally cheaper?
		var i= this.ships.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+ships[i].s;
			var xdif = this.ships[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+ships[i].s;
					var ydif = this.ships[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.ships[i].drawship(viewx,viewy);	
							}
						}		
					}
				}		
			}
		var i= this.planets.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+planets[i].s;
			var xdif = this.planets[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+planets[i].s;
					var ydif = this.planets[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.planets[i].drawplanet(viewx,viewy);	
							}
						}		
					}
				}		
			}	
		var i= this.botbombs.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+botbombs[i].s;
			var xdif = this.botbombs[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+botbombs[i].s;
					var ydif = this.botbombs[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.botbombs[i].drawbomb(viewx,viewy);	
							}
						}		
					}
				}		
			}
		var i= this.outposts.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+outposts[i].s;
			var xdif = this.outposts[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+outposts[i].s;
					var ydif = this.outposts[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.outposts[i].drawstation(viewx,viewy);	
							}
						}		
					}
				}		
			}				
		}
	updateall(){
		var i = this.ships.length; //update section////////////////////////////////////////////////////////////
		while (i>0){ //update ships
			i=i-1;
			this.ships[i].updateship(this.planets);
			}
		var i = this.planets.length; //update planets
		while (i>0){
			i=i-1;
			this.planets[i].update1();
			}
		var i = this.botbombs.length; //update bot bombs
		while (i>0){
			i=i-1;
			this.botbombs[i].update1();
			this.botbombs[i].updatebomb();
			}

		var i = this.outposts.length; //update bot bombs
		while (i>0){
			i=i-1;
			this.outposts[i].update1();
			this.outposts[i].d = this.outposts[i].directionof(planets[0]);
			}	
		}
	gravitateall(){
		var i = this.planets.length;
		while (i>0){ //Planet on ships and bombs
			i=i-1;
			var j = this.ships.length;
			while (j>0){ //gravitate on each ship
				j=j-1;
				this.planets[i].gravitate(this.ships[j]);
				}
			j = this.botbombs.length;
			while (j>0){ //gravitate on each bot bomb
				j=j-1;
				this.planets[i].gravitate(this.botbombs[j]);
				}				
			}
		var i = this.outposts.length;
		while (i>0){
			i=i-1;
			this.planets[0].gravitate(this.outposts[i]);	
			}
		var i = this.planets.length;
		while (i>1){//Planet on planet gravity
			i=i-1;
			this.planets[0].gravitate(this.planets[i]);//sun gravitates all
			if (this.planets[i].parentid>0){ this.planets[this.planets[i].parentid].gravitate(this.planets[i]); } //others only affected by parent
			}
		}
	gravitateothers(umolist){//For gravitating Umos external to the system (playerbombs at the start)
		var i = this.planets.length;
		while (i>0){
			i=i-1;
			var j = umolist.length;
			while (j>0){
				j=j-1;
				this.planets[i].gravitate(umolist[j]);
				}
			}	
		}
	dockcheck(dockstate){ //currently gets player stuck docked, not sure why
		var i=0;
		while (i<outposts.length){
			if (ships[0].distance(outposts[i])<160){
				outposts[i].dock(ships[0]);
				dockstate = i+1;//Maybe add this to system update function, but that implicitly passes dockstate which might not work in other languages.
				}		
			i=i+1;
			}
		}
	collideself(){ //Internal system collisions, ships to planets, ships to bot bombs, planets to bot bombs
		var i = this.planets.length;
		var j = this.ships.length;
		var k = this.botbombs.length;
		while (i>0){ //For all planets (and bombs and ships)
			i=i-1;
			j = this.ships.length;
			while (j>0){ //For all ships to each planet
				j=j-1;
				this.planets[i].circlecollide(this.ships[j]);
				}
			//k = playerbombs.length;
			//while (k>0){ //For all bombs to each planet
			//	k=k-1;
			//	planets[i].circlecollide(playerbombs[k]); 
			//	}
			k = this.botbombs.length;
			while (k>0){ //For all bombs to each planet
				k=k-1; 
				this.planets[i].circlecollide(this.botbombs[k]);
				}
			}
		
			k = this.botbombs.length;
			while (k>0){
				k=k-1;
				if (this.ships[j].hp>=0){//do not execute on dead ships.  Maybe check player distance too.
					this.botbombs[k].bombcollide(this.ships[j]);
					if (this.ships[j].hp<0){
						var getcash = Math.floor(Math.random()*21+10); //no payout if bot kills bot
						//money = money + getcash;//disabled bot kill payouts for now
						//gotmoney = [30,getcash];
						}//Doesn't handle death, just cash.
					}
				}	
			}	
	collideothers(externalplanets, externalships, externalbombs){//input are umo arrays
		var  i = externalplanets.length 		
	}
	randomplanets(){
		var numplanets = Math.floor(Math.random()*16+2);//random number of planets, 2-17
		var orbitradius = 0; //randomized in the loop
		var planetsize = 0; //randomized in the loop
		this.planets.push( new Umo(this.x,this.y,Math.floor(Math.random()*3000+1000), "orange") ); //make the sun 
		this.planets[0].name = this.name; // Star name is same as system name
		var i=0;
		while (i<numplanets-1){
			i=i+1; //planets[0] is already the sun, so we can skip index 0;
			orbitradius = Math.floor( (Math.random()*Math.random()*250000) + 2000); //Minimum radius 2000, 1/r density factor
			planetsize = Math.floor( Math.random()*Math.random()*800 + Math.random()*100+100 ); //Minimum size 100, 
			this.planets.push( new Umo(0,0,planetsize, randcolor() ) );//this is where the planet gets added to the array
			this.planets[i].name = randname(4);//random 4 character name
			this.planets[i].setorbit(this.planets[0], orbitradius, Math.random()*6.28, 1);
			this.planets[i].parentid = 0; //establishes star (planet[0] as parent planet
			//this.randommoons(i);
			}
		}
	randommoons(index){//index is of planet
		var nummoons = Math.floor(Math.random()*planets[index].s/150 )//Planets < 150 in size have 0 chance of a moon, planet 300 in size has 50% chance of 1 moon, etc.
		var moonsize = 0; //randomized in loop
		var moonorbitr = 0;//randomized in loop
		var moonindex = 0; //set in loop
		i = nummoons;
		while (i>0){
			i=i-1;
			moonsize = Math.floor(Math.random()*this.planets[index].s/3+10);//radius is 10 plus up to 1/3 of parent planet
			moonorbitr = Math.floor(this.planets[index].s*(Math.random()*3+1.5)); //orbit radius is 1.5x parent planet radius + up to 3x parent planet radius
			moonindex = this.planets.length-1;
			this.planets.push( new Umo(0,0,moonsize, randcolor()) );
			this.planets[moonindex].name = randname(4);
			this.planets[moonindex].parentid = index;
			this.planets[moonindex].setorbit(this.planets[index],moonorbitr,Math.random()*6.28, 1);//orbit direction is 1, not random
			}
		}
	levelup(botindex,levels){//adds "levels" to make bots tougher
		var i = levels;
		while(i>0){
			i=i-1;
			var bonus = Math.floor(Math.random()*5);//Picks a number to select which bonus the bot gets
			if (bonus==0){ //extra health
				this.ships[botindex].maxhp = this.ships[botindex].maxhp+100;
				this.ships[botindex].hp = this.ships[botindex].hp+100;
				}
			if (bonus==1){ //extra shield
				this.ships[botindex].maxshield = this.ships[botindex].maxshield+50;
				ships[botindex].shield = ships[botindex].shield+50;
				}
			if (bonus==2){ //extra shield regen
				ships[botindex].shieldregen = ships[botindex].shieldregen+0.25;
				}			
			if (bonus==3){ //extra bomb damage
				botbombs[botindex-1].hurt = botbombs[botindex-1].hurt+8;
				}						
			if (bonus==4){ //extra bomb blast
				botbombs[botindex-1].boombuff = botbombs[botindex-1].boombuff+0.25;//I think botbombs needs -1 because it does not include a bomb for ships[0] (player)
				}			
			ships[botindex].level = ships[botindex].level+1;
			}
		}
	addrandomgang(planetindex, num,level){ //Adds a gang of enemy ships, level describes difficulty (not used yet)
		var gangsize = num;
		var gangcolor = randcolor();
		var gangparent = planetindex;
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomplayerverts);
		var gangpolytheta = randomplayerverts[0];
		var gangpolyradius = randomplayerverts[1];
		
		var i = gangsize;
		while (i>0){
			i=i-1;
			this.ships.push(new Umo(-600,32000,32,gangcolor));
			var botindex = this.ships.length-1;
			this.ships[botindex].parentid = gangparent; 
			this.ships[botindex].respawn(this.planets[this.ships[botindex].parentid]);
			this.ships[botindex].name = randname(5);
			this.ships[botindex].hp = 150;
			this.ships[botindex].maxhp = 150;
			this.ships[botindex].polytheta = gangpolytheta;
			this.ships[botindex].polyradius = gangpolyradius;
			this.botbombs.push( new Umo(0,0,0,"red"));
			this.levelup(botindex,level);
			}
		}
	}//end of system class////////////////////////////////////////////////////////////////////////////////////////////////////////////////