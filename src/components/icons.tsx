import {
    Loader2,
    Home,
    History,
    CreditCard,
    User,
    Settings,
    LogOut,
    Wallet,
    TrendingDown,
    BadgeCheck,
    Store,
    Send,
    ReceiptPoundSterling,
    FolderPlus,
    ScanLine,
    Check,
    AlertCircle,
    Building2, // 銀行圖標
    Bell,      // 通知圖標
    DollarSign,
    Clock,
    ArrowLeftRight,
    ShieldCheck,
    Receipt,
    ArrowLeft,
    RefreshCcw,
    LucideCopy,
    Fingerprint,
    Info
} from "lucide-react"
import GoogleIcon from "./icons/google"

const Logo = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
)

export const Icons = {
    spinner: Loader2,
    google: GoogleIcon,
    logo: Logo,
    dashboard: Home,
    history: History,
    payment: CreditCard,
    user: User,
    settings: Settings,
    logout: LogOut,
    wallet: Wallet,
    spending: TrendingDown,
    transaction: BadgeCheck,
    store: Store,
    send: Send,
    request: ReceiptPoundSterling,
    addStore: FolderPlus,
    scan: ScanLine,
    check: Check,
    error: AlertCircle,
    card: CreditCard,   // 信用卡圖標
    bank: Building2,    // 銀行圖標
    notification: Bell, // 通知圖標
    dollar: DollarSign,
    time: Clock,
    transfer: ArrowLeftRight,
    security: ShieldCheck,
    receipt: Receipt,
    arrowLeft: ArrowLeft,
    refresh: RefreshCcw,
    copy: LucideCopy,
    fingerprint: Fingerprint,
    info: Info
}