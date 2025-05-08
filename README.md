# Johor Swap

A modern marketplace platform for buying and selling second-hand items in Johor, Malaysia. Built with Next.js, TailwindCSS, and PostgreSQL.

## Features

- 🛍️ Browse second-hand items with advanced filtering
- 📱 Responsive design for mobile and desktop
- 🔍 Search and filter by category, price, condition, and location
- 📸 Multiple image upload support
- 💬 Direct messaging with sellers
- 📍 Location-based listings
- 🔒 Secure user authentication
- 🌐 Real-time updates

## Tech Stack

- **Framework:** Next.js 15.3.2
- **Styling:** TailwindCSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Image Upload:** Cloudinary
- **Development:** TypeScript, ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/johor-swap.git
   cd johor-swap
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/johor_swap"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
johor-swap/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── lib/              # Utility functions and configurations
│   └── marketplace/      # Marketplace pages
├── prisma/               # Database schema and migrations
├── public/              # Static assets
└── styles/             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Prisma team for the excellent ORM
- All contributors and users of Johor Swap
