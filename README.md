# SimpliFi Pay Frontend

SimpliFi Pay is a Web3 payment platform that provides seamless, gasless transactions with social login capabilities.

## Features

- 🔐 Web3Auth Social Login
- 💳 Gasless Transactions
- 💸 Cross-chain Payments
- 📱 Mobile-friendly Design
- 🔒 Secure Wallet Management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Web3**: 
  - Web3Auth (Social Login)
  - Ethers.js (Blockchain Interaction)
  - Biconomy (Gasless Transactions)
- **State Management**: Zustand
- **Development**: TypeScript, pnpm

## Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/simplifi-pay-frontend.git
cd simplifi-pay-frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your values:
```env
# Web3Auth (Required)
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=
NEXT_PUBLIC_WEB3AUTH_VERIFIER=
NEXT_PUBLIC_WEB3AUTH_VERIFIER_ID=

# RPC URL (Required)
NEXT_PUBLIC_RPC_URL=

# Biconomy (Optional - for gasless transactions)
NEXT_PUBLIC_BICONOMY_BUNDLER_URL=
NEXT_PUBLIC_BICONOMY_PAYMASTER_URL=
```

5. Start the development server:
```bash
pnpm dev
```

The app should now be running on `http://localhost:3000`

## Project Structure

```bash
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # UI components (shadcn)
│   ├── wallet/         # Wallet related components
│   └── payment/        # Payment related components
├── lib/                # Utilities and configurations
│   ├── stores/         # Zustand stores
│   └── utils/          # Helper functions
├── hooks/              # Custom React hooks
├── providers/          # React context providers
└── types/              # TypeScript type definitions
```

## Key Features Implementation

### Social Login
Uses Web3Auth for seamless social logins:
```typescript
await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
    loginProvider: "google",
})
```

### Wallet Management
Manages wallet state using Zustand:
```typescript
const { address, balance } = useWalletStore()
```

### Payments
Handles payments through Web3:
```typescript
const payment = await web3.sendTransaction({
    to: recipient,
    value: amount
})
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub

2. Import your repository in Vercel

3. Add environment variables in Vercel:
    - `NEXT_PUBLIC_WEB3AUTH_CLIENT_ID`
    - `NEXT_PUBLIC_RPC_URL`
    - Other required environment variables

4. Deploy!

### Required Configuration

1. Web3Auth Dashboard:
    - Add your deployment domain
    - Configure OAuth settings
    - Set up verifier

2. Configure allowed domains in Web3Auth

## Local HTTPS Development

For testing features that require HTTPS (like WebAuthn):

```bash
pnpm add -D local-ssl-proxy
```

Add to package.json:
```json
{
  "scripts": {
    "dev:https": "local-ssl-proxy --source 3001 --target 3000"
  }
}
```

Then run:
```bash
pnpm dev:https
```

Access via `https://localhost:3001`

## Troubleshooting

Common issues and solutions:

1. **Web3Auth Initialization Failed**
    - Check if your CLIENT_ID is correct
    - Verify domain is whitelisted in Web3Auth dashboard

2. **Wallet Not Connected**
    - Ensure RPC_URL is valid
    - Check console for connection errors

3. **Transactions Failed**
    - Verify network configuration
    - Check if account has sufficient funds

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Support

For support, please open an issue in the repository or contact: your@email.com
