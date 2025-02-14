using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Secondmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "LastLoginDate",
                table: "Users",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                });

            migrationBuilder.CreateTable(
                name: "CourseCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    EnglishText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NorwegianText = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseCards_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "CourseId", "Description", "Title" },
                values: new object[,]
                {
                    { 1, "Basic greetings", "Greetings" },
                    { 2, "Counting from 1 to 10", "Numbers" },
                    { 3, "Daily conversations", "Common Phrases" },
                    { 4, "Ordering in a café", "Food & Drinks" },
                    { 5, "Asking for directions", "Directions" },
                    { 6, "Buying things and transactions", "Shopping" },
                    { 7, "Telling time and discussing dates", "Time & Dates" },
                    { 8, "Useful phrases for traveling", "Travel" },
                    { 9, "Professional conversations", "Work & Business" },
                    { 10, "Asking for help and emergencieCourCourseId", "Emergency Situations" }
                });

            migrationBuilder.InsertData(
                table: "CourseCards",
                columns: new[] { "Id", "CourseId", "EnglishText", "NorwegianText" },
                values: new object[,]
                {
                    { 1, 1, "Hello", "Hallo" },
                    { 2, 1, "Hi", "Hei" },
                    { 3, 1, "Good morning", "God morgen" },
                    { 4, 1, "Good afternoon", "God ettermiddag" },
                    { 5, 1, "Good evening", "God kveld" },
                    { 6, 1, "Good night", "God natt" },
                    { 7, 1, "How are you?", "Hvordan har du det?" },
                    { 8, 1, "I’m fine, thank you", "Jeg har det bra, takk" },
                    { 9, 1, "What’s your name?", "Hva heter du?" },
                    { 10, 1, "My name is...", "Jeg heter..." },
                    { 11, 2, "One", "En" },
                    { 12, 2, "Two", "To" },
                    { 13, 2, "Three", "Tre" },
                    { 14, 2, "Four", "Fire" },
                    { 15, 2, "Five", "Fem" },
                    { 16, 2, "Six", "Seks" },
                    { 17, 2, "Seven", "Sju" },
                    { 18, 2, "Eight", "Åtte" },
                    { 19, 2, "Nine", "Ni" },
                    { 20, 2, "Ten", "Ti" },
                    { 21, 3, "Hello", "Hei" },
                    { 22, 3, "Good morning", "God morgen" },
                    { 23, 3, "Good night", "God natt" },
                    { 24, 3, "How are you?", "Hvordan har du det?" },
                    { 25, 3, "I'm fine, thank you", "Jeg har det bra, takk" },
                    { 26, 3, "What is your name?", "Hva heter du?" },
                    { 27, 3, "My name is...", "Jeg heter..." },
                    { 28, 3, "Nice to meet you", "Hyggelig å møte deg" },
                    { 29, 3, "See you later", "Sees senere" },
                    { 30, 3, "Goodbye", "Ha det" },
                    { 31, 4, "I would like a coffee, please", "Jeg vil gjerne ha en kaffe, takk" },
                    { 32, 4, "Do you have a menu?", "Har dere en meny?" },
                    { 33, 4, "I am allergic to...", "Jeg er allergisk mot..." },
                    { 34, 4, "Can I have the bill, please?", "Kan jeg få regningen, takk?" },
                    { 35, 4, "What do you recommend?", "Hva anbefaler du?" },
                    { 36, 4, "I’ll have the same", "Jeg tar det samme" },
                    { 37, 4, "A table for two, please", "Et bord for to, takk" },
                    { 38, 4, "I am hungry", "Jeg er sulten" },
                    { 39, 4, "I am thirsty", "Jeg er tørst" },
                    { 40, 4, "The food is delicious", "Maten er deilig" },
                    { 41, 5, "Where is the nearest bus stop?", "Hvor er nærmeste busstopp?" },
                    { 42, 5, "How do I get to the train station?", "Hvordan kommer jeg til togstasjonen?" },
                    { 43, 5, "Is it far from here?", "Er det langt herfra?" },
                    { 44, 5, "Go straight ahead", "Gå rett frem" },
                    { 45, 5, "Turn left", "Ta til venstre" },
                    { 46, 5, "Turn right", "Ta til høyre" },
                    { 47, 5, "At the traffic lights, turn left", "Ved trafikklysene, ta til venstre" },
                    { 48, 5, "It’s next to the supermarket", "Det er ved siden av supermarkedet" },
                    { 49, 5, "It’s across the street", "Det er på den andre siden av gaten" },
                    { 50, 5, "Can you show me on the map?", "Kan du vise meg på kartet?" },
                    { 51, 6, "How much does this cost?", "Hvor mye koster dette?" },
                    { 52, 6, "Do you accept credit cards?", "Tar dere kredittkort?" },
                    { 53, 6, "I am just looking, thanks", "Jeg bare ser, takk" },
                    { 54, 6, "Can I try this on?", "Kan jeg prøve denne?" },
                    { 55, 6, "Do you have this in another size?", "Har dere denne i en annen størrelse?" },
                    { 56, 6, "Where is the changing room?", "Hvor er prøverommet?" },
                    { 57, 6, "I would like to buy this", "Jeg vil gjerne kjøpe denne" },
                    { 58, 6, "Can I get a receipt?", "Kan jeg få en kvittering?" },
                    { 59, 6, "Can I return this if it doesn’t fit?", "Kan jeg returnere denne hvis den ikke passer?" },
                    { 60, 6, "Do you have any discounts?", "Har dere noen rabatter?" },
                    { 61, 7, "What time is it?", "Hva er klokka?" },
                    { 62, 7, "It’s 3 o’clock", "Klokka er tre" },
                    { 63, 7, "It’s half past seven", "Klokka er halv åtte" },
                    { 64, 7, "It’s quarter to five", "Klokka er kvart på fem" },
                    { 65, 7, "It’s ten past nine", "Klokka er ti over ni" },
                    { 66, 7, "Today is Monday", "I dag er det mandag" },
                    { 67, 7, "My birthday is in July", "Bursdagen min er i juli" },
                    { 68, 7, "What day is it today?", "Hvilken dag er det i dag?" },
                    { 69, 7, "The meeting is on Friday", "Møtet er på fredag" },
                    { 70, 7, "I will arrive at 2 PM", "Jeg kommer klokka 14" },
                    { 71, 8, "Where is the airport?", "Hvor er flyplassen?" },
                    { 72, 8, "I need a taxi", "Jeg trenger en taxi" },
                    { 73, 8, "How much is a ticket to Oslo?", "Hvor mye koster en billett til Oslo?" },
                    { 74, 8, "I have a reservation", "Jeg har en reservasjon" },
                    { 75, 8, "Can I see your passport?", "Kan jeg se passet ditt?" },
                    { 76, 8, "What time is the flight?", "Når går flyet?" },
                    { 77, 8, "I need a hotel room", "Jeg trenger et hotellrom" },
                    { 78, 8, "Where is the train station?", "Hvor er togstasjonen?" },
                    { 79, 8, "Can you help me?", "Kan du hjelpe meg?" },
                    { 80, 8, "I am lost", "Jeg har gått meg bort" },
                    { 81, 9, "What do you do for a living?", "Hva jobber du med?" },
                    { 82, 9, "I work as a developer", "Jeg jobber som utvikler" },
                    { 83, 9, "I have a meeting at 10 AM", "Jeg har et møte klokka 10" },
                    { 84, 9, "Can we schedule a call?", "Kan vi avtale en samtale?" },
                    { 85, 9, "Please send me an email", "Vennligst send meg en e-post" },
                    { 86, 9, "Let's discuss this project", "La oss diskutere dette prosjektet" },
                    { 87, 9, "I need to submit a report", "Jeg må levere en rapport" },
                    { 88, 9, "When is the deadline?", "Når er fristen?" },
                    { 89, 9, "I work remotely", "Jeg jobber eksternt" },
                    { 90, 9, "Let's have a coffee break", "La oss ta en kaffepause" },
                    { 91, 10, "Help!", "Hjelp!" },
                    { 92, 10, "Call an ambulance!", "Ring etter en ambulanse!" },
                    { 93, 10, "I need a doctor", "Jeg trenger en lege" },
                    { 94, 10, "There has been an accident", "Det har vært en ulykke" },
                    { 95, 10, "Call the police!", "Ring politiet!" },
                    { 96, 10, "I lost my passport", "Jeg har mistet passet mitt" },
                    { 97, 10, "Where is the nearest hospital?", "Hvor er nærmeste sykehus?" },
                    { 98, 10, "I am feeling sick", "Jeg føler meg dårlig" },
                    { 99, 10, "Can you help me?", "Kan du hjelpe meg?" },
                    { 100, 10, "I need to contact my embassy", "Jeg må kontakte ambassaden min" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseCards_CourseId",
                table: "CourseCards",
                column: "CourseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseCards");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastLoginDate",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }
    }
}
