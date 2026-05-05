# USHOP
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

USHOP is a web application for selling used and refurbished electronics. It provides a structured catalog with filtering, online payments, order management, and a full-featured admin panel.

## Features

- **Product Catalog**: Browse products with filters by category, price, and attributes.
- **Product Pages**: Photo gallery, technical specs, attribute selection (color, storage, etc.), stock availability.
- **Shopping Cart**: Add, remove, and update quantities with async requests via Axios.
- **Checkout & Payment**: Order placement with online payment processing via Stripe.
- **User Account**: View active orders and order history with status tracking.
- **Reviews & Ratings**: Leave ratings and comments on products.
- **Personalized Recommendations**: Product suggestions based on browsing history.
- **Admin Panel**: Manage products, categories, orders, users, sliders, and view sales analytics on a dashboard.
- **Soft Delete**: Deleted products can be restored from the admin panel.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- Backend: Laravel 12
- Frontend: React 19
- Bridge: Inertia.js
- Styling: Tailwind CSS
- Database: MySQL
- Payment: Stripe
- Build: Vite
- Routing (JS): Ziggy
- HTTP client: Axios
- Charts: Recharts
- Icons: Lucide React

## Architecture

### Backend
The backend is built with Laravel 12 and includes:

- Controllers: Handle HTTP requests and coordinate business logic.
- Models: Eloquent models with relationships and soft deletes.
- Migrations: Define and version the database schema.
- Seeders: Populate the database with initial data.
- Web Routes: Server-side routes defined in web.php, consumed by Inertia.

### Frontend
The frontend is built with React 19 and includes:

- Pages: Inertia page components for each route (catalog, product, cart, checkout, profile, admin).
- Components: Reusable UI components (filters, modals, pagination, sliders).
- Inertia.js: Acts as a bridge between Laravel controllers and React components, passing data as props and enabling SPA-like navigation without a separate REST API.

## Installation

Clone the repository:

```sh
git clone https://github.com/ZaharPa/ushop.git
cd ushop
```

1. Install dependencies:

```sh
composer install
npm install
```

2. Copy and configure the environment file:

```sh
cp .env.example .env
```

3. Generate the application key:

```sh
php artisan key:generate
```

4. Run migrations and seeders:

```sh
php artisan migrate --seed
```

5. Link storage:

```sh
php artisan storage:link
```

6. Start the development server:

```sh
php artisan serve
npm run dev
```

## Usage
Once the server is running, access the application at http://localhost:8000.
Admin panel is available at http://localhost:8000/admin.

## License
This project is licensed under the MIT License.

## Screenshots

<img width="763" height="736" alt="registration page" src="https://github.com/user-attachments/assets/6a2f9c43-7b07-4978-8588-28dd7dc796b8" />

<img width="793" height="393" alt="main page" src="https://github.com/user-attachments/assets/166a878d-8d9b-4f41-a3ef-2c15e66007bf" />

<img width="742" height="367" alt="product page" src="https://github.com/user-attachments/assets/252c4adc-d762-4c67-9444-70a9982e0c8c" />

<img width="817" height="406" alt="personal" src="https://github.com/user-attachments/assets/15918d45-83ec-47c5-b2e8-e686094a0131" />

<img width="809" height="406" alt="cart" src="https://github.com/user-attachments/assets/ddd1f96e-8635-4fb1-9248-ec55889a93b3" />

<img width="736" height="366" alt="admin product" src="https://github.com/user-attachments/assets/eaada09c-3705-445b-8628-6a6f7830b4cd" />

<img width="800" height="398" alt="admin edit product" src="https://github.com/user-attachments/assets/5e3b6f2b-fdf6-4766-bdb2-598a7d5be028" />

<img width="407" height="865" alt="mobile catalog" src="https://github.com/user-attachments/assets/39dd8640-ea4f-44bf-9e58-9cf4874be424" />
