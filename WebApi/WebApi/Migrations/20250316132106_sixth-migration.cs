using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class sixthmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "CourseId", "Description", "Title" },
                values: new object[,]
                {
                    { 11, "Talking about the weather", "Weather" },
                    { 12, "Discussing hobbies and free time", "Hobbies & Interests" },
                    { 13, "Going to the doctor and describing symptoms", "Health & Medical" },
                    { 14, "Checking in, booking, and hotel services", "At the Hotel" },
                    { 15, "Using buses, trains, and taxis", "Public Transport" },
                    { 16, "Common phrases at the airport", "At the Airport" },
                    { 17, "Scheduling and confirming meetings", "Making Appointments" },
                    { 18, "Movies, music, and leisure activities", "Entertainment" },
                    { 19, "Talking about gadgets and tech", "Technology & Devices" },
                    { 20, "Discussing sports and fitness", "Sports" },
                    { 21, "Describing homes and furniture", "House & Home" },
                    { 22, "Talking about family members", "Family & Relationships" },
                    { 23, "Wishing and talking about traditions", "Celebrations & Holidays" },
                    { 24, "Learning common idioms", "Idioms & Expressions" },
                    { 25, "Deep discussions on various topics", "Advanced Conversations" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 25);
        }
    }
}
