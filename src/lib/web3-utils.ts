import { ethers } from "ethers";
import type { IProvider } from "@web3auth/base";

export class Web3RPC {
    private provider: IProvider
    private ethersProvider: ethers.BrowserProvider | null = null
    private initialized = false

    constructor(provider: IProvider) {
        this.provider = provider
    }

    private async initProvider() {
        if (this.initialized) return

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            this.ethersProvider = new ethers.BrowserProvider(this.provider as any)
            this.initialized = true
        } catch (error) {
            console.error("Failed to initialize provider:", error)
            throw error
        }
    }

    async getAddress(): Promise<string> {
        try {
            if (!this.provider) {
                throw new Error("Provider not initialized")
            }

            await this.initProvider()
            if (!this.ethersProvider) {
                throw new Error("Ethers provider not initialized")
            }

            const signer = await this.ethersProvider.getSigner()
            const address = await signer.getAddress()
            return address
        } catch (error) {
            console.error("Error getting address:", error)
            throw error
        }
    }


    async getBalance(): Promise<string> {
        try {
            if (!this.provider) {
                throw new Error("Provider not initialized");
            }

            const ethersProvider = new ethers.BrowserProvider(this.provider as any);
            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            const balance = await ethersProvider.getBalance(address);
            return ethers.formatEther(balance);
        } catch (error) {
            console.error("Error getting balance:", error);
            throw error;
        }
    }

    async signMessage(message: string): Promise<string> {
        try {
            if (!this.provider) {
                throw new Error("Provider not initialized");
            }

            const ethersProvider = new ethers.BrowserProvider(this.provider as any);
            const signer = await ethersProvider.getSigner();
            const signature = await signer.signMessage(message);
            return signature;
        } catch (error) {
            console.error("Error signing message:", error);
            throw error;
        }
    }

    async sendTransaction(to: string, amount: string): Promise<string> {
        try {
            if (!this.provider) {
                throw new Error("Provider not initialized");
            }

            const ethersProvider = new ethers.BrowserProvider(this.provider as any);
            const signer = await ethersProvider.getSigner();
            const tx = await signer.sendTransaction({
                to,
                value: ethers.parseEther(amount),
            });
            return tx.hash;
        } catch (error) {
            console.error("Error sending transaction:", error);
            throw error;
        }
    }
}