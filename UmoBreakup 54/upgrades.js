class Upgrade{
	constructor(name,description,price,type,tier){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price;
		this.type = type;//"armor","shield","shieldregen","radar","thruster"
		}
	}
allupgrades = [];
allupgrades.push(new Upgrade("Repair","Repairs any damage to your ship.",20,"repair",0));
allupgrades.push(new Upgrade("Armor","Improves your ship's armor.",1000,"armor",0));
allupgrades.push(new Upgrade("Shield","Improves your ship's shield.",2000,"shield",0));
allupgrades.push(new Upgrade("Shield Regen","Improves your ship's shield regeneration rate.",3000,"shieldregen",0));
allupgrades.push(new Upgrade("Radar","Improves your ship's radar range.",3000,"radar",0));
allupgrades.push(new Upgrade("Cargo","Improves your ship's cargo capacity",3000,"cargo",0));