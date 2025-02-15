using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions options) : base(options)
	{
	}

	public DbSet<User> Users { get; set; }
	public DbSet<Course> Courses { get; set; }
	public DbSet<CourseCard> CourseCards { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<CourseCard>()
		.HasOne(c => c.Course)
		.WithMany(c => c.Cards)
		.HasForeignKey(c => c.CourseId)
		.OnDelete(DeleteBehavior.Cascade);

		modelBuilder.Entity<Course>().HasData(new List<Course>
		{
			new Course { CourseId = 1, Title = "Greetings", Description = "Basic greetings" },
			new Course { CourseId = 2, Title = "Numbers", Description = "Counting from 1 to 10" },
			new Course { CourseId = 3, Title = "Common Phrases", Description = "Daily conversations" },
			new Course { CourseId = 4, Title = "Food & Drinks", Description = "Ordering in a café" },
			new Course { CourseId = 5, Title = "Directions", Description = "Asking for directions" },
		 new Course { CourseId = 6, Title = "Shopping", Description = "Buying things and transactions" },
			new Course { CourseId = 7, Title = "Time & Dates", Description = "Telling time and discussing dates" },
			new Course { CourseId = 8, Title = "Travel", Description = "Useful phrases for traveling" },
			new Course { CourseId = 9, Title = "Work & Business", Description = "Professional conversations" },
			new Course { CourseId = 10, Title = "Emergency Situations", Description = "Asking for help and emergency" }

		});

		modelBuilder.Entity<CourseCard>().HasData(new List<CourseCard>
		{
				// Unit 1 - Greetings
		new CourseCard { Id = 1, CourseId = 1, EnglishText = "Hello", NorwegianText = "Hallo" },
new CourseCard { Id = 2, CourseId = 1, EnglishText = "Hi", NorwegianText = "Hei" },
new CourseCard { Id = 3, CourseId = 1, EnglishText = "Good morning", NorwegianText = "God morgen" },
new CourseCard { Id = 4, CourseId = 1, EnglishText = "Good afternoon", NorwegianText = "God ettermiddag" },
new CourseCard { Id = 5, CourseId = 1, EnglishText = "Good evening", NorwegianText = "God kveld" },
new CourseCard { Id = 6, CourseId = 1, EnglishText = "Good night", NorwegianText = "God natt" },
new CourseCard { Id = 7, CourseId = 1, EnglishText = "How are you?", NorwegianText = "Hvordan har du det?" },
new CourseCard { Id = 8, CourseId= 1, EnglishText = "I’m fine, thank you", NorwegianText = "Jeg har det bra, takk" },
new CourseCard { Id = 9, CourseId = 1, EnglishText = "What’s your name?", NorwegianText = "Hva heter du?" },
new CourseCard { Id = 10, CourseId = 1, EnglishText = "My name is...", NorwegianText = "Jeg heter..." },
		
		// Unit 2 - Numbers
            new CourseCard { Id = 11, CourseId = 2, EnglishText = "One", NorwegianText = "En" },
			new CourseCard { Id = 12, CourseId = 2, EnglishText = "Two", NorwegianText = "To" },
			new CourseCard { Id = 13, CourseId = 2, EnglishText = "Three", NorwegianText = "Tre" },
			new CourseCard { Id = 14,  CourseId = 2, EnglishText = "Four", NorwegianText = "Fire" },
			new CourseCard { Id = 15, CourseId = 2, EnglishText = "Five", NorwegianText = "Fem" },
			new CourseCard { Id = 16, CourseId = 2, EnglishText = "Six", NorwegianText = "Seks" },
			new CourseCard { Id = 17, CourseId = 2, EnglishText = "Seven", NorwegianText = "Sju" },
			new CourseCard{ Id = 18, CourseId = 2, EnglishText = "Eight", NorwegianText = "Åtte" },
			new CourseCard { Id = 19, CourseId = 2, EnglishText = "Nine", NorwegianText = "Ni" },
			new CourseCard{ Id = 20, CourseId = 2, EnglishText = "Ten", NorwegianText = "Ti" },

			//Unit 3 - Common Phrases
		new CourseCard { Id = 21, CourseId = 3, EnglishText = "Hello", NorwegianText = "Hei" },
new CourseCard { Id = 22, CourseId = 3, EnglishText = "Good morning", NorwegianText = "God morgen" },
new CourseCard { Id = 23, CourseId = 3, EnglishText = "Good night", NorwegianText = "God natt" },
new CourseCard { Id = 24, CourseId = 3, EnglishText = "How are you?", NorwegianText = "Hvordan har du det?" },
new CourseCard { Id = 25, CourseId = 3, EnglishText = "I'm fine, thank you", NorwegianText = "Jeg har det bra, takk" },
new CourseCard { Id = 26, CourseId = 3, EnglishText = "What is your name?", NorwegianText = "Hva heter du?" },
new CourseCard { Id = 27, CourseId = 3, EnglishText = "My name is...", NorwegianText = "Jeg heter..." },
new CourseCard { Id = 28, CourseId = 3, EnglishText = "Nice to meet you", NorwegianText = "Hyggelig å møte deg" },
new CourseCard { Id = 29, CourseId = 3, EnglishText = "See you later", NorwegianText = "Sees senere" },
new CourseCard { Id = 30, CourseId = 3, EnglishText = "Goodbye", NorwegianText = "Ha det" },

//Unit 4 - Food & Drinks
new CourseCard { Id = 31, CourseId = 4, EnglishText = "I would like a coffee, please", NorwegianText = "Jeg vil gjerne ha en kaffe, takk" },
new CourseCard { Id = 32, CourseId = 4, EnglishText = "Do you have a menu?", NorwegianText = "Har dere en meny?" },
new CourseCard { Id = 33, CourseId = 4, EnglishText = "I am allergic to...", NorwegianText = "Jeg er allergisk mot..." },
new CourseCard { Id = 34, CourseId = 4, EnglishText = "Can I have the bill, please?", NorwegianText = "Kan jeg få regningen, takk?" },
new CourseCard { Id = 35, CourseId = 4, EnglishText = "What do you recommend?", NorwegianText = "Hva anbefaler du?" },
new CourseCard { Id = 36, CourseId = 4, EnglishText = "I’ll have the same", NorwegianText = "Jeg tar det samme" },
new CourseCard { Id = 37, CourseId = 4, EnglishText = "A table for two, please", NorwegianText = "Et bord for to, takk" },
new CourseCard { Id = 38, CourseId = 4, EnglishText = "I am hungry", NorwegianText = "Jeg er sulten" },
new CourseCard { Id = 39, CourseId = 4, EnglishText = "I am thirsty", NorwegianText = "Jeg er tørst" },
new CourseCard { Id = 40, CourseId = 4, EnglishText = "The food is delicious", NorwegianText = "Maten er deilig" },


//Unit 5 - Directions
new CourseCard { Id = 41, CourseId = 5, EnglishText = "Where is the nearest bus stop?", NorwegianText = "Hvor er nærmeste busstopp?" },
new CourseCard { Id = 42, CourseId = 5, EnglishText = "How do I get to the train station?", NorwegianText = "Hvordan kommer jeg til togstasjonen?" },
new CourseCard { Id = 43, CourseId = 5, EnglishText = "Is it far from here?", NorwegianText = "Er det langt herfra?" },
new CourseCard { Id = 44, CourseId = 5, EnglishText = "Go straight ahead", NorwegianText = "Gå rett frem" },
new CourseCard { Id = 45, CourseId = 5, EnglishText = "Turn left", NorwegianText = "Ta til venstre" },
new CourseCard { Id = 46, CourseId = 5, EnglishText = "Turn right", NorwegianText = "Ta til høyre" },
new CourseCard { Id = 47, CourseId = 5, EnglishText = "At the traffic lights, turn left", NorwegianText = "Ved trafikklysene, ta til venstre" },
new CourseCard { Id = 48, CourseId = 5, EnglishText = "It’s next to the supermarket", NorwegianText = "Det er ved siden av supermarkedet" },
new CourseCard { Id = 49, CourseId = 5, EnglishText = "It’s across the street", NorwegianText = "Det er på den andre siden av gaten" },
new CourseCard { Id = 50, CourseId = 5, EnglishText = "Can you show me on the map?", NorwegianText = "Kan du vise meg på kartet?" },

//Unit 6 - Shopping
new CourseCard { Id = 51, CourseId = 6, EnglishText = "How much does this cost?", NorwegianText = "Hvor mye koster dette?" },
new CourseCard { Id = 52, CourseId = 6, EnglishText = "Do you accept credit cards?", NorwegianText = "Tar dere kredittkort?" },
new CourseCard { Id = 53, CourseId = 6, EnglishText = "I am just looking, thanks", NorwegianText = "Jeg bare ser, takk" },
new CourseCard { Id = 54, CourseId = 6, EnglishText = "Can I try this on?", NorwegianText = "Kan jeg prøve denne?" },
new CourseCard { Id = 55, CourseId = 6, EnglishText = "Do you have this in another size?", NorwegianText = "Har dere denne i en annen størrelse?" },
new CourseCard { Id = 56, CourseId = 6, EnglishText = "Where is the changing room?", NorwegianText = "Hvor er prøverommet?" },
new CourseCard { Id = 57, CourseId = 6, EnglishText = "I would like to buy this", NorwegianText = "Jeg vil gjerne kjøpe denne" },
new CourseCard { Id = 58, CourseId = 6, EnglishText = "Can I get a receipt?", NorwegianText = "Kan jeg få en kvittering?" },
new CourseCard { Id = 59, CourseId = 6, EnglishText = "Can I return this if it doesn’t fit?", NorwegianText = "Kan jeg returnere denne hvis den ikke passer?" },
new CourseCard { Id = 60, CourseId = 6, EnglishText = "Do you have any discounts?", NorwegianText = "Har dere noen rabatter?" },

//Unit 7 - Time & Dates
new CourseCard { Id = 61, CourseId = 7, EnglishText = "What time is it?", NorwegianText = "Hva er klokka?" },
new CourseCard { Id = 62, CourseId = 7, EnglishText = "It’s 3 o’clock", NorwegianText = "Klokka er tre" },
new CourseCard { Id = 63, CourseId = 7, EnglishText = "It’s half past seven", NorwegianText = "Klokka er halv åtte" },
new CourseCard { Id = 64, CourseId = 7, EnglishText = "It’s quarter to five", NorwegianText = "Klokka er kvart på fem" },
new CourseCard { Id = 65, CourseId = 7, EnglishText = "It’s ten past nine", NorwegianText = "Klokka er ti over ni" },
new CourseCard { Id = 66, CourseId = 7, EnglishText = "Today is Monday", NorwegianText = "I dag er det mandag" },
new CourseCard { Id = 67, CourseId = 7, EnglishText = "My birthday is in July", NorwegianText = "Bursdagen min er i juli" },
new CourseCard { Id = 68, CourseId = 7, EnglishText = "What day is it today?", NorwegianText = "Hvilken dag er det i dag?" },
new CourseCard { Id = 69, CourseId = 7, EnglishText = "The meeting is on Friday", NorwegianText = "Møtet er på fredag" },
new CourseCard { Id = 70, CourseId = 7, EnglishText = "I will arrive at 2 PM", NorwegianText = "Jeg kommer klokka 14" },

//Unit 8 - Travel
new CourseCard { Id = 71, CourseId = 8, EnglishText = "Where is the airport?", NorwegianText = "Hvor er flyplassen?" },
new CourseCard { Id = 72, CourseId = 8, EnglishText = "I need a taxi", NorwegianText = "Jeg trenger en taxi" },
new CourseCard { Id = 73, CourseId = 8, EnglishText = "How much is a ticket to Oslo?", NorwegianText = "Hvor mye koster en billett til Oslo?" },
new CourseCard { Id = 74, CourseId = 8, EnglishText = "I have a reservation", NorwegianText = "Jeg har en reservasjon" },
new CourseCard { Id = 75, CourseId = 8, EnglishText = "Can I see your passport?", NorwegianText = "Kan jeg se passet ditt?" },
new CourseCard { Id = 76, CourseId = 8, EnglishText = "What time is the flight?", NorwegianText = "Når går flyet?" },
new CourseCard { Id = 77, CourseId = 8, EnglishText = "I need a hotel room", NorwegianText = "Jeg trenger et hotellrom" },
new CourseCard { Id = 78, CourseId = 8, EnglishText = "Where is the train station?", NorwegianText = "Hvor er togstasjonen?" },
new CourseCard { Id = 79, CourseId = 8, EnglishText = "Can you help me?", NorwegianText = "Kan du hjelpe meg?" },
new CourseCard { Id = 80, CourseId = 8, EnglishText = "I am lost", NorwegianText = "Jeg har gått meg bort" },

//Unit 9 - Work & Business
new CourseCard { Id = 81, CourseId = 9, EnglishText = "What do you do for a living?", NorwegianText = "Hva jobber du med?" },
new CourseCard { Id = 82, CourseId = 9, EnglishText = "I work as a developer", NorwegianText = "Jeg jobber som utvikler" },
new CourseCard { Id = 83, CourseId = 9, EnglishText = "I have a meeting at 10 AM", NorwegianText = "Jeg har et møte klokka 10" },
new CourseCard { Id = 84, CourseId = 9, EnglishText = "Can we schedule a call?", NorwegianText = "Kan vi avtale en samtale?" },
new CourseCard { Id = 85, CourseId = 9, EnglishText = "Please send me an email", NorwegianText = "Vennligst send meg en e-post" },
new CourseCard { Id = 86, CourseId = 9, EnglishText = "Let's discuss this project", NorwegianText = "La oss diskutere dette prosjektet" },
new CourseCard { Id = 87, CourseId = 9, EnglishText = "I need to submit a report", NorwegianText = "Jeg må levere en rapport" },
new CourseCard { Id = 88, CourseId = 9, EnglishText = "When is the deadline?", NorwegianText = "Når er fristen?" },
new CourseCard { Id = 89, CourseId = 9, EnglishText = "I work remotely", NorwegianText = "Jeg jobber eksternt" },
new CourseCard { Id = 90, CourseId = 9, EnglishText = "Let's have a coffee break", NorwegianText = "La oss ta en kaffepause" },

//Unit 10 - Emergency Situations
new CourseCard { Id = 91, CourseId = 10, EnglishText = "Help!", NorwegianText = "Hjelp!" },
new CourseCard { Id = 92, CourseId = 10, EnglishText = "Call an ambulance!", NorwegianText = "Ring etter en ambulanse!" },
new CourseCard { Id = 93, CourseId = 10, EnglishText = "I need a doctor", NorwegianText = "Jeg trenger en lege" },
new CourseCard { Id = 94, CourseId = 10, EnglishText = "There has been an accident", NorwegianText = "Det har vært en ulykke" },
new CourseCard { Id = 95, CourseId = 10, EnglishText = "Call the police!", NorwegianText = "Ring politiet!" },
new CourseCard { Id = 96, CourseId = 10, EnglishText = "I lost my passport", NorwegianText = "Jeg har mistet passet mitt" },
new CourseCard { Id = 97, CourseId = 10, EnglishText = "Where is the nearest hospital?", NorwegianText = "Hvor er nærmeste sykehus?" },
new CourseCard { Id = 98, CourseId = 10, EnglishText = "I am feeling sick", NorwegianText = "Jeg føler meg dårlig" },
new CourseCard { Id = 99, CourseId = 10, EnglishText = "Can you help me?", NorwegianText = "Kan du hjelpe meg?" },
new CourseCard { Id = 100, CourseId = 10, EnglishText = "I need to contact my embassy", NorwegianText = "Jeg må kontakte ambassaden min" }

		});
	}
}
