# Novel-AG NODE BACKEND

### On demand endpoint
List Of Agent endpoints:
DASHBOARD/FARMER(TAB)
 1. POST:: Create Farmer. - done
 2. POST:: Login - done
 3. GET:: Get State, LGA & Ward.
 4. GET:: Get All Farmers.
 5. GET:: Get the Number of farmers.
 6. GET:: Get the Number of farms.
 7. PUT:: Edit Farmer.
 8. GET:: Single Farmer.
 9. DELETE:: Drop Farmer.
 10. PATCH:: Create a Farm.
 11. PUT/PATCH:: Edit farm.
 12. PUT/PATCH:: Deactivate Farm/Farmer.(I guess) 
 13. POST:: Logout.
 
 DASHBOARD/USER-MANAGEMENT(TAB)
 1. GET:: All users,(i don’t know if this is a super admin functionality)
 2. GET:: Authenticated User.
 3. GET:: All super Admins/All smart Agents/All Supervisors.
4. GET:: View another user.
5. PUT/PATCH:: Edit A user.
6. DELETE:: Delete a user.


## SCRIPTS
- Run `yarn dev` to start development server on `localhost:5000`
- Run `yarn compile` to install npm packages 
- Swagger api docs avalaible at `http://localhost:5000/apic-docs/`

## Project Documents
- [Laravel Backend Git Repo](https://github.com/farmzoneAfrica/novelag-backend-laravel)
- [Node Backend Git Repo](https://github.com/farmzoneAfrica/novel-ag_nodejs-backend)
- [Node Backend Architecture DOCS](https://docs.google.com/document/d/1o2uLy9BA9Yc57XKeMF2nVCALDkjJWe77/edit)
- [Node Backend Architecture Design flow](https://www.figma.com/file/hE7ScAVxcm89YdVl4KChFH/NOVEL-AG---Architectural-Flow-(Copy)?node-id=107-906&t=RksMuW7sZpOMCw8P-0)
- [Laravel Backend Architecture DOCS]()
- [Laravel Backend Architecture Design flow](https://www.figma.com/file/AaotjepvjFYeakLuc45gBc/NOVEL-AG---Architectural-Flow?node-id=0-1&t=2i8hHbTVFFLejqFe-0)
- [Product figma design](https://www.figma.com/file/1kcasSQ5fhD8SzcpsJRYfj/Novel-AG-Product?node-id=31-1370&t=1ErRkkydf9KI8Xcd-0)
- [Project PRD](https://docs.google.com/document/d/1lhtOI0dCOpxuPP0Xul52QdipjiUnPFV9AK47cimLidY/edit)
- [Figma Design](https://www.figma.com/file/1kcasSQ5fhD8SzcpsJRYfj/Novel-AG-Product?node-id=0-1&t=eHjkXUL2wuJ6dKLO-0)
## Description
- This backend covers for admin, agents, prosperity hubs and warehouses. Database is remotely hosted on render

## Technologies used
- [Nodejs](https://nodejs.org/en/) 
- [TypeScript](https://www.typescriptlang.org/docs/) 
- [Express](https://expressjs.com/) 
- Database used is [PostgrelSQL](https://www.postgresql.org/)
- ORM - [Prisma](http://prisma.io/)


## PRISMA COMMANDS
- Run `yarn dev` to start server on `localhost 5000`
- Run `yarn compile` to compile typescript
- Run `npx prisma` to initiate prisma
- Run `yarn i --save-dev prisma@dev` and  `npm i @prisma/client@dev` to update prisma client versions.
- Run `npx prisma migrate dev --name init` after updating prisma model 
- Run ` emailengine --dbs.redis="redis://127.0.0.1:6379/0"` to start email template engine. 
## POSTGRESQL COMMANDS
- Run `psql` to start server on `postgresql CLI`
- Run `psql --help` to get help
- Run `npx prisma` to initiate prisma

## SSH COMMAND
- Run `ssh -p 21098 <username>@<ip address>` to start server on `localhost 5000`
- Enter Cpanel password to access server CLI locally
- For Cpanel CLI, Run `nsource /home/novellmr/nodevenv/node-api.novel-ag.com/14/bin/activate && cd /home/novellmr/node-api.novel-ag.com` to navigate to root directory


## Useful links
- [Architectural flow design](https://www.figma.com/file/hE7ScAVxcm89YdVl4KChFH/NOVEL-AG---Architectural-Flow-(Copy)?node-id=107%3A906&t=aFli1Iz6SZQkxSmF-0)

yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node @typescript-eslint/eslint-plugin @typescript-eslint/parser

forgot password POST
forgot password GET

## KNOWLEGE BASE
- [Basic Structure](https://codevoweb.com/crud-api-node-prisma-postgresql-reset-password/#:~:text=To%20reset%20the%20password%2C%20the,token%20to%20the%20user's%20email.)
- [Postgre course](https://www.youtube.com/watch?v=qw--VYLpxG4&t=14295s)


## NOTES
- farmers login is with phone number and otp, no password