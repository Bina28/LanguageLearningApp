# Project Setup Instructions

## 1. Change the Default Connection String:
- Open the appsettings.json file in the API project.
- Find the DefaultConnection setting.
- Replace the default connection string with your own database connection string.

Example:
"ConnectionStrings": {
  "DefaultConnection": "Your_Connection_String_Here"
}

## 2. Change HTTP URL in Program.cs:
- Open Program.cs in the API project.
- Replace the default http://localhost:3001 (or any other address) with the correct URL that your API will be running on.

Example in Program.cs:
var builder = WebApplication.CreateBuilder(args);

// Set the URL for your API
builder.WebHost.UseUrls("http://yourapiurl:port");

var app = builder.Build();

## 3. Change the API URL in Login.jsx:
- Open Login.jsx in the React project.
- Update the URL in the axios.post call to match the correct endpoint for your API.

Example:
const response = await axios.post("http://yourapiurl:port/api/auth/login", {
  email,
  password,
});

## 4. Change the API URL in SignUp.jsx:
- Open SignUp.jsx in the React project.
- Update the URL in the axios.post call to match the correct endpoint for your API.

Example:
const response = await axios.post("http://yourapiurl:port/api/auth/signup", {
  email,
  password,
  fullName,
});

## 5. Change the API URL in UserPage.jsx:
- Open UserPage.jsx in the React project.
- Update the URL in the axios.get call to match the correct endpoint for fetching the user profile.

Example:
const response = await axios.get("http://yourapiurl:port/api/auth/profile/" + storedUser.userId);


System Design

![image](https://github.com/user-attachments/assets/cf262fb6-f3fd-4fcd-b2ad-09815b9a8dec)

