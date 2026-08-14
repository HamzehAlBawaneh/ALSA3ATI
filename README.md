<p align="center">
  <img src="images/ALSA3ATI logo.png" alt="ALSA3ATI Logo" width="180">
</p>

<h1 align="center">ALSA3ATI — Vintage Watches & Wall Clocks</h1>

<p align="center">
  A responsive vintage-style e-commerce website for watches and classic wall clocks.
</p>

<p align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Responsive Design](https://img.shields.io/badge/Design-Responsive-success)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

## Overview

ALSA3ATI is a front-end e-commerce website designed around a vintage and luxury-inspired visual identity.

The website presents collections of wrist watches and wall clocks through a multi-page interface with product browsing, search and filtering functionality, and an interactive shopping cart.

The project was developed using standard web technologies without a backend or external database.

---

## Features

- Vintage-inspired luxury UI
- Responsive web design
- Multiple product collections
- Watches collection
- Wall clocks collection
- Product search
- Category filtering
- Brand filtering
- Maximum-price filtering
- Interactive shopping cart
- Add and remove products
- Increase and decrease product quantities
- Automatic cart total calculation
- Cart persistence using browser `localStorage`
- Simulated checkout interaction
- Newsletter subscription interface

---

## Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Interactivity and e-commerce functionality |
| LocalStorage | Persistent shopping cart |
| Font Awesome | Icons |
| Google Fonts | Typography |

---

## Project Structure

```text
ALSA3ATI/
│
├── images/
│   └── Website images and product assets
│
├── index.html
├── watches.html
├── wallClocks.html
│
├── style.css
├── watches.css
│
├── main.js
│
├── README.md
├── LICENSE
└── .gitignore
```

---

## Getting Started

No build tools or package installation are required.

### 1. Clone the repository

```bash
git clone https://github.com/HamzehAlBawaneh/ALSA3ATI.git
```

### 2. Open the project

Open the project folder and launch:

```text
index.html
```

in a modern web browser.

### 3. Explore the website

Navigate between:

- Home
- Watches
- Wall Clocks

You can search and filter products and test the interactive shopping cart.

---

## Shopping Cart

The website includes a client-side shopping cart implemented with JavaScript.

Cart items are stored in the browser using `localStorage`, allowing the cart to persist between page refreshes. :contentReference[oaicite:0]{index=0}

The cart supports:

- Adding products
- Removing products
- Increasing quantities
- Decreasing quantities
- Calculating the total price
- Simulated checkout

---

## Design

The interface uses a luxury-inspired visual system combining:

- Deep green
- Gold
- Cream
- White

Typography is based on **Playfair Display** for headings and **Poppins** for interface text. :contentReference[oaicite:1]{index=1}

---

## Pages

### Home

Introduces the ALSA3ATI brand and provides access to the product collections. :contentReference[oaicite:2]{index=2}

### Watches

Displays the watch collection with search, brand, category, and price filtering. :contentReference[oaicite:3]{index=3}

### Wall Clocks

Displays the wall-clock collection with product cards and shopping-cart functionality. :contentReference[oaicite:4]{index=4}

---

## Project Scope

This is a **front-end demonstration project**.

It does not currently include:

- User authentication
- Backend services
- Payment processing
- Real order processing
- Product database
- Server-side inventory management

The checkout functionality is simulated on the client side. :contentReference[oaicite:5]{index=5}

---

## Author

**Hamzeh Al-Bawaneh**

Artificial Intelligence Student  
Middle East University — Jordan

---

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.