class Upgrade{
	constructor(name,description,price,type,tier){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price;
		this.type = type;//"armor","shield","shieldregen","radar","thruster"
		}
	}
allupgrades = [];
allupgrades.push(new Upgrade("Repair","Repairs any damage to your ship.",20,"repair"));
allupgrades.push(new Upgrade("Armor","Improves your ship's armor.",1000,"armor"));
allupgrades.push(new Upgrade("Shield","Improves your ship's shield.",2000,"shield"));
allupgrades.push(new Upgrade("Shield Regen","Improves your ship's shield regeneration rate.",3000,"shieldregen"));
allupgrades.push(new Upgrade("Radar","Improves your ship's radar range.",3000,"shieldregen"));