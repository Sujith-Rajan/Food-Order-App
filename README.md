# Restaurant/Food Delivery App

A full-stack restaurant/food delivery app built with Next.js 14, React, Prisma, PostgreSQL, Auth.js, Stripe, Docker, React Query, and Zustand.
![Alt text](/public/food_order_app (2).png)
![Alt text](/public/food_order_app (1).png)
![Alt text](/public/food_order_app (4).png)
![Alt text](/public/food_order_app (7).png)
![Alt text](/public/food_order_app (6).png)





## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- **User Authentication:** User authentication and authorization using Auth.js for secure access.
- **Database:** Utilizes Prisma and PostgreSQL for efficient data storage and retrieval.
- **Payment Processing:** Integration with Stripe for seamless and secure payment processing.
- **Dockerized:** Containerized using Docker for easy deployment and scalability.
- **State Management:** Zustand is used for efficient state management in the client-side React application.
- **Data Fetching:** React Query is employed for fetching and caching data efficiently.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/restaurant-app.git

## Install Dependencies
  ` cd restaurant-app`
  ` npm install`


## .env file
 1.Database : DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_database
 2.Auth Js :  AUTH0_DOMAIN=your_auth_domain
              AUTH0_CLIENT_ID=your_client_id
              AUTH0_CLIENT_SECRET=your_client_secret

## Usage
 
` npm run dev`

## Technolgie Used
  Next.js 14, React, Prisma, PostgreSQL, Auth.js, Stripe, Docker, React Query, and Zustand.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
