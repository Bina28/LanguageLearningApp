# 🌐 Language Learning App

**📝 Flashcards for English -> Norwegian translations**

[🔗 View Online Demo](https://languageapp-gbdeb7dnbacvhxhd.swedencentral-01.azurewebsites.net/)

---
## 🖼 Screenshots


| Landing Page | Courses Page | Edit Profile Page | Profile Page |
|--------------|--------------|-----------------|--------------|
| <img src="https://github.com/user-attachments/assets/969354ff-39ea-4297-bf28-1f790de9b27d" width="250"/> | <img src="https://github.com/user-attachments/assets/369f9582-725e-4081-99e7-9501f9004260" width="250"/> | <img src="https://github.com/user-attachments/assets/d2f31e8a-69a7-4ab2-a59f-bfe516d14fc9" width="250"/> | <img src="https://github.com/user-attachments/assets/41bb0206-0f1b-4a36-a54f-5f4ae6f7d502" width="250"/> |

---


## 🌟 Overview


Language Learning App is a **full-stack development practice project**.  
The main goal was to build a complete web application using **React, TypeScript, ASP.NET Core, and SQL Server**, rather than creating a fully functional language-learning platform.

The project was implemented with **Clean Architecture**, **CQRS**, **Mediator pattern**, **AutoMapper**, and **ASP.NET Core Identity** for authentication.  

Users can practice translations with flashcards, and in the future, the app could be expanded into a real language learning tool.  


---

## ✨ Features

- 🃏 Flashcards for English -> Norwegian translation practice
- 🚀 Course progression: unlock the next course after completing the current one
- 📄 Pagination for Course Page
- 🎨 Clean and interactive UI built with CSS
- 🔒 User authentication & authorization using ASP.NET Core Identity
- 🛠️ Profile page: upload an avatar, edit username and bio

---



## 🚀 Technologies & Tools

[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/yourusername)  
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?logo=dotnet&logoColor=white)  
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?logo=microsoftsqlserver&logoColor=white)  
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)  
![Azure](https://img.shields.io/badge/Azure-0078D4?logo=microsoftazure&logoColor=white)  

### 🏗 Architecture & Patterns
![Clean Architecture](https://img.shields.io/badge/Clean_Architecture-FF69B4)  
![CQRS](https://img.shields.io/badge/CQRS-FF8C00)  
![Mediator](https://img.shields.io/badge/Mediator-8A2BE2)  
![AutoMapper](https://img.shields.io/badge/AutoMapper-00CED1)

---
## ⚙️ Prerequisites

🐳 Docker installed

---
## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/LanguageLearningApp.git
cd LanguageLearningApp
```
2. Update the connection string

Edit API/appsettings.json:
```bash
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database={YOUR_DB_NAME};User Id=SA;Password={YOUR_PASSWORD};TrustServerCertificate=true;"
}
```
⚠️ Make sure that:

{YOUR_DB_NAME} matches the database name you want to use (you can create it in Docker or via migrations).
{YOUR_PASSWORD} is the same as the SA_PASSWORD set in your docker-compose.yml for the SQL Server container.

3. Start Docker services

From the root of the project (where docker-compose.yml is located):
```bash
docker-compose up -d
```
4. Apply database migrations
```bash
cd API
dotnet ef database update -p Persistence -s Api
```
5. Install frontend dependencies
```bash
cd client
npm install
```
6. Start the backend server
```bash
cd API
dotnet run
```
7. Start the frontend app
```bash
cd client
npm run dev
```


Open http://localhost:3000 in your browser.

---

## 🎯 Usage

🆕 Register a new account or log in

📖 Select a course and study using flashcards

✅ Complete each course to unlock the next

📊 Track your progress in your profile

---
## 🗂 Project Structure

```bash
client/        # React app with TypeScript and CSS
API/           # ASP.NET Core Web API
Persistence/   # EF Core database context and migrations
Application/   # Business logic
Domain/        # Entities and models
Infrastructure/ # External services, DB access
```
---


## 🔮 Future Improvements

- 🌐 Add support for more languages

- 🎯 Improve flashcard functionality with spaced repetition

- 📱 Make the app fully responsive for mobile devices
---
## 🚀 Deployment
The app is deployed on Azure.
